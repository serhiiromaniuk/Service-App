package backend

import (
	"github.com/gin-gonic/gin"
  
	"saas/backend/controller"
	"saas/backend/database"
	"saas/backend/settings"
)

func Server() {
  database.InitDatabase()
  
  router := gin.Default()
	
  v1 := router.Group("/api/v1")
	{
    v1.GET("/ping", controller.Ping)
    v1.GET("/get/:id", controller.GetUserById)
    v1.GET("/auth/list", controller.ListUsers)

    // v1.POST("/auth/create", controller.CreateUser)
	}

  router.Run(settings.Host + ":" + settings.Port)
}
