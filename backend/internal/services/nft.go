package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/Yavuzlar/CodinLab/internal/domains"
	service_errors "github.com/Yavuzlar/CodinLab/internal/errors"
	"github.com/blocto/solana-go-sdk/client"
	"github.com/blocto/solana-go-sdk/common"
	"github.com/blocto/solana-go-sdk/program/associated_token_account"
	"github.com/blocto/solana-go-sdk/program/metaplex/token_metadata"
	"github.com/blocto/solana-go-sdk/program/system"
	"github.com/blocto/solana-go-sdk/program/token"
	"github.com/blocto/solana-go-sdk/rpc"
	"github.com/blocto/solana-go-sdk/types"
)

type nftService struct {
	feePayer      types.Account
	parserService domains.IParserService
	net           string
}

func newNFTService(
	parserService domains.IParserService,
) domains.INFTService {
	nftService := nftService{
		parserService: parserService,
		net:           rpc.DevnetRPCEndpoint,
	}
	nftService.parserService = parserService
	nftService.loadAdminAccout()

	return &nftService
}

func (s *nftService) GetNFTs() (nfts []domains.NFTMetadata, err error) {
	nftsP, err := s.parserService.GetNFTs()
	if err != nil {
		return nil, err
	}

	for _, n := range nftsP {
		var atts []domains.Attribute

		for _, t := range n.Attributes {
			atts = append(atts, domains.NewAttribute(t.TraitType, t.Value))
		}

		nfts = append(nfts, domains.NewNFTData(
			n.ID,
			n.URI,
			n.Symbol,
			n.Name,
			n.Description,
			n.Image,
			n.ExternalURL,
			n.SellerFeeBasisPoints,
			atts,
		))
	}

	return nfts, nil
}

func (s *nftService) GetNFTByID(id string) (*domains.NFTMetadata, error) {
	nftP, err := s.parserService.GetNFTByID(id)
	if err != nil {
		return nil, err
	}

	var atts []domains.Attribute

	for _, t := range nftP.Attributes {
		atts = append(atts, domains.NewAttribute(t.TraitType, t.Value))
	}

	nft := domains.NewNFTData(
		nftP.ID,
		nftP.URI,
		nftP.Name,
		nftP.Symbol,
		nftP.Description,
		nftP.Image,
		nftP.ExternalURL,
		nftP.SellerFeeBasisPoints,
		atts,
	)

	return &nft, nil
}

func (s *nftService) GetVersion() (string, error) {
	// create a RPC client
	c := client.NewClient(s.net)

	// get the current running Solana version
	response, err := c.GetVersion(context.TODO())
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "error while getting solana version", err)
	}

	return response.SolanaCore, nil
}

func (s *nftService) GetBalance(ctx context.Context, publicKey string) (uint64, error) {
	c := client.NewClient(s.net)

	balance, err := c.GetBalance(ctx, publicKey)
	if err != nil {
		return 0, service_errors.NewServiceErrorWithMessageAndError(500, "failed to get balance", err)
	}

	return balance, nil
}

func (s *nftService) MintNFT(ctx context.Context, nftID int) (string, error) {
	var mintPublicKeyStr string

	nft, err := s.GetNFTByID(fmt.Sprintf("%v", nftID))
	if err != nil {
		return "", err
	}
	if nft == nil {
		return "", service_errors.NewServiceErrorWithMessage(400, "nft not found")
	}

	c := client.NewClient(s.net)

	mint := types.NewAccount()
	mintPublicKeyStr = mint.PublicKey.String()
	// fmt.Printf("NFT: %v\n", mint.PublicKey.ToBase58())

	collection := types.NewAccount()
	// fmt.Printf("collection: %v\n", collection.PublicKey.ToBase58())

	ata, _, err := common.FindAssociatedTokenAddress(s.feePayer.PublicKey, mint.PublicKey)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to find a valid ata", err)
	}

	tokenMetadataPubkey, err := token_metadata.GetTokenMetaPubkey(mint.PublicKey)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to find a valid token metadata", err)
	}

	tokenMasterEditionPubkey, err := token_metadata.GetMasterEdition(mint.PublicKey)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to find a valid master edition", err)
	}

	mintAccountRent, err := c.GetMinimumBalanceForRentExemption(ctx, token.MintAccountSize)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to get mint account rent", err)
	}

	recentBlockhashResponse, err := c.GetLatestBlockhash(ctx)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to get recent blockhash", err)
	}

	maxSupply := uint64(0)
	tx, err := types.NewTransaction(types.NewTransactionParam{
		Signers: []types.Account{mint, s.feePayer},
		Message: types.NewMessage(types.NewMessageParam{
			FeePayer:        s.feePayer.PublicKey,
			RecentBlockhash: recentBlockhashResponse.Blockhash,
			Instructions: []types.Instruction{
				system.CreateAccount(system.CreateAccountParam{
					From:     s.feePayer.PublicKey,
					New:      mint.PublicKey,
					Owner:    common.TokenProgramID,
					Lamports: mintAccountRent,
					Space:    token.MintAccountSize,
				}),
				token.InitializeMint2(token.InitializeMint2Param{
					Decimals:   0,
					Mint:       mint.PublicKey,
					MintAuth:   s.feePayer.PublicKey,
					FreezeAuth: &s.feePayer.PublicKey,
				}),
				token_metadata.CreateMetadataAccountV3(token_metadata.CreateMetadataAccountV3Param{
					Metadata:                tokenMetadataPubkey,
					Mint:                    mint.PublicKey,
					MintAuthority:           s.feePayer.PublicKey,
					Payer:                   s.feePayer.PublicKey,
					UpdateAuthority:         s.feePayer.PublicKey,
					UpdateAuthorityIsSigner: true,
					IsMutable:               true,
					Data: token_metadata.DataV2{
						Name:                 nft.GetName(),
						Symbol:               nft.GetSymbol(),
						Uri:                  nft.GetURI(),
						SellerFeeBasisPoints: 100,
						Creators: &[]token_metadata.Creator{
							{
								Address:  s.feePayer.PublicKey,
								Verified: true,
								Share:    100,
							},
						},
						Collection: &token_metadata.Collection{
							Verified: false,
							Key:      collection.PublicKey,
						},
						Uses: &token_metadata.Uses{
							UseMethod: token_metadata.Burn,
							Remaining: 10,
							Total:     10,
						},
					},
				}),
				associated_token_account.Create(associated_token_account.CreateParam{
					Funder:                 s.feePayer.PublicKey,
					Owner:                  s.feePayer.PublicKey,
					Mint:                   mint.PublicKey,
					AssociatedTokenAccount: ata,
				}),
				token.MintTo(token.MintToParam{
					Mint:   mint.PublicKey,
					To:     ata,
					Auth:   s.feePayer.PublicKey,
					Amount: 1,
				}),
				token_metadata.CreateMasterEditionV3(token_metadata.CreateMasterEditionParam{
					Edition:         tokenMasterEditionPubkey,
					Mint:            mint.PublicKey,
					UpdateAuthority: s.feePayer.PublicKey,
					MintAuthority:   s.feePayer.PublicKey,
					Metadata:        tokenMetadataPubkey,
					Payer:           s.feePayer.PublicKey,
					MaxSupply:       &maxSupply,
				}),
			},
		}),
	})
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to create a transaction", err)
	}

	sig, err := c.SendTransaction(ctx, tx)
	if err != nil {
		return "", service_errors.NewServiceErrorWithMessageAndError(500, "failed to send transaction", err)
	}

	fmt.Println(sig)
	return mintPublicKeyStr, nil
}

func (s *nftService) TransferNFT(ctx context.Context, recipientPublicKey string, mintPublicKey string) error {
	nftPublicKey := common.PublicKeyFromString(mintPublicKey)
	reciverPublicKey := common.PublicKeyFromString(recipientPublicKey)

	// Gönderenin Associated Token Account'ını bul
	senderATA, _, err := common.FindAssociatedTokenAddress(s.feePayer.PublicKey, nftPublicKey)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "failed to find sender's associated token address", err)
	}

	// Alıcının Associated Token Account'ını bul
	recipientATA, _, err := common.FindAssociatedTokenAddress(reciverPublicKey, nftPublicKey)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "failed to find recipient's associated token address", err)
	}

	// Son blok hash'ini al
	c := client.NewClient(s.net)
	recentBlockhashResponse, err := c.GetLatestBlockhash(ctx)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "failed to get recent blockhash", err)
	}

	// Transfer işlemi için yeni bir transaction oluştur
	tx, err := types.NewTransaction(types.NewTransactionParam{
		Signers: []types.Account{s.feePayer}, // Burada feePayer imza atacak
		Message: types.NewMessage(types.NewMessageParam{
			FeePayer:        s.feePayer.PublicKey,
			RecentBlockhash: recentBlockhashResponse.Blockhash,
			Instructions: []types.Instruction{
				token.Transfer(token.TransferParam{
					From:   senderATA,
					To:     recipientATA,
					Auth:   s.feePayer.PublicKey,
					Amount: 1, // NFT'nin transferi için 1 birim gönderiyoruz
				}),
			},
		}),
	})
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "failed to create a transaction", err)
	}

	// Transaction'ı gönder
	sig, err := c.SendTransaction(ctx, tx)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "failed to send transaction, selam", err)
	}

	fmt.Println("Transfer signature:", sig)
	return nil
}

func (s *nftService) RequestTestBalance(ctx context.Context) error {
	c := client.NewClient(s.net)

	txhash, err := c.RequestAirdrop(
		ctx,                           // request context
		s.feePayer.PublicKey.String(), // airdrop isteyen cüzdan adresi
		1e9,                           // lamport cinsinden 1 SOL
	)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "error while getting test SOL", err)
	}
	fmt.Println("TestBalance TXHash: ", txhash)

	return nil
}

func (s *nftService) loadAdminAccout() {
	// Read JSON file
	data, err := os.ReadFile("admin-keypair.json")
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	// Parse the JSON data into a byte slice
	var byteArray []byte
	if err := json.Unmarshal(data, &byteArray); err != nil {
		log.Fatalf("Failed to unmarshal JSON data: %v", err)
	}

	// Convert byte slice to account
	account, err := types.AccountFromBytes(byteArray)
	if err != nil {
		log.Fatalf("Failed to create account from bytes: %v", err)
	}

	s.feePayer = account
}
