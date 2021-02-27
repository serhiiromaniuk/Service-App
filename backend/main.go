package backend

import (
//  "fmt"
  "github.com/gin-gonic/gin"
	"net/http"

  "github.com/serhiiromaniuk/saas/backend/settings"
)

// Server -- main decalration of Gin routers
func Server() {
  g := gin.Default()

  g.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H {
      "message": "pong!",
    })
  })

  g.GET("/user/:name", func(c *gin.Context) {
	  name := c.Param("name")
	  c.String(
      http.StatusOK, 
      "Hello %s", name,
    )
  })
  host := settings.Host + ":" + settings.Port
  g.Run(host)
}
