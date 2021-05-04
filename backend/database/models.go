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
	UpdatedAt time.Time `gorm:"not null" json:"updated_at"`
}

type UserRoles struct {
	IdModel
	Role   string `gorm:"not null;unique" json:"role" binding:"-"`
}

type UserInfos struct {
	Uuid      uuid.UUID `gorm:"primarykey;not null;size:36;" json:"uuid"`
	UserName  string    `gorm:"not null;size:128;" json:"username" binding:"required,alphanum"`
	OrgID	  int 		`gorm:"default:null" json:"org_id"`
	RoleID 	  int 		`gorm:"default:1" json:"role_id"`
	Email     string    `gorm:"not null;unique" json:"email" binding:"required,email"`
	Country   string    `gorm:"default:null;size:4" json:"country" binding:"required"`
	IsActive  bool      `gorm:"default:true;not null" json:"active"`
	Password  string    `gorm:"not null;size:256" json:"password" binding:"required,min=6"`
	UpdatedAndCreated

	// Associations
	RoleMap UserRoles `gorm:"foreignKey:RoleID;" json:"-" binding:"-"`
	OrgMap OrgOrganisations `gorm:"foreignKey:OrgID;" json:"-" binding:"-"`
	CountryMap CommonCountries `gorm:"foreignKey:Country;" json:"-" binding:"-"`
}

type OrgOrganisations struct {
	IdModel
	OrgName		string `gorm:"not null;unique" json:"org_name" binding:"required"`
	OrgCountry	string `gorm:"not null;size:4" json:"org_country" binding:"required"`
	UpdatedAndCreated

	// Associacions
	Country CommonCountries `gorm:"foreignKey:OrgCountry;" json:"-" binding:"-"`
}

type BlockContainers struct {
	IdModel
	Owner				string `gorm:"default:null;size:36" json:"owner" binding:"required"`
	Name				string `gorm:"not null;" json:"name" binding:"required"`
	Body				string `gorm:"not null;" json:"body" binding:"required"`
	UpdatedAndCreated

	// Associacions
	UserMap UserInfos `gorm:"foreignKey:Owner;" json:"-" binding:"-"`
}

type CommonCountries struct {
	Name				string `gorm:"not null;unique" json:"name" binding:"-"`
	Code				string `gorm:"primarykey;not null;unique" json:"code" binding:"-"`
}
