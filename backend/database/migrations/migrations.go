package migrations

import (
	"time"
	"log"
	// "github.com/qor/media/oss"
	"github.com/serhiiromaniuk/saas/backend/database/settings"
)

func MigratreDb() {
	log.Printf("\n\n=====> Starting migrations\n%s", Models)
	if err := db.AutoMigrate(Models...); err != nil {
		log.Fatalf("\n\n=====> Something were wrong with migrations\n%s", err)
	}
	log.Printf("=====> Migrations ended")	
}

// Models main interface
var (
	db = settings.Database
	Models = []interface{} {
		&UserRoles {},
		&UserInfos {} }
)

type Model struct {
	ID        int			`gorm:"primarykey;not null"`
	CreatedAt time.Time		`gorm:"not null"`
	UpdatedAt time.Time		`gorm:"not null"`
}

type UserRoles struct {
	RoleID  int		`gorm:"primarykey;not null"`
	Role	string	`gorm:"not null;"`
}

type UserInfos struct {
	UserID      int			`gorm:"primarykey;autoIncrement;not null;unique"`
	FullName	string		`gorm:"not null"`
	UserName	string		`gorm:"not null"`
	Email		string		`gorm:"not null;unique"`
	Country		string		`gorm:"not null"`
	Password	string		`gorm:"not null"`
	CreatedAt	time.Time	`gorm:"not null"`
	UpdatedAt	time.Time	`gorm:"not null"`
	
	// Associations
	Roles	[]UserRoles	`gorm:"many2many:user_permissions;foreignKey:UserID;joinForeignKey:UserID;References:RoleID;JoinReferences:RoleID"` 
}
