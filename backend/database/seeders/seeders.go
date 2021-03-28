package seeders

import (
	"log"

	"saas/backend/database/migrations"
	"saas/backend/database/settings"

	"gorm.io/gorm/clause"
)

type RolesMap struct {
	common  int
	manager int
	admin   int
	owner   int
}

var UserRolesMap = &RolesMap{
	common:  1,
	manager: 2,
	admin:   3,
	owner:   4}

var SetDefault = &migrations.UserRoles{RoleID: UserRolesMap.common}
var SetManager = &migrations.UserRoles{RoleID: UserRolesMap.manager}
var SetAdmin = &migrations.UserRoles{RoleID: UserRolesMap.admin}
var SetOwner = &migrations.UserRoles{RoleID: UserRolesMap.owner}

var (
	db = settings.Database

	userroles_seeder = []migrations.UserRoles{
		{RoleID: 1, Role: "common"},
		{RoleID: 2, Role: "manager"},
		{RoleID: 3, Role: "admin"},
		{RoleID: 4, Role: "owner"}}

	default_user = []migrations.UserInfos{
		{
			Uuid: migrations.Uuid(),
			UserName: "default_user",
			Email:    "test@super.co",
			Country:  "US",
			Password: "test"}}
	super_user = []migrations.UserInfos{
		{
			Uuid: migrations.Uuid(),
			UserName: "super_user",
			Email:    "test2@super.co",
			Country:  "US",
			Password: "test"}}
)

func SeedDb() {
	log.Print("=====> Starting seeders")

	// Roles
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&userroles_seeder)

	// Users
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&default_user).Association("Role").Append(SetDefault)
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&super_user).Association("Role").Append(SetOwner)

	// Update
	db.Model(&migrations.UserRoles{}).Where("role_id", 1).Update("role", "default")
	log.Println("=====> Seeders ended")
}
