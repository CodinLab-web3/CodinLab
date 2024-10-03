package dto

import "github.com/Yavuzlar/CodinLab/internal/domains"

// UserDTOManager handles the conversion of domain users to DTOs
type UserDTOManager struct{}

// NewUserDTOManager creates a new instance of UserDTOManager
func NewUserDTOManager() UserDTOManager {
	return UserDTOManager{}
}

type LoginDTO struct {
	Username string `json:"username" validate:"required,alphanum,min=3,max=30"`
	Password string `json:"password" validate:"required,min=8"`
}

type LoginResponseDTO struct {
<<<<<<< HEAD
	Role string `json:"role"`
=======
	Username      string `json:"username"`
	Name          string `json:"name"`
	Surname       string `json:"surname"`
	Role          string `json:"role"`
	GithubProfile string `json:"githubProfile"`
	BestLanguage  string `json:"bestLanguage"`
	PublicKey     string `json:"publicKey"`
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
}

type RegisterDTO struct {
	Username      string `json:"username" validate:"required,alphanum,min=3,max=30"`
	Name          string `json:"name" validate:"required"`
	Surname       string `json:"surname" validate:"required"`
	Password      string `json:"password" validate:"required,min=8"`
	GithubProfile string `json:"githubProfile" validate:"max=30"`
}

type CreateUserDTO struct {
	Username      string `json:"username" validate:"required,alphanum,min=3,max=30"` // Username is required, must be alphanumeric and between 3-30 characters
	Name          string `json:"name" validate:"required"  `                         // Name is required
	Surname       string `json:"surname" validate:"required"`                        // Surname is required
	Password      string `json:"password" validate:"required,min=8"`                 // Password is required and must be at least 8 characters
	Role          string `json:"role" validate:"required"`
	GithubProfile string `json:"githubProfile" validate:"max=30"`
}

type UserDTO struct {
	Username      string `json:"username"`
	Name          string `json:"name"`
	Surname       string `json:"surname"`
	Role          string `json:"role"`
	GithubProfile string `json:"githubProfile"`
	BestLanguage  string `json:"bestLanguage"`
<<<<<<< HEAD
=======
	PublicKey     string `json:"publicKey"`
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
}

func (m *UserDTOManager) ToUserDTO(user *domains.User, bestProgrammingLanguage string) UserDTO {
	return UserDTO{
		Username:      user.Username(),
		Name:          user.Name(),
		Surname:       user.Surname(),
		Role:          user.Role(),
<<<<<<< HEAD
=======
		PublicKey:     user.PublicKey(),
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
		GithubProfile: user.GithubProfile(),
		BestLanguage:  bestProgrammingLanguage,
	}
}

<<<<<<< HEAD
func (m *UserDTOManager) ToLoginResponseDTO(user *domains.User) LoginResponseDTO {
	return LoginResponseDTO{
		Role: user.Role(),
=======
func (m *UserDTOManager) ToLoginResponseDTO(user *domains.User, bestProgrammingLanguage string) LoginResponseDTO {
	return LoginResponseDTO{
		Username:      user.Username(),
		Name:          user.Name(),
		Surname:       user.Surname(),
		Role:          user.Role(),
		PublicKey:     user.PublicKey(),
		GithubProfile: user.GithubProfile(),
		BestLanguage:  bestProgrammingLanguage,
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
	}
}

type UpdateUserDTO struct {
	Username      string `json:"username" validate:"omitempty,alphanum,max=30" `
	Name          string `json:"name"`
	Surname       string `json:"surname" `
	Password      string `json:"password" validate:"required"`
	GithubProfile string `json:"githubProfile" validate:"omitempty,max=30"`
}

type UpdatePasswordDTO struct {
	Password        string `json:"password" validate:"required"`
	NewPassword     string `json:"newPassword" validate:"required,min=8"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,min=8"`
}
