package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	config.DB.AutoMigrate(&models.User{})

	r := gin.Default()
	routes.RegisterRoutes(r)

	r.Run(":8080")
}
