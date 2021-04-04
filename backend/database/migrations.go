package database

import (
	"log"
	"time"

	"github.com/google/uuid"
    "github.com/davecgh/go-spew/spew"
)

func Uuid() uuid.UUID {
	return uuid.New()
}

func MigratreDb() {
	Models := []interface{}{
		&UserRoles{},
		&OrgOrganisations{},
		&UserInfos{}}

	log.Printf("=====> Starting migrations")
	for _, model := range Models {
		log.Println("=====> Starting migration")
		spew.Dump(model)
		if err := DB.AutoMigrate(model); err != nil {
			log.Fatalf("=====> Something were wrong with migrations\n%s", err)
		}
	}
	log.Printf("=====> Migrations ended")
}

type IdModel struct {
	ID        int       `gorm:"primarykey;not null"`
}

type UpdatedAndCreated struct {
	CreatedAt time.Time `gorm:"not null" json:"created_at"`
	UpdatedAt time.Time `gorm:"not null" json:"updated_at"`
}

type UserRoles struct {
	RoleID int    `gorm:"primarykey;not null" json:"-"`
	Role   string `gorm:"not null;" json:"role"`
}

type UserInfos struct {
	Uuid      uuid.UUID `gorm:"primarykey;not null;" json:"uuid"`
	UserName  string    `gorm:"not null" json:"username" binding:"required,alphanum"`
	OrgID	  int 		`gorm:"default:null" json:"-" binding:"required,alphanum"`
	Email     string    `gorm:"not null;unique" json:"email" binding:"required,email"`
	Country   string    `gorm:"not null" json:"country" binding:"required"`
	IsActive  bool      `gorm:"default:true;not null" json:"active"`
	Password  string    `gorm:"not null" json:"password" binding:"required,min=6"`
	UpdatedAndCreated

	// Associations
	Role []UserRoles `gorm:"many2many:user_permissions;foreignKey:Uuid;joinForeignKey:Uuid;References:RoleID;JoinReferences:RoleID" json:"role"`
	Org OrgOrganisations `gorm:"foreignKey:OrgID;" json:"org"`
}

type OrgOrganisations struct {
	IdModel
	OrgName		string `gorm:"not null" json:"org_name"`
	OrgCountry	string `gorm:"not null" json:"org_country"`
	UpdatedAndCreated
}
