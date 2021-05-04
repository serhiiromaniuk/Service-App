package backend

import (
	"github.com/google/uuid"
	"time"
	"saas/backend/database"
)

type customUserResponse struct {
	Uuid      uuid.UUID			`json:"uuid"`
	UserName  string    		`json:"username"`
	Email     string    		`json:"email"`
	Country   string    		`json:"country"`
	IsActive  bool      		`json:"active"`
	CreatedAt time.Time 		`json:"created_at"`
}

type customOrgResponse struct {
	ID			int 		`json:"org_id"`
	OrgName		string		`json:"org_name"`
	OrgCountry	string		`json:"org_country"`
	CreatedAt	time.Time 	`json:"created_at"`
}

type customContainerResponse struct {
	ID 			int			`json:"id"`
	Owner		string		`json:"owner"` 
	Name		string		`json:"name"`
	Body		string		`json:"body"`
	CreatedAt 	time.Time	`json:"created_at"`
}

type customLoginResponse struct {
	Email     string    `form:"email" json:"email" binding:"required,email"`
	Password  string    `form:"password" json:"password" binding:"required,min=6"`
}

func userResponse(user database.UserInfos) customUserResponse {
	return customUserResponse{
		Uuid:      user.Uuid,
		UserName:  user.UserName,
		Email:     user.Email,
		Country:   user.Country,
		IsActive:  user.IsActive,
		CreatedAt: user.CreatedAt }
}

func userLoginResponse(user customLoginResponse) customLoginResponse {
	return customLoginResponse{
		Email:     user.Email,
		Password:  user.Password }
}

func orgResponse(org database.OrgOrganisations) customOrgResponse {
	return customOrgResponse{
		ID:	org.ID,
		OrgName: org.OrgName,
		OrgCountry: org.OrgCountry }
}

func containerResponse(container database.BlockContainers) customContainerResponse {
	return customContainerResponse{
		ID:		container.ID,
		Owner:	container.Owner,
		Name:	container.Name,
		Body:	container.Body,
		CreatedAt: container.CreatedAt }
}
