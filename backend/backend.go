package backend

import (
	"github.com/gin-gonic/gin"
	// "github.com/gin-gonic/contrib/jwt"
	// "github.com/gin-gonic/contrib/static"
	// "encoding/json"
	"net/http"

	// "golang.org/x/crypto/bcrypt"

	"github.com/serhiiromaniuk/saas/backend/database"
	"github.com/serhiiromaniuk/saas/backend/settings"
)

// Server -- main decalration of Gin routes
func Server() {
  database.InitDatabase()

  router := gin.Default()

  router.GET("/ping", ping)
  router.GET("/get/:name", getUser)
  router.GET("/users/list", listUsers)
  // router.POST("/register", registerUser)

  router.Run(settings.Host + ":" + settings.Port)
}

func ping(c *gin.Context) {
  c.JSON(200, gin.H {
    "message": "pong",
  })
}

func getUser(c *gin.Context) {
  name := c.Param("name")
  c.String(
    http.StatusOK, 
    "Hello %s", name )
}

func listUsers(c *gin.Context) {
  c.String(
    http.StatusOK, 
    "OK" )
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