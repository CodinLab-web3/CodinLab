package private

import (
	service_errors "github.com/Yavuzlar/CodinLab/internal/errors"
	dto "github.com/Yavuzlar/CodinLab/internal/http/dtos"
	"github.com/Yavuzlar/CodinLab/internal/http/response"
	"github.com/gofiber/fiber/v2"
)

func (h *PrivateHandler) initNFTRoutes(root fiber.Router) {
	nft := root.Group("/nft")

	nft.Post("/", h.MintNft)
	nft.Get("/balance/", h.SetTestBalance)
	nft.Get("/balance/:publicKey", h.GetBalance)
}

// @Tags Web3NFT
// @Summary NFT Mint
// @Description NFT Mint
// @Accept json
// @Produce json
// @Param nftMintDTO body dto.NFTMintDTO true "NFT Mint DTO"
// @Success 200 {object} response.BaseResponse{}
// @Router /private/nft/ [Post]
func (h *PrivateHandler) MintNft(c *fiber.Ctx) error {
	var nftMintDTO dto.NFTMintDTO
	if err := c.BodyParser(&nftMintDTO); err != nil {
		return service_errors.NewServiceErrorWithMessageAndError(400, "Invalid Format", err)
	}
	if err := h.services.UtilService.Validator().ValidateStruct(nftMintDTO); err != nil {
		return err
	}

	nftPublicKey, err := h.services.NFTService.MintNFT(c.Context(), nftMintDTO.NFTID)
	if err != nil {
		return err
	}

	// FIXME: Normalde bu publicKey session'dan çekilicek
	if err := h.services.NFTService.TransferNFT(c.Context(), nftPublicKey, nftPublicKey); err != nil {
		return err
	}

	return response.Response(200, "Mint Successful", nil)
}

// @Tags Web3NFT
// @Summary Add Test Balance
// @Description Add Test Balance
// @Accept json
// @Produce json
// @Success 200 {object} response.BaseResponse{}
// @Router /private/nft/balance/ [get]
func (h *PrivateHandler) SetTestBalance(c *fiber.Ctx) error {
	if err := h.services.NFTService.RequestTestBalance(c.Context()); err != nil {
		return err
	}

	return response.Response(200, "GetBalance Successful ", nil)
}

// @Tags Web3NFT
// @Summary Get Balance
// @Description Get Balance
// @Accept json
// @Produce json
// @Param publicKey path string true "Public Key"
// @Success 200 {object} response.BaseResponse{}
// @Router /private/nft/balance/{publicKey} [get]
func (h *PrivateHandler) GetBalance(c *fiber.Ctx) error {
	publicKey := c.Params("publicKey")
	balance, err := h.services.NFTService.GetBalance(c.Context(), publicKey)
	if err != nil {
		return err
	}

	return response.Response(200, "GetBalance Successful ", balance)
}
