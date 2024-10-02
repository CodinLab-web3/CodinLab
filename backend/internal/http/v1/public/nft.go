package public

import (
	"github.com/Yavuzlar/CodinLab/internal/http/response"
	"github.com/gofiber/fiber/v2"
)

func (h *PublicHandler) initNFTRoutes(root fiber.Router) {
	nft := root.Group("/nft")
	nft.Get("/", h.MintNft)
}

// @Tags Web3NFT
// @Summary NFT Mint
// @Description NFT Mint
// @Accept json
// @Produce json
// @Success 200 {object} response.BaseResponse{}
// @Router /public/nft/ [get]
func (h *PublicHandler) MintNft(c *fiber.Ctx) error {
	if err := h.services.NFTService.MintNFT("5c5P5Y5N8g4BvK3hUqEYdSTr5HWB3ToE59qgT3N4N48g", 1); err != nil {
		return err
	}

	return response.Response(200, "Mint successful", nil)
}
