package backend

import (
	// "encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

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
	orgOrgs         = []database.OrgOrganisations{}
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

func verifyPassword(password string, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func errorHandler(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func customErrorHandler(message string) gin.H {
	mes := messageStatus{
		Status: "failed",
		Message: message }
	return gin.H{mes.Status: mes.Message}
}

// Rework
// func customHandler(code int, status string, message string) (c gin.Context) {
// 	mes := messageStatus{
// 		Status: status,
// 		Message: message }
// 	c.JSON(code, gin.H{mes.Status: mes.Message})
// 	return
// }

func parseJsonInfo(data []database.UserInfos) (v interface{}) {
	for _, v = range data {}
	return 
}

func parseBlockContainer(data []database.BlockContainers) (v interface{}) {
	for _, v = range data {}
	return 
}

func parseOrgOrganisation(data []database.OrgOrganisations) (v interface{}) {
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

type messageStatus struct {
    Status string
    Message string
}
