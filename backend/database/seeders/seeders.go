package seeders

import (
	"log"
	"time"

	"github.com/serhiiromaniuk/saas/backend/database/migrations"
	"github.com/serhiiromaniuk/saas/backend/database/settings"
	"gorm.io/gorm/clause"
)

var (
	db = settings.Database

	userroles_seeder = []migrations.UserRoles{
		{	RoleID: 1, Role:  "common"	},
		{	RoleID: 2, Role:  "manager"	},
		{ 	RoleID: 3, Role:  "admin"	},
		{	RoleID: 4, Role:  "owner"	}	}


	default_user = []migrations.UserInfos{
		{
			FullName:	"Test User",
			UserName:	"default_user",
			Email:		"test@super.co",
			Country:	"US",
			Password:	"test",
			CreatedAt: time.Now(), UpdatedAt: time.Now() }}
	super_user = []migrations.UserInfos{
		{
			FullName:	"Test User #2",
			UserName:	"super_user",
			Email:		"test2@super.co",
			Country:	"US",
			Password:	"test",
			CreatedAt: time.Now(), UpdatedAt: time.Now() }}
)

func SeedDb() {
	log.Print("=====> Starting seeders")

	// Roles
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&userroles_seeder)
	
	// Users
	db.Create(&default_user).Association("Roles").Append(&migrations.UserRoles{RoleID: 1})
	db.Create(&super_user).Association("Roles").Append(&migrations.UserRoles{RoleID: 4})

	// Update
	db.Model(&migrations.UserRoles{}).Where("role_id", 1).Update("role", "default")
	log.Println("=====> Seeders ended")	
}
