package migrations

type User_permissions struct {
	Id         	int64
	User_id  	int64
	Role  		string
	Created_at  string
	Updated_at  string
}

type User_users struct {
    Id         	int64
    Name       	string
    Created_at  string
    Updated_at  string
}

var Models = []interface{} {
	&User_permissions {}, 
	&User_users {}}
