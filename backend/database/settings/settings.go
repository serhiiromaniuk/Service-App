package settings

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"github.com/joho/godotenv"
)

var (
	LoggerConfig = logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
		  SlowThreshold: time.Second,   
		  LogLevel:      logger.Info, 
		  Colorful:      false })
	Database, Err = gorm.Open(mysql.New(mysql.Config{
		DSN: declareEnvironment(),
		DefaultStringSize: 128,
		DontSupportRenameIndex: true,
		SkipInitializeWithVersion: false }), &gorm.Config{
			Logger: LoggerConfig,
			SkipDefaultTransaction: true })
)

func declareEnvironment() (config string) {
	if godotenv.Load(".env") != nil {
		fmt.Print(os.Getenv("PWD"))

		log.Fatal("Error loading .env file on settings module")
	}

	config = os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PASSWORD") +
	"@tcp(" + os.Getenv("MYSQL_HOST") + ":" + os.Getenv("MYSQL_PORT") + ")" + "/" +
	os.Getenv("MYSQL_DATABASE")

	return 
}