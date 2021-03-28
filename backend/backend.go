package backend

import (
	"github.com/gin-gonic/gin"
  
	"saas/backend/controller"
	"saas/backend/database"
	"saas/backend/utils"
)

func Server() {
  database.InitDatabase()
  
  router := gin.Default()
	
  v1 := router.Group("/api/v1")
	{
    v1.GET("/ping", controller.Ping)
    v1.GET("/get/:id", controller.GetUserById)
    v1.GET("/auth/list", controller.ListUsers)

    v1.POST("/auth/create/user", controller.CreateUser)

    // todo role binding
    // v1.POST("/auth/create/rolebinding", controller.CreateUser("default"))
	}

  router.Run(utils.Host + ":" + utils.Port)
}
