package settings

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func DeclareEnvironment() {
	// err := godotenv.Load("../../../.env.local")

	if godotenv.Load("../../../.env.local") != nil {
	  log.Fatalf("Error loading .env file")
	}

	config := os.Getenv("MYSQL_USER") + 
	":" +
	os.Getenv("MYSQL_PASSWORD") +
	"@tcp(" + os.Getenv("MYSQL_HOST") + ":" + os.Getenv("MYSQL_PORT") + ")" + "/" +
	os.Getenv("MYSQL_DATABASE") +
	"?charset=utf8&parseTime=True&loc=Local"

	return config
}