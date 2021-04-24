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

  // Blocks
    v1.GET("/block/list", listBlockContainers)
    v1.GET("/block/get/:id", getBlockContainerById)

    v1.POST("/block/create/container", createBlockContainer)

  // Auth Users
    v1.GET("/auth/get/:id", getUserById)
    v1.GET("/auth/list", listUsers)
    
    v1.POST("/auth/create/user", createUser)
  
  // Auth Orgs
    // v1.GET("/auth/get/:id", createOrg)

    v1.POST("/auth/create/org", createOrg)

  // Auth Roles
    // v1.POST("/auth/create/rolebinding", CreateUser("default"))
	}

  router.Run(host + ":" + port)
}
