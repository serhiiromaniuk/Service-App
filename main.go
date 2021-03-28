package main

import (
    // "saas/backend/database"

    "saas/backend"
    "saas/package/macos"
)

func main() {
    s := 2

    switch s {
        case 1:
            macos.PackageApp()
        case 2:
            backend.Server()
        // case 3:
        //     database.Database()
    }
}
