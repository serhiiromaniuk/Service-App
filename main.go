package main

import (
    "github.com/serhiiromaniuk/saas/server"
    "github.com/serhiiromaniuk/saas/webserver"
)

func main() {
    s := 1

    switch s {
        case 1:
            webserver.Webserver()
        case 2:
            server.Server()
    }

}
