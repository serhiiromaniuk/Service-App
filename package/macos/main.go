package macos

import (
    "encoding/json"
    "net/http"

    "github.com/gobuffalo/packr"
    "github.com/webview/webview"

    "github.com/serhiiromaniuk/saas/package/macos/settings"
)

// Message : Define Json structure
type Message struct {
    Text string `json:"text"`
}

// PackageApp : main package function
func PackageApp() {
    folder := packr.NewBox("../frontend/build")
    debug := true

    http.Handle("/", http.FileServer(folder))
    http.HandleFunc("/hello", showMessage)
    go http.ListenAndServe(":8000", nil)

	window := webview.New(debug)
	defer window.Destroy()
	window.SetTitle("Go App")
	window.SetSize(
        settings.ScreenWidth,
        settings.ScreenHight,
        webview.HintNone,
    )

	window.Navigate("http://localhost:8000")
	window.Run()
}

func showMessage(writer http.ResponseWriter, request *http.Request) {
    message := Message {
		"World",
	}
    output, err := json.Marshal(message)

    if err != nil {
        http.Error(writer, err.Error(), http.StatusInternalServerError)
        return
    }

    writer.Header().Set("Content-Type", "application/json")
    writer.Write(output)
}