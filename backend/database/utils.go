package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"github.com/joho/godotenv"
	"github.com/google/uuid"
)

var (
	loggerConfig = logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
		  SlowThreshold: time.Second,   
		  LogLevel:      logger.Info, 
		  Colorful:      true })
	DB, db_err = gorm.Open(mysql.New(mysql.Config{
		DSN: declareEnvironment(),
		DontSupportRenameIndex: true,
		SkipInitializeWithVersion: false }), &gorm.Config{
			Logger: loggerConfig,
			SkipDefaultTransaction: true }	)
)

func Uuid() uuid.UUID {
	return uuid.New()
}

func declareEnvironment() (config string) {
	if godotenv.Load("/Users/serhiiromaniuk/go/src/saas/.env") != nil {
		fmt.Print(os.Getenv("PWD"))
		log.Fatal("Error loading .env file on settings module")
	}

	config = os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PASSWORD") +
	"@tcp(" + os.Getenv("MYSQL_HOST") + ":" + os.Getenv("MYSQL_PORT") + ")" + "/" +
	os.Getenv("MYSQL_DATABASE") + "?charset=utf8mb4&parseTime=True"

	return 
}
