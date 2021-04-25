package backend

import (
	"net/http"
	// === Error handling
	"github.com/go-sql-driver/mysql"
	// ===
	"saas/backend/database"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


func getUserById(c *gin.Context) {
	uuid := c.Param("uuid")
	db.Preload("Role").First(&userInfos, uuid)
	c.JSON(http.StatusOK, parseJsonInfo(userInfos))
}

func listUsers(c *gin.Context) {
	db.Preload("Role").Find(&userInfos)
	c.JSON(http.StatusOK, userInfos)
}

func createUser(c *gin.Context) {
	var req database.UserInfos
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorHandler(err))
		return
	}

	encryptedPassword, err := hashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, errorHandler(err))
		return
	}
	arg := database.UserInfos{
		Uuid: 		database.Uuid(),
		UserName:	req.UserName,
		Email:		req.Email,
		Country:	req.Country,
		IsActive: 	req.IsActive,
		Password:	encryptedPassword }

	db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&arg).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				c.JSON(http.StatusForbidden, gin.H{"error": "email address has already registered"})
			}
			return err
		} else {
			tx.Model(&arg).Association("Role").Append(database.SetDefault)
			c.JSON(http.StatusOK, userResponse(arg))
			return nil
		}
	})
}

func loginUser(c *gin.Context) {
	var req customLoginResponse
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorHandler(err))
		return
	}

	arg := customLoginResponse{
		Email:		req.Email,
		Password:	req.Password }

	dbData := &database.UserInfos{}
	result := db.Find(dbData, "email = ?", arg.Email)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, customErrorHandler("wrong email address"))//errorHandler(result.Error))
		return
	} else if result.RowsAffected > 1 {
		c.JSON(http.StatusBadRequest, customErrorHandler("there are multiple responses, aborting"))
		return
	}

    err := verifyPassword(arg.Password, dbData.Password)
    if err != nil {
        c.JSON(http.StatusBadRequest, customErrorHandler("wrong password"))
        return
    }

	c.JSON(http.StatusOK, gin.H{"ok": dbData.Uuid})
}
