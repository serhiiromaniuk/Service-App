package backend

import (
	"net/http"
	"time"

	// === Error handling
	"github.com/go-sql-driver/mysql"
	// ===
	"saas/backend/database"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type customUserResponse struct {
	Uuid      uuid.UUID			`json:"uuid"`
	UserName  string    		`json:"username"`
	Email     string    		`json:"email"`
	Country   string    		`json:"country"`
	IsActive  bool      		`json:"active"`
	CreatedAt time.Time 		`json:"created_at"`
}

type customOrgResponse struct {
	ID			int 		`json:"org_id"`
	OrgName		string		`json:"org_name"`
	OrgCountry	string		`json:"org_country"`
	CreatedAt	time.Time 	`json:"created_at"`
}

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func getUserById(c *gin.Context) {
	uuid := c.Param("uuid")
	db.Preload("Role").First(&userInfos, uuid)
	c.Header("Access-Control-Expose-Headers", "X-Total-Count")
	c.JSON(http.StatusOK, parseJsonInfo(userInfos))
}

func listUsers(c *gin.Context) {
	db.Preload("Role").Find(&userInfos)
	c.JSON(http.StatusOK, userInfos)
}

func userResponse(user database.UserInfos) customUserResponse {
	return customUserResponse{
		Uuid:      user.Uuid,
		UserName:  user.UserName,
		Email:     user.Email,
		Country:   user.Country,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt }
}

func orgResponse(org database.OrgOrganisations) customOrgResponse {
	return customOrgResponse{
		ID:	org.ID,
		OrgName: org.OrgName,
		OrgCountry: org.OrgCountry }
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
