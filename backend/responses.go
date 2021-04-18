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
	ID 			int			`json:"container_id"` 
	Name		string		`json:"name"`
	Body		string		`json:"body"`
	CreatedAt 	time.Time	`json:"created_at"`
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

func orgResponse(org database.OrgOrganisations) customOrgResponse {
	return customOrgResponse{
		ID:	org.ID,
		OrgName: org.OrgName,
		OrgCountry: org.OrgCountry }
}

func containerResponse(container database.BlockContainers) customContainerResponse {
	return customContainerResponse{
		ID:		container.ID,
		Name:	container.Name,
		Body:	container.Body }
}