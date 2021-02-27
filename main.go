package main

import (
    "github.com/serhiiromaniuk/saas/backend/database"

    "github.com/serhiiromaniuk/saas/backend"
    "github.com/serhiiromaniuk/saas/webserver"
)

func main() {
    s := 3

    

    switch s {
        case 1:
            webserver.Webserver()
        case 2:
            server.Server()
        case 3:
            database.Database()
    }

}
