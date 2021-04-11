package backend

import (
	"github.com/gin-gonic/gin"
	"saas/backend/database"
  "github.com/gin-contrib/cors"
)

func Server() {
  database.InitDatabase()
  
  router := gin.Default()
  router.Use(cors.Default())

  v1 := router.Group("/api/v1")
	{
    v1.GET("/ping", ping)
    v1.GET("/users/:id", getUserById)
    v1.GET("/auth/list", listUsers)

    v1.POST("/auth/create/user", createUser)
    v1.POST("/auth/create/org", createOrg)

    // todo role binding
    // v1.POST("/auth/create/rolebinding", CreateUser("default"))
	}

  router.Run(host + ":" + port)
}
