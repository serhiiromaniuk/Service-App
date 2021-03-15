package settings

const (
	Host = "127.0.0.1"
	Port = "8000"
)

type RegistrationStruct struct {
	Username	string `json:"username", db:"username"`
	Surname		string `json:"surname", db:"password"`
	Country		string `json:"country", db:"password"`
	Password	string `json:"password", db:"password"`
}