package macos

import (
    "net/http"

    "github.com/gobuffalo/packr"
    "github.com/webview/webview"

    "saas/backend"
)

func PackageApp() {
    folder := packr.NewBox("/Users/serhiiromaniuk/go/src/saas/frontend/build")
    http.Handle("/", http.FileServer(folder))
    go http.ListenAndServe(":8080", nil)
    
    window := webview.New(true)
	defer window.Destroy()
	window.SetTitle("Go App")
	window.SetSize(
        ScreenWidth,
        ScreenHight,
        webview.HintNone )

	window.Navigate("http://127.0.0.1:3000")
	window.Run()
    backend.Server()
}
