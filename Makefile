
####################################################################################
.PHONY: all
all: clean build-backend build-frontend open
backend: clean build-backend
frontend: clean build-frontend

##
.PHONY: clean
clean:
	@rm -rf ./saas.app ./frontend/build ./saas
	@echo "[✔️] Clean complete!"

##
.PHONY: build-backend
build-backend:
	@go get -u github.com/gobuffalo/packr/packr
	@go get -u github.com/gin-gonic/gin
	@go get -u gorm.io/gorm
	@go get -u gorm.io/driver/sqlite
	@dep ensure -add github.com/gobuffalo/packr
	@dep ensure -add github.com/zserge/webview
	@go build -o ./saas.app/Contents/MacOS/saas
	@echo "[✔️] Backend build complete!"

.PHONY: build-frontend
build-frontend:
	@cd ./frontend && npm install
	@mkdir -p ./saas.app/Contents/MacOS
	@echo "[✔️] Initialization complete!"
	@cd ./frontend && npm run build
	@echo "[✔️] Frontend build complete!"
##
.PHONY: open
open:
	@open ./saas.app
	@echo "[✔️] App is running!"

####################################################################################
db-compose:
	@docker-compose down -v
	@docker-compose up -d
