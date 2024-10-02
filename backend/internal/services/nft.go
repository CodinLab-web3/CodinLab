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
	"github.com/blocto/solana-go-sdk/program/metaplex/token_metadata"
	"github.com/blocto/solana-go-sdk/program/system"
	"github.com/blocto/solana-go-sdk/program/token"
	"github.com/blocto/solana-go-sdk/rpc"
	"github.com/blocto/solana-go-sdk/types"
)

type nftService struct {
	adminAccount  types.Account
	parserService domains.IParserService
}

func newNFTService(
	parserService domains.IParserService,
) domains.INFTService {
	nftService := nftService{
		parserService: parserService,
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
			n.Symbol,
			n.Name,
			n.Description,
			n.Image,
			n.ExternalURL,
			n.AnimationURL,
			n.Creator,
			n.SellerFeeBasisPoints,
			atts,
		))
	}

	return nfts, nil
}

func (s *nftService) GetNFTByID(id int) (*domains.NFTMetadata, error) {
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
		nftP.Name,
		nftP.Symbol,
		nftP.Description,
		nftP.Image,
		nftP.ExternalURL,
		nftP.AnimationURL,
		nftP.Creator,
		nftP.SellerFeeBasisPoints,
		atts,
	)

	return &nft, nil
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

	s.adminAccount = account
}

func (s *nftService) MintNFT(userPublicKey string, nftID int) error {
	// Parser kullandım çünkü json hali lazım.
	nftData, err := s.parserService.GetNFTByID(nftID)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "error while getting nft", err)
	}

	nftJsonData, err := json.Marshal(nftData)
	if err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(500, "error while getting json of the nft", err)
	}

	c := client.NewClient(rpc.TestnetRPCEndpoint)

	// create an mint account
	mint := types.NewAccount()
	fmt.Println("mint:", mint.PublicKey.ToBase58())

	// get init balance
	rentExemptionBalance, err := c.GetMinimumBalanceForRentExemption(
		context.Background(),
		token.MintAccountSize,
	)
	if err != nil {
		log.Printf("get min balacne for rent exemption, err: %v", err)
	}

	res, err := c.GetLatestBlockhash(context.Background())
	if err != nil {
		log.Printf("get recent block hash error, err: %v\n", err)
	}

	// Create metadata account
	metadataAccount := types.NewAccount() // Create a new account for metadata
	fmt.Println("metadata account:", metadataAccount.PublicKey.ToBase58())

	fmt.Println("admin account: ", s.adminAccount.PublicKey)

	// FIXME: NEREDE BELLİ OLUACAK BU NFT NİN KİME GİDECEĞİ

	tx, err := types.NewTransaction(types.NewTransactionParam{
		Message: types.NewMessage(types.NewMessageParam{
			FeePayer:        s.adminAccount.PublicKey,
			RecentBlockhash: res.Blockhash,
			Instructions: []types.Instruction{
				system.CreateAccount(system.CreateAccountParam{
					From:     s.adminAccount.PublicKey,
					New:      mint.PublicKey,
					Owner:    common.TokenProgramID,
					Lamports: rentExemptionBalance,
					Space:    token.MintAccountSize,
				}),
				token.InitializeMint(token.InitializeMintParam{
					Decimals:   0, // 0 For NTFs
					Mint:       mint.PublicKey,
					MintAuth:   s.adminAccount.PublicKey, // common.PublicKeyFromString(userPublicKey)
					FreezeAuth: nil,
				}),
				// Create Metadata Account
				system.CreateAccount(system.CreateAccountParam{
					From:     s.adminAccount.PublicKey,
					New:      metadataAccount.PublicKey,
					Owner:    common.MetaplexTokenMetaProgramID, //FIXME: Metadata program ID
					Lamports: rentExemptionBalance,              // You may need to adjust this for metadata account size
					Space:    uint64(len(nftJsonData)),          // This is a simplification, ensure it's the actual required size
				}),

				// FIXME: FIX LAN BURAYI
				token_metadata.CreateMetadataAccount(token_metadata.CreateMetadataAccountParam{
					Metadata:                metadataAccount.PublicKey,
					Mint:                    mint.PublicKey,
					MintAuthority:           s.adminAccount.PublicKey,
					Payer:                   s.adminAccount.PublicKey,
					UpdateAuthority:         s.adminAccount.PublicKey,
					UpdateAuthorityIsSigner: true, // Eğer güncelleme yetkisi imzalı olacaksa true
					IsMutable:               true, // Metadata'nın güncellenebilir olup olmadığını belirtin
					MintData: token_metadata.Data{
						Name:                 nftData.Name, // NFT'nin ismi
						Uri:                  nftData.ExternalURL,
						Symbol:               nftData.Symbol,                       // NFT'nin sembolü, burayı düzeltin
						SellerFeeBasisPoints: uint16(nftData.SellerFeeBasisPoints), // Satış komisyonu
						Creators: &[]token_metadata.Creator{
							{
								Address:  s.adminAccount.PublicKey, // Yaratıcının adresi
								Verified: true,                     // Yaratıcının doğrulanıp doğrulanmadığı
								Share:    100,                      // Yaratıcının payı (örn. %100)
							},
						},
					},
				}),
			},
		}),
		Signers: []types.Account{s.adminAccount, mint},
	})
	if err != nil {
		log.Printf("generate tx error, err: %v\n", err)
	}

	txhash, err := c.SendTransaction(context.Background(), tx)
	if err != nil {
		log.Printf("send tx error, err: %v\n", err)
	}

	log.Println("txhash:", txhash)

	return nil
}
