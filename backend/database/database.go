package database

import (
	"log"
	// "database/sql"

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



// func SaveFile(filePath) {
// 	DbConnector()
// 	media.RegisterCallbacks(db)

// 	storage := filesystem.New("public")

// 	storage.Put(filePath, reader)
// 	list, err := storage.List(filePath)

// 	if err != nil {
// 		log.Fatalf("Error outputting file.\n%s", err)
// 	}
// }
