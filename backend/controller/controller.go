package controller

import (
	"net/http"
	"time"

	"saas/backend/database/migrations"
	"saas/backend/database/seeders"
	"saas/backend/database/settings"

	"github.com/gin-gonic/gin"
)

var (
	db = settings.Database
	userInfos = []migrations.UserInfos{}
	userRoles = []migrations.UserRoles{}
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong" })
}
  
func GetUserById(c *gin.Context) {
	id := c.Param("id")
	db.Preload("Role").First(&userInfos, id)
		c.JSON(http.StatusOK, gin.H{"data": userInfos})
}

func ListUsers(c *gin.Context) {
	db.Preload("Role").Find(&userInfos)
	c.JSON(http.StatusOK, gin.H{"data": userInfos})
}

func CreateUser(c *gin.Context, arg migrations.UserInfos) {
    role := seeders.SetCommon

	user := migrations.UserInfos{
		UserName:  arg.UserName,
		Email:     arg.Email,
		Country:   arg.Country,
		Password:  arg.Password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	db.Create(&user).Association("Role").Append(&role)

}
