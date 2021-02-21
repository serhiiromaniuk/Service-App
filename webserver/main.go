package webserver

import (
    "encoding/json"
    "net/http"

    "github.com/gobuffalo/packr"
    "github.com/webview/webview"

    "github.com/serhiiromaniuk/saas/webserver/settings"
)

// Message : Define Json structure
type Message struct {
    Text string `json:"text"`
}

// Webserver : main package function
func Webserver() {

    folder := packr.NewBox("../frontend/build")

    http.Handle("/", http.FileServer(folder))

    // Handle to showMessage func on /hello path
    http.HandleFunc("/hello", showMessage)

    // Run server at port 8000 as goroutine
    // for non-block working
    go http.ListenAndServe(":8000", nil)

    debug := true
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
    // Create Message JSON data
    message := Message{
		"World",
	}

    // Return JSON encoding to output
    output, err := json.Marshal(message)

    // Catch error, if it happens
    if err != nil {
        http.Error(writer, err.Error(), http.StatusInternalServerError)
        return
    }


    writer.Header().Set("Content-Type", "application/json")
    writer.Write(output)
}