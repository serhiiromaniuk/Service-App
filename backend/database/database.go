package database

import (
	"log"
)

func InitDatabase() {
	if db_err != nil {
		log.Fatalf("Error connecting database.\n%s", db_err)
	}

	MigratreDb()
	SeedDb()
}
