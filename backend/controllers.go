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

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func getUserById(c *gin.Context) {
	uuid := c.Param("uuid")
	db.Preload("Role").First(&userInfos, uuid)
	c.JSON(http.StatusOK, parseJsonInfo(userInfos))
}

func listUsers(c *gin.Context) {
	db.Preload("Role").Find(&userInfos)
	c.JSON(http.StatusOK, userInfos)
}

func getBlockContainerById(c *gin.Context) {
	id := c.Param("id")
	db.First(&blockContainers, id)
	c.JSON(http.StatusOK, parseBlockContainer(blockContainers))
}

func listBlockContainers(c *gin.Context) {
	db.Find(&blockContainers)
	c.JSON(http.StatusOK, blockContainers)
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

func createOrg(c *gin.Context) {
	var req database.OrgOrganisations
	arg := database.OrgOrganisations{
		OrgName:		req.OrgName,
		OrgCountry:		req.OrgCountry }

	verifyBind(&req)

	// FIX
	db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&arg).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				c.JSON(http.StatusForbidden, gin.H{"error": "organisation has already registered"})
			}
			return err
		} else {
			c.JSON(http.StatusOK, orgResponse(arg))
			return nil
		}
	})
}

func createBlockContainer(c *gin.Context) {
	var req database.BlockContainers
	arg := database.BlockContainers{
		Name:	req.Name,
		Body:	req.Body }
	verifyBind(&req)

	db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&arg).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				customErrorHandler("container")
			}
			return err
		} else {
			c.JSON(http.StatusOK, containerResponse(arg))
			return nil
		}
	})
}
