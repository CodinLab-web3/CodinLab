package session_store

import (
	"encoding/gob"

	"github.com/Yavuzlar/CodinLab/internal/domains"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/google/uuid"
)

type SessionData struct {
<<<<<<< HEAD
	UserID   string
	Username string
	Name     string
	Surname  string
	Role     string
=======
	UserID    string
	PublicKey string
	Username  string
	Name      string
	Surname   string
	Role      string
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
}

func (s *SessionData) ParseFromUser(user *domains.User) {
	if user.ID() != uuid.Nil {
		s.UserID = user.ID().String()
	}
<<<<<<< HEAD
=======
	s.PublicKey = user.PublicKey()
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
	s.Username = user.Username()
	s.Name = user.Name()
	s.Surname = user.Surname()
	s.Role = user.Role()
}

func GetSessionData(c *fiber.Ctx) *SessionData {
	user := c.Locals("user")
	if user == nil {
		return nil
	}
	session_data, ok := user.(SessionData)
	if !ok {
		return nil
	}
	return &session_data
}

func NewSessionStore(storage ...fiber.Storage) *session.Store {
	if len(storage) <= 0 {
		storage = append(storage, session.ConfigDefault.Storage)
	}
	gob.Register(SessionData{})
	return session.New(session.Config{
		CookieSecure:   true,
		CookieHTTPOnly: true,
		Storage:        storage[0],
	})
}
