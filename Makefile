
####################################################################################
.PHONY: all
all: clean init build open

##
.PHONY: clean
clean:
	@rm -rf ./saas.app ./frontend/build
	@echo "[✔️] Clean complete!"
##
.PHONY: init
init:
	@go get -u github.com/gobuffalo/packr/packr
	@dep ensure -add github.com/gobuffalo/packr
	@dep ensure -add github.com/zserge/webview
	@go get -u github.com/gin-gonic/gin
	@cd ./frontend && npm install
	@mkdir -p ./saas.app/Contents/MacOS
	@echo "[✔️] Initialization complete!"
##
.PHONY: build
build:
	@cd ./frontend && npm run build
	@go build -o ./saas.app/Contents/MacOS/saas
	@echo "[✔️] Build complete!"
##
.PHONY: open
open:
	@open ./saas.app
	@echo "[✔️] App is running!"

####################################################################################
db:
	@docker-compose down -v
	@docker-compose up -d
