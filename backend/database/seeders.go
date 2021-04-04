package database

import (
	"log"

	"github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
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

var SetDefault = &UserRoles{RoleID: UserRolesMap.common}
var SetManager = &UserRoles{RoleID: UserRolesMap.manager}
var SetAdmin = &UserRoles{RoleID: UserRolesMap.admin}
var SetOwner = &UserRoles{RoleID: UserRolesMap.owner}

var (
	userroles_seeder = []UserRoles{
		{RoleID: 1, Role: "common"},
		{RoleID: 2, Role: "manager"},
		{RoleID: 3, Role: "admin"},
		{RoleID: 4, Role: "owner"}}

	user_org = []OrgOrganisations{
		{
			OrgName: "Test Org",
			OrgCountry: "Ua"}}

	default_user = []UserInfos{
		{
			Uuid:		Uuid(),
			UserName:	"default_user",
			Email:		"test@super.co",
			Country:	"US",
			Password:	"test"}}
	super_user = []UserInfos{
		{
			Uuid:		Uuid(),
			UserName:	"super_user",
			Email:		"test2@super.co",
			Country:	"US",
			Password:	"test"}}
)

func SeedDb() {
	log.Print("=====> Starting seeders")

	// Roles
	DB.Clauses(clause.OnConflict{DoNothing: true}).Create(&userroles_seeder)

	// Orgs
	DB.Clauses(clause.OnConflict{DoNothing: true}).Create(&user_org)

	// Users
	DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&default_user).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				log.Println("=====> Already present")
			}
			return err
		}
		tx.Model(&default_user).Association("Org").Append(&OrgOrganisations{
			IdModel:           IdModel{
				ID: 1,
			},
		})
		tx.Model(&default_user).Association("Role").Append(SetDefault)
		return nil
	})

	DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&super_user).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				log.Println("=====> Already present")
			}
			return err
		}
		tx.Model(&super_user).Association("Org").Append(&OrgOrganisations{
			IdModel:           IdModel{
				ID: 1,
			},
		})
		tx.Model(&super_user).Association("Role").Append(SetOwner)
		return nil
	})
	
	// Update
	DB.Model(&UserRoles{}).Where("role_id", 1).Update("role", "default")
	log.Println("=====> Seeders ended")
}
