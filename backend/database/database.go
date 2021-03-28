package database

import (
	"log"

	"saas/backend/database/migrations"
	"saas/backend/database/seeders"
	"saas/backend/database/settings"
)
var (
	LoggerConfig = settings.LoggerConfig
	Database, Err = settings.Database, settings.Err
)

func InitDatabase() {
	if Err != nil {
		log.Fatalf("Error connecting database.\n%s", Err)
	}

	migrations.MigratreDb()
	seeders.SeedDb()
}
