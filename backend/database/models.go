package database

import (
	"time"
	"github.com/google/uuid"
)

type IdModel struct {
	ID        int       `gorm:"primarykey;not null" json:"id"`
}

type UpdatedAndCreated struct {
	CreatedAt time.Time `gorm:"not null" json:"created_at"`
	UpdatedAt time.Time `gorm:"not null" json:"-"`
}

type UserRoles struct {
	RoleID int    `gorm:"primarykey;not null" json:"-"`
	Role   string `gorm:"not null;" json:"role"`
}

type UserInfos struct {
	Uuid      uuid.UUID `gorm:"primarykey;not null;" json:"uuid"`
	UserName  string    `gorm:"not null" json:"username" binding:"required,alphanum"`
	OrgID	  int 		`gorm:"default:null" json:"org_id"`
	Email     string    `gorm:"not null;unique" json:"email" binding:"required,email"`
	Country   string    `gorm:"default:null" json:"country" binding:"required"`
	IsActive  bool      `gorm:"default:true;not null" json:"active"`
	Password  string    `gorm:"not null" json:"password" binding:"required,min=6"`
	UpdatedAndCreated

	// Associations
	Role []UserRoles `gorm:"many2many:user_permissions;foreignKey:Uuid;joinForeignKey:Uuid;References:RoleID;JoinReferences:RoleID" json:"roles"`
	Org OrgOrganisations `gorm:"foreignKey:OrgID;" json:"-" binding:"-"`
	CountryCode CommonCountries `gorm:"foreignKey:Country;" json:"-" binding:"-"`
}

type OrgOrganisations struct {
	IdModel
	OrgName		string `gorm:"not null;unique" json:"org_name" binding:"required,alphanum"`
	OrgCountry	string `gorm:"default:UA" json:"org_country" binding:"required"`
	UpdatedAndCreated

	// Associacions
	Country CommonCountries `gorm:"foreignKey:OrgCountry;" json:"-" binding:"-"`
}

type BlockContainers struct {
	IdModel
	Name				string `gorm:"not null;unique" json:"name" binding:"required"`
	Body				string `gorm:"default:null" json:"body"`
	UpdatedAndCreated
}

type CommonCountries struct {
	Name				string `gorm:"not null;unique" json:"name" binding:"-"`
	Code				string `gorm:"primarykey;not null;unique" json:"code" binding:"-"`
}
