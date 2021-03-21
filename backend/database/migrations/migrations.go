package migrations

import (
	"time"
	"log"
	// "encoding/json"
	// "github.com/qor/media/oss"
	"github.com/serhiiromaniuk/saas/backend/database/settings"
)

func MigratreDb() {
	log.Printf("=====> Starting migrations")
	if err := db.AutoMigrate(Models...); err != nil {
		log.Fatalf("=====> Something were wrong with migrations\n%s", err)
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
	UserID      int			`gorm:"primarykey;autoIncrement;not null;unique json:"user_id""`
	FullName	string		`gorm:"not null" json:"fullname"`
	UserName	string		`gorm:"not null" json:"username"`
	Email		string		`gorm:"not null;unique" json:"email"`
	Country		string		`gorm:"not null" json:"country"`
	Password	string		`gorm:"not null" json:"password"`
	CreatedAt	time.Time	`gorm:"not null" json:"created_at"`
	UpdatedAt	time.Time	`gorm:"not null" json:"updated_at"`
	
	// Associations
	Roles	[]UserRoles	`gorm:"many2many:user_permissions;foreignKey:UserID;joinForeignKey:UserID;References:RoleID;JoinReferences:RoleID"` 
}
