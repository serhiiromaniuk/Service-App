package controller

import (
	"net/http"
	"time"

	// === Error handling
	"github.com/go-sql-driver/mysql"
	// ===
	"saas/backend/database/migrations"
	"saas/backend/database/seeders"
	"saas/backend/database/settings"
	"saas/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	db        = settings.Database
	userInfos = []migrations.UserInfos{}
	userRoles = []migrations.UserRoles{}
)

func errorHandler(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
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

type customUserResponse struct {
	Uuid      uuid.UUID			`json:"uuid"`
	UserName  string    		`json:"username"`
	Email     string    		`json:"email"`
	Country   string    		`json:"country"`
	IsActive  bool      		`json:"active"`
	CreatedAt time.Time 		`json:"created_at"`
}

func userResponse(user migrations.UserInfos) customUserResponse {
	return customUserResponse{
		Uuid:      user.Uuid,
		UserName:  user.UserName,
		Email:     user.Email,
		Country:   user.Country,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt,
	}
}

func CreateUser(c *gin.Context) {
	var req migrations.UserInfos

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorHandler(err))
		return
	}

	encryptedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorHandler(err))
		return
	}
	arg := migrations.UserInfos{
		Uuid: 		migrations.Uuid(),
		UserName:	req.UserName,
		Email:		req.Email,
		Country:	req.Country,
		IsActive: 	req.IsActive,
		Password:	encryptedPassword,
	}

	// rework error handling
	db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&arg).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				c.JSON(http.StatusForbidden, gin.H{"error": "email address has already registered"})
			}
			return err
		} else {
			tx.Model(&arg).Association("Role").Append(seeders.SetDefault)
			rsp := userResponse(arg)
			c.JSON(http.StatusOK, rsp)
			return nil
		}
	})
}

// func CreateRoleBinding(c *gin.Context) {
// 	var roleBind *migrations.UserRoles
// 	switch role {
// 		case "default":
// 			roleBind = seeders.SetDefault
// 		case "manager":
// 			roleBind = seeders.SetManager
// 		case "admin":
// 			roleBind = seeders.SetAdmin
// 		case "owner":
// 			roleBind = seeders.SetOwner
// 		default:
// 			roleBind = seeders.SetDefault
// 	}
// }