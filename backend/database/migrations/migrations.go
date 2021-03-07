package migrations

import (
	"time"

)

// Model definition
type Model struct {
	ID        int			`gorm:"primarykey;autoIncrement;not null;"`
	CreatedAt time.Time		`gorm:"not null"`
	UpdatedAt time.Time		`gorm:"not null"`
}

// USERUsers structure
type USERUsers struct {
	Model
    Name	string
	USERRoles []USERRoles `gorm:"many2many:user_permissions;"`
}

// USERRoles structure
type USERRoles struct {
	Model
	Role	string	`gorm:"not null"`
}

// Models main interface
var Models = []interface{} {
	&USERUsers {},
	&USERRoles {}}
