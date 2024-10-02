package solana

import (
	"crypto/ed25519"
	"fmt"

	"github.com/btcsuite/btcutil/base58"
)

// VerifySignature verifies a Solana signature
func VerifySignature(pubKeyBase58 string, message string, signatureBase58 string) (bool, error) {
	// 1. Public key'i base58 formatından byte array'e çevir
	fmt.Println(pubKeyBase58)
	pubKey := base58.Decode(pubKeyBase58)
	if len(pubKey) != 32 {
		return false, fmt.Errorf("invalid public key length: %d", len(pubKey))
	}

	// 2. İmzayı base58 formatından byte array'e çevir
	signature := base58.Decode(signatureBase58)
	if len(signature) != ed25519.SignatureSize {
		return false, fmt.Errorf("invalid public key length: %d", len(pubKey))
	}

	// 3. Mesajı byte array olarak al
	messageBytes := []byte(message)

	// 4. ed25519 imzasını doğrula
	valid := ed25519.Verify(pubKey, messageBytes, signature)

	return valid, nil
}
