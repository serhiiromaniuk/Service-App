package backend

import (
	"fmt"
	"net/http"
	
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"

	"saas/backend/database"
)

const (
	host = "127.0.0.1"
	port = "8000"
)

var (
	db        		= database.DB
	userInfos 		= []database.UserInfos{}
	userRoles 		= []database.UserRoles{}
	blockContainers = []database.BlockContainers{}
	c 		  		= &gin.Context{}
)

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	return string(hashedPassword), nil
}

func CheckPassword(password string, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func errorHandler(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func customErrorHandler(message string) {
	resp := message + " has already registered"
	c.JSON(http.StatusForbidden, gin.H{"error": resp})
}

func parseJsonInfo(data []database.UserInfos) (v interface{}) {
	for _, v = range data {}
	return 
}

func parseBlockContainer(data []database.BlockContainers) (v interface{}) {
	for _, v = range data {}
	return 
}

func verifyBind(req interface{}) {
	var c *gin.Context
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorHandler(err))
		return
	}
}
