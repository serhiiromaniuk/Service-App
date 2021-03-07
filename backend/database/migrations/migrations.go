package migrations

import (
	"time"
)

// Model definition
type Model struct {
	ID        uint			`gorm:"primaryKey" gorm:"autoIncrement" gorm:"not null"`
	CreatedAt time.Time		//`gorm:"autoCreateTime"`
	UpdatedAt time.Time		//`gorm:"autoCreateTime"`
}

// USERpermissions structure
type USERpermissions struct {
	Model
	UserID	USERusers	`gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` //`gorm:"embedded"`
	RoleID	USERroles	`gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

// USERusers structure
type USERusers struct {
	Model
    Name       	string
}

// USERroles structure
type USERroles struct {
	Model
	Role	string
}

// Models main interface
var Models = []interface{} {
	&USERpermissions {}, 
	&USERusers {},
	&USERroles {}}
