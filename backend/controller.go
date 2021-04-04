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

var (
	db        = database.DB
	userInfos = []database.UserInfos{}
	userRoles = []database.UserRoles{}
)

func errorHandler(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
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

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, errorHandler(err))
		return
	}

	arg := database.OrgOrganisations{
		OrgName:		req.OrgName,
		OrgCountry:		req.OrgCountry }

	db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&arg).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				c.JSON(http.StatusForbidden, gin.H{"error": "organisations has already registered"})
			}
			return err
		} else {
			c.JSON(http.StatusOK, orgResponse(arg))
			return nil
		}
	})
}
