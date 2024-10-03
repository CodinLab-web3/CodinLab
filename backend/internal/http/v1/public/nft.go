package public

import (
	"github.com/Yavuzlar/CodinLab/internal/http/response"
	"github.com/gofiber/fiber/v2"
)

func (h *PublicHandler) initNFTRoutes(root fiber.Router) {
	nft := root.Group("/nft")

	nft.Get("/version", h.Version)
}

// @Tags Web3NFT
// @Summary Solana Version
// @Description Solana Version
// @Accept json
// @Produce json
// @Success 200 {object} response.BaseResponse{}
// @Router /public/nft/version [get]
func (h *PublicHandler) Version(c *fiber.Ctx) error {
	version, err := h.services.NFTService.GetVersion()
	if err != nil {
		return err
	}

	return response.Response(200, "Version Recived successfully", version)
}
