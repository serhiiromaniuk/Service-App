package database

import (
	"log"

	"github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"encoding/json"
	"io/ioutil"
)

type RolesMap struct {
	def  string
	manager string
	admin   string
	owner   string
}

var UserRolesMap = &RolesMap{
	def:  "default",
	manager: "manager",
	admin:   "admin",
	owner:   "owner"}

var SetDefault = &UserRoles{Role: UserRolesMap.def}
var SetManager = &UserRoles{Role: UserRolesMap.manager}
var SetAdmin = &UserRoles{Role: UserRolesMap.admin}
var SetOwner = &UserRoles{Role: UserRolesMap.owner}

var (
	userroles_seeder = []UserRoles{
	{	Role: "default" },
	{	Role: "manager" },
	{	Role: "admin" },
	{	Role: "owner" }}


	user_org = []OrgOrganisations{
		{
			OrgName: "Test Org",
			OrgCountry: "UA"}}

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
			Password:	"test" }}
)

func SeedDb() {
	log.Print("=====> Starting seeders")

	// Common Countries
	var countryArray []CommonCountries
	filePath := "backend/database/countries.json"
	countries, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Printf( "=====> Error while reading file %s\n", filePath )
		log.Printf("File error: %v\n", err)
	}

	err = json.Unmarshal(countries, &countryArray)
	if err != nil {
	  log.Println("error:", err)
	}
  
	log.Println("=====> Filling CommonCountries")
	for k := range countryArray {
		DB.Transaction(func(tx *gorm.DB) error {
			if err := tx.Create(CommonCountries{
				Name: countryArray[k].Name,
				Code: countryArray[k].Code }).Error; err != nil {
					if err.(*mysql.MySQLError).Number == 1062 {
						return nil
					}
					log.Println("=====> Some error occured ", err)
					return err
			}
			return nil
		})
	}

	// Roles
	DB.Clauses(clause.OnConflict{DoNothing: true}).Create(&userroles_seeder)

	// Orgs
	DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&user_org).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				log.Println("==> ORG already present")
			}
			return err
		}
		return nil
	})

	// Users
	DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&default_user).Error; err != nil {
			if err.(*mysql.MySQLError).Number == 1062 {
				log.Println("==> `default_user` already present")
			}
			return err
		}
		tx.Model(&default_user).Association("OrgMap").Append(&OrgOrganisations{ IdModel: IdModel{ ID: 1 } })
		tx.Model(&default_user).Association("RoleMap").Append(&UserRoles{ IdModel: IdModel{ ID: 1 } })
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
				ID: 1 },
		})
		tx.Model(&super_user).Association("Role").Append(SetDefault)
		return nil
	})

	// Update
	// DB.Model(&UserRoles{}).Where("id", 1).Update("role", "default")
	

	log.Println("=====> Seeders ended")
}
