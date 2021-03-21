package database

import (
	"log"

	"github.com/serhiiromaniuk/saas/backend/database/migrations"
	"github.com/serhiiromaniuk/saas/backend/database/seeders"
	"github.com/serhiiromaniuk/saas/backend/database/settings"
)
var (
	LoggerConfig = settings.LoggerConfig
	Database, Err = settings.Database, settings.Err
)

func InitDatabase() {
	if Err != nil {
		log.Fatalln("Error connecting database.\n%s", Err)
	}

	migrations.MigratreDb()
	seeders.SeedDb()
}
