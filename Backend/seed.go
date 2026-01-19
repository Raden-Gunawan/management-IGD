package main

import (
	"backend/config"
	"backend/models"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	config.ConnectDB()

	// ADMIN IGD
	adminPass, _ := bcrypt.GenerateFromPassword([]byte("admin123"), 10)
	admin := models.User{
		Name:     "Admin IGD",
		Email:    "admin@gmail.com",
		Password: string(adminPass),
		Role:     "admin",
	}

	// TENAGA MEDIS
	medisPass, _ := bcrypt.GenerateFromPassword([]byte("medis123"), 10)
	medis := models.User{
		Name:     "Tenaga Medis",
		Email:    "medis@gmail.com",
		Password: string(medisPass),
		Role:     "medis",
	}

	config.DB.FirstOrCreate(&admin, models.User{Email: admin.Email})
	config.DB.FirstOrCreate(&medis, models.User{Email: medis.Email})

	log.Println("✅ akun admin & tenaga medis berhasil dibuat")
}
