package backend

import (
	"github.com/gin-gonic/gin"
	// "github.com/gin-gonic/contrib/jwt"
	// "github.com/gin-gonic/contrib/static"
	// "encoding/json"
	"net/http"

	// "golang.org/x/crypto/bcrypt"

	"github.com/serhiiromaniuk/saas/backend/database"
	"github.com/serhiiromaniuk/saas/backend/database/migrations"
	"github.com/serhiiromaniuk/saas/backend/settings"
)

var (
  db  = database.Database
  userInfos = []migrations.UserInfos{}
  userRoles = []migrations.UserRoles{}
)

// Server -- main decalration of Gin routes
func Server() {
  database.InitDatabase()
  
  router := gin.Default()
	
  v1 := router.Group("/api/v1")
	{
    v1.GET("/ping", ping)
    v1.GET("/get/:id", getUserById)
    v1.GET("/users/list", listUsers)
	}

  // router.POST("/register", registerUser)

  router.Run(settings.Host + ":" + settings.Port)
}

func ping(c *gin.Context) {
  c.JSON(200, gin.H {
    "message": "pong",
  })
}

func getUserById(c *gin.Context) {
  id := c.Param("id")
  db.Preload("Role").First(&userInfos, id)
	c.JSON(http.StatusOK, gin.H{"data": userInfos})
}

func listUsers(c *gin.Context) {
	db.Preload("Role").Find(&userInfos)
	c.JSON(http.StatusOK, gin.H{"data": userInfos})
}

// func registerUser(c *gin.Context) {
//   c.
// }


// func (c *gin.Context) uploadFile() {
// 		// Multipart form
// 		form, _ := c.()
// 		files := form.File["upload[]"]

// 		for _, file := range files {
// 			log.Println(file.Filename)
// 			c.SaveUploadedFile(file, dst)
// 		}
// 		c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
// }