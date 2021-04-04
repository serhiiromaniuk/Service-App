package main

import (
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
    }
}
