package database

import (
	"log"

	"gorm.io/gorm"
	"github.com/go-sql-driver/mysql"
    "github.com/davecgh/go-spew/spew"
)

func MigratreDb() {
	Models := []interface{}{
		&CommonCountries{},
		&BlockContainers{},
		&UserRoles{},
		&OrgOrganisations{},
		&UserInfos{} }

	log.Printf("=====> Starting migrations")
	for _, model := range Models {
		log.Println("=====> Starting migration")
		spew.Dump(model)
		if err_m := DB.Transaction(func(tx *gorm.DB) error {
			if err_s := tx.AutoMigrate(model); err_s != nil {
				if err_s.(*mysql.MySQLError).Number == 1062 {
					log.Println("==> Already present")
				}
			}
			return nil
		}); err_m != nil {
			log.Fatalf("=====> Something were wrong with migrations\n%s", err_m)
		}
	}
	log.Printf("=====> Migrations ended")
}
