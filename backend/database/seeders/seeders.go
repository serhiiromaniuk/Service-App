package seeders

import (
	"log"

	"github.com/serhiiromaniuk/saas/backend/database/settings"
	"github.com/serhiiromaniuk/saas/backend/database/migrations"
)

var (
	db = settings.Database
	user_seeder = migrations.USERUsers{}
	userdata_seeder = migrations.UserData{
		Model:     migrations.Model{},
		FullName: "Test User",
		UserName:  "superuser",
		Email:     "test@super.co",
		Country:   "US",
		Password:  "test",
	}
)

func SeedDb() {
	// db.Model(&UserData{}).Create([]map[string]interface{}{
	// 	{"Name": "jinzhu_1", "Age": 18},
	// 	{"Name": "jinzhu_2", "Age": 20}})

	log.Println("=====> Starting seeders")
	db.Create(&userdata_seeder)
	log.Println("=====> Seeders ended")	
}
