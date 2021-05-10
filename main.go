package main

import (
    "saas/backend"
    "saas/package/macos"
)

func main() {
    s := 1

    switch s {
        case 1:
            macos.PackageApp()
        case 2:
            backend.Server()
    }

    // if (os.Getenv("MODE") == "pkg") {
    //     macos.PackageApp()
    // } else if (os.Getenv("MODE") == "run") {
    //     backend.Server()
    // } else {
    //     backend.Server()
    // }
}
