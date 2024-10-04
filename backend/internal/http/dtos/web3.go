package dto

import (
	"github.com/blocto/solana-go-sdk/common"
	"github.com/blocto/solana-go-sdk/program/token"
)

// Web3DtoManager handles the conversion of domain users to DTOs
type Web3DTOManager struct{}

// NewWeb3DtoManager creates a new instance of Web3DtoManager
func NewWeb3DTOManager() *Web3DTOManager {
	return &Web3DTOManager{}
}

type LoginWeb3DTO struct {
	PublicKeyBase58 string `json:"publicKeyBase58"`
	Message         string `json:"message"`
	Signature       string `json:"signatureBase58"`
}

type RegisterWeb3DTO struct {
	PublicKey     string `json:"publicKeyBase58"`
	Username      string `json:"username" validate:"required,alphanum,min=3,max=30"`
	Name          string `json:"name" validate:"required"`
	Surname       string `json:"surname" validate:"required"`
	Password      string `json:"password" validate:"required,min=8"`
	GithubProfile string `json:"githubProfile" validate:"max=30"`
}

type NFTMintDTO struct {
	PublicKey string `json:"publicKeyBase58"`
	NFTID     int    `json:"nftID"`
}

type TokenAccountDTO struct {
	Mint            common.PublicKey        `json:"mint"`
	Owner           common.PublicKey        `json:"owner"`
	Amount          uint64                  `json:"amount"`
	Delegate        *common.PublicKey       `json:"delegate"`
	State           token.TokenAccountState `json:"state"`
	IsNative        *uint64                 `json:"isNative"`
	DelegatedAmount uint64                  `json:"delegatedAmount"`
	CloseAuthority  *common.PublicKey       `json:"closeAuth"`
}

func (d *Web3DTOManager) ToTokenAccountDTO(domain token.TokenAccount) TokenAccountDTO {
	return TokenAccountDTO{
		Mint:            domain.Mint,
		Owner:           domain.Owner,
		Delegate:        domain.Delegate,
		State:           domain.State,
		IsNative:        domain.IsNative,
		DelegatedAmount: domain.DelegatedAmount,
		CloseAuthority:  domain.CloseAuthority,
	}
}
