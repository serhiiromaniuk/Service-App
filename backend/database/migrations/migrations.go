package migrations

import (
	"time"
	"log"
	// "github.com/qor/media/oss"
	"github.com/serhiiromaniuk/saas/backend/database/settings"
)

// Models main interface
var (
	db = settings.Database
	Models = []interface{} {
		&USERUsers {},
		&USERRoles {},
		// &USERFiles {},
		&UserData {} }
)

func MigratreDb() {
	log.Printf("=====> Starting migrations\n%s", Models)
	if err := db.AutoMigrate(Models...); err != nil {
		log.Fatalf("=====> Something were wrong with migrations\n%s", err)
	}
		log.Printf("=====> Migrations ended")	
}

// All migrations structs
type Model struct {
	ID        int			`gorm:"primarykey;autoIncrement;not null;"`
	CreatedAt time.Time		`gorm:"not null"`
	UpdatedAt time.Time		`gorm:"not null"`
}

type USERUsers struct {
	Model
	USERRoles []USERRoles `gorm:"many2many:user_permissions;"`
	USERData UserData
}

type USERRoles struct {
	Model
	Role	string	`gorm:"not null"`
}

// type USERFiles struct {
// 	Model
// 	File oss.OSS
// }

type UserData struct {
	ID			int		`gorm:"primarykey;autoIncrement;not null;"` // fix foreign key
	FullName	string	`gorm:"not null"`
	UserName	string	`gorm:"not null"`
	Email		string	`gorm:"not null"`
	Country		string	`gorm:"not null"`
	Password	string	`gorm:"not null"`
}
