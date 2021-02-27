package main

import (
    "github.com/serhiiromaniuk/saas/backend/database"

    "github.com/serhiiromaniuk/saas/backend"
    "github.com/serhiiromaniuk/saas/package/macos"
)

func main() {
    s := 3

    switch s {
        case 1:
            macos.PackageApp()
        case 2:
            backend.Server()
        case 3:
            database.Database()
    }

}
