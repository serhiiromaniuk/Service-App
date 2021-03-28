package migrations

import (
	"time"
	"log"
	// "encoding/json"
	// "github.com/qor/media/oss"
	"saas/backend/database/settings"
)

func MigratreDb() {
	log.Printf("=====> Starting migrations")
	if err := db.AutoMigrate(Models...); err != nil {
		log.Fatalf("=====> Something were wrong with migrations\n%s", err)
	}
	log.Printf("=====> Migrations ended")
}

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
	RoleID  int		`gorm:"primarykey;not null" json:"-"`
	Role	string	`gorm:"not null;" json:"role"`
}

type UserInfos struct {
	UserID      int			`gorm:"primarykey;autoIncrement;not null;unique"	json:"id"`
	UserName	string		`gorm:"not null"									json:"username"		binding:"required,alphanum"`
	Email		string		`gorm:"not null;unique"								json:"email"		binding:"required,email"`
	Country		string		`gorm:"not null"									json:"country"		binding:"required"`
	Password	string		`gorm:"not null"			 						json:"password"		binding:"required,min=6"`
	IsActive	bool		`gorm:"default:true;not null"						json:"active"`
	CreatedAt	time.Time	`gorm:"not null" 									json:"created_at"`
	UpdatedAt	time.Time	`gorm:"not null" 									json:"updated_at"`
	
	// Associations
	Role	[]UserRoles	`gorm:"many2many:user_permissions;foreignKey:UserID;joinForeignKey:UserID;References:RoleID;JoinReferences:RoleID" json:"role"` 
}
