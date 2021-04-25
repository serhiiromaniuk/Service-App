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
