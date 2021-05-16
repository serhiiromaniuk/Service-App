# Service App (WIP)

### Hello there! 
This project is considered to explain how to combine dynamic frontend rendering with fast-and-furious Gin router from the box.

### Application technical components
This application created by using Gin framework for backend as router servcie and client app using React components.

### How To
Be sure, that you have installed Go `1.15.7+` and NodeJs `v12+`.
Also there should be provided path to `.env` with `MYSQL_*` variables in `backend/database/utils.go`. Be sure that you are running MySql locally (check docker-compose.yml) or connection to remote MySql server is established.

1. To build and lauch backend, follow next steps:
    - Switch in `main.go` file to corresponding package:
      - `macos.PackageApp()` -- for servicng static files in Go webview environment
      - `backend.Server()` -- for running Gin
    - `go build main.go` (if some issue occurs, run `unset GOPATH`)
    - `./main`
2. To build and launch frontend app:
    - Go to `frontend/` directory
    - Bootstrap the project by `yarn`
    - Create app
      - To run locally `yarn start`
      - To create static bundle, perform `yarn build`

### Voila!
Here is a login screen from your running app:
![image](https://user-images.githubusercontent.com/45049898/118410692-683cd200-b699-11eb-899d-99ad9e911fcf.png)



