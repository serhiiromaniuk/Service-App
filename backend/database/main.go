package database

import (
	// "fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/serhiiromaniuk/saas/backend/database/migrations"
)

// Database function
func Database() {
	dsn := dbConfig()
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN: dsn,
		DefaultStringSize: 256,
		DontSupportRenameIndex: true,
		SkipInitializeWithVersion: false }), &gorm.Config{})

	if err != nil {
		log.Fatalf("Error connecting database.\n%s", err)
	}

	db.AutoMigrate(migrations.Models...)
}

func dbConfig() string {
	err := godotenv.Load(".env")

	if err != nil {
	  log.Fatalf("Error loading .env file.\n%s", err)
	}

	config := os.Getenv("MYSQL_USER") + 
	":" +
	os.Getenv("MYSQL_PASSWORD") +
	"@tcp(" + os.Getenv("MYSQL_HOST") + ":" + os.Getenv("MYSQL_PORT") + ")" + "/" +
	os.Getenv("MYSQL_DATABASE")

	return config
}
