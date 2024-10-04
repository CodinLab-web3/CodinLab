package public

import (
	dto "github.com/Yavuzlar/CodinLab/internal/http/dtos"
	"github.com/Yavuzlar/CodinLab/internal/http/response"
	"github.com/Yavuzlar/CodinLab/internal/http/session_store"
	"github.com/gofiber/fiber/v2"
)

func (h *PublicHandler) initUserRoutes(root fiber.Router) {
	root.Post("/login", h.Login)
	root.Post("/logout", h.Logout)
	root.Post("/register", h.Register)

	root.Post("/loginWeb3", h.LoginWeb3)
	root.Post("/registerWeb3", h.RegisterWeb3)
}

// @Tags Auth
// @Summary Login
// @Description Login
// @Accept json
// @Produce json
// @Param login body dto.LoginDTO true "Login"
// @Success 200 {object} response.BaseResponse{dto.LoginResponseDTO}
// @Router /public/login [post]
func (h *PublicHandler) Login(c *fiber.Ctx) error {
	var login dto.LoginDTO
	if err := c.BodyParser(&login); err != nil {
		return err
	}
	if err := h.services.UtilService.Validator().ValidateStruct(login); err != nil {
		return err
	}
	userdata, err := h.services.UserService.Login(c.Context(), login.Username, login.Password)
	if err != nil {
		return err
	}
	sess, err := h.session_store.Get(c)
	if err != nil {
		return err
	}
	sessionData := session_store.SessionData{}
	sessionData.ParseFromUser(userdata)
	sess.Set("user", sessionData)
	if err := sess.Save(); err != nil {
		return err
	}

	bestProgrammingLanguage, err := h.services.UserService.BestProgrammingLanguages(c.Context(), userdata.ID().String())
	if err != nil {
		return err
	}
	loginResponse := h.dtoManager.UserDTOManager.ToLoginResponseDTO(userdata, bestProgrammingLanguage)

	return response.Response(200, "Login successful", loginResponse)
}

// @Tags Web3Auth
// @Summary Login
// @Description Login
// @Accept json
// @Produce json
// @Param login body dto.LoginWeb3DTO true "Login"
// @Success 200 {object} response.BaseResponse{dto.LoginResponseDTO}
// @Router /public/loginWeb3 [post]
func (h *PublicHandler) LoginWeb3(c *fiber.Ctx) error {
	var login dto.LoginWeb3DTO
	if err := c.BodyParser(&login); err != nil {
		return err
	}
	if err := h.services.UtilService.Validator().ValidateStruct(login); err != nil {
		return err
	}
	userdata, err := h.services.UserService.LoginWeb3(c.Context(), login.PublicKeyBase58, login.Message, login.Signature)
	if err != nil {
		return err
	}
	sess, err := h.session_store.Get(c)
	if err != nil {
		return err
	}
	sessionData := session_store.SessionData{}
	sessionData.ParseFromUser(userdata)
	sess.Set("user", sessionData)
	if err := sess.Save(); err != nil {
		return err
	}
	bestProgrammingLanguage, err := h.services.UserService.BestProgrammingLanguages(c.Context(), userdata.ID().String())
	if err != nil {
		return err
	}
	loginResponse := h.dtoManager.UserDTOManager.ToLoginResponseDTO(userdata, bestProgrammingLanguage)

	return response.Response(200, "LoginWeb3 successful", loginResponse)
}

// @Tags Auth
// @Summary Register
// @Description Register
// @Accept json
// @Produce json
// @Param register body dto.RegisterDTO true "Register"
// @Success 200 {object} response.BaseResponse{}
// @Router /public/register [post]
func (h *PublicHandler) Register(c *fiber.Ctx) error {
	var register dto.RegisterDTO
	if err := c.BodyParser(&register); err != nil {
		return err
	}
	if err := h.services.UtilService.Validator().ValidateStruct(register); err != nil {
		return err
	}

	if err := h.services.UserService.Register(c.Context(), register.Username, register.Name, register.Surname, register.Password, register.GithubProfile); err != nil {
		return err
	}

	return response.Response(200, "Register successful", nil)
}

// @Tags Web3Auth
// @Summary Register
// @Description Register
// @Accept json
// @Produce json
// @Param register body dto.RegisterWeb3DTO true "Register"
// @Success 200 {object} response.BaseResponse{}
// @Router /public/registerWeb3 [post]
func (h *PublicHandler) RegisterWeb3(c *fiber.Ctx) error {
	var register dto.RegisterWeb3DTO
	if err := c.BodyParser(&register); err != nil {
		return err
	}
	if err := h.services.UtilService.Validator().ValidateStruct(register); err != nil {
		return err
	}

	if err := h.services.UserService.RegisterWeb3(c.Context(), register.PublicKey, register.Username, register.Name, register.Surname, register.Password, register.GithubProfile); err != nil {
		return err
	}

	return response.Response(200, "RegisterWeb3 successful", nil)
}

// @Tags Auth
// @Summary Logout
// @Description Logout
// @Accept json
// @Produce json
// @Success 200 {object} response.BaseResponse{}
// @Router /public/logout [post]
func (h *PublicHandler) Logout(c *fiber.Ctx) error {
	sess, err := h.session_store.Get(c)
	if err != nil {
		return response.Response(500, "Failed to get session", err)
	}
	if err := sess.Destroy(); err != nil {
		return response.Response(500, "Failed to destroy session", err)
	}

	return response.Response(200, "Logout successful", nil)
}
