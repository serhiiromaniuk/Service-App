package seeders

import (
	"log"

	"saas/backend/database/migrations"
	"saas/backend/database/settings"
	"gorm.io/gorm/clause"
)

type rolesMap struct {
	common		int		`gorm:"default:1"`
	manager		int		`gorm:"default:2"`
	admin		int		`gorm:"default:3"`
	owner		int		`gorm:"default:4"`
}

var userRolesMap = &rolesMap{
	common:  1,
	manager: 2,
	admin:   3,
	owner:   4 }
	
var	SetCommon = &migrations.UserRoles{RoleID: userRolesMap.common}
var	SetManager = &migrations.UserRoles{RoleID: userRolesMap.manager}
var	SetAdmin = &migrations.UserRoles{RoleID: userRolesMap.admin}
var	SetOwner = &migrations.UserRoles{RoleID: userRolesMap.owner}

var (
	db = settings.Database

	userroles_seeder = []migrations.UserRoles{
		{	RoleID: 1, Role:  "common"	},
		{	RoleID: 2, Role:  "manager"	},
		{ 	RoleID: 3, Role:  "admin"	},
		{	RoleID: 4, Role:  "owner"	}	}

	default_user = []migrations.UserInfos{
		{
			UserName:	"default_user",
			Email:		"test@super.co",
			Country:	"US",
			Password:	"test" }}
	super_user = []migrations.UserInfos{
		{
			UserName:	"super_user",
			Email:		"test2@super.co",
			Country:	"US",
			Password:	"test" }}
)

func SeedDb() {
	log.Print("=====> Starting seeders")

	// Roles
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&userroles_seeder)
	
	// Users
	db.Create(&default_user).Association("Role").Append(SetCommon)
	db.Create(&super_user).Association("Role").Append(SetOwner)

	// Update
	db.Model(&migrations.UserRoles{}).Where("role_id", 1).Update("role", "default")
	log.Println("=====> Seeders ended")	
}
