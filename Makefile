
.PHONY: all
all: clean build-backend build-frontend open
backend: clean build-backend
frontend: clean build-frontend

##
clean:
	@rm -rf ./saas.app ./frontend/build ./saas
	@echo "[✔️] Clean complete!"
build-backend:
	@mkdir -p ./saas.app/Contents/MacOS
	@go build -o ./saas.app/Contents/MacOS/saas
	@echo "[✔️] Backend build complete!"
build-frontend:
	@cd ./frontend && yarn
	@echo "[✔️] Initialization complete!"
	@cd ./frontend && yarn build
	@echo "[✔️] Frontend build complete!"
open:
	@open ./saas.app
	@echo "[✔️] App is running!"
run:
	@go run main.go
package-app:
	@mkdir -p ./saas.app/Contents/MacOS
	@go build -o ./saas.app/Contents/MacOS/saas
	@cd ./frontend && yarn build
	@echo "[✔️] Frontend build complete!"
	@open ./saas.app
	@echo "[✔️] App is running!"

release:
	@echo APP_VERSION=${APP_VERSION}
	@git checkout ${APP_VERSION}
	@export OS_TYPE=$(uname -s)
	@export OS_ARCH=$(uname -m)
	@go build -o releases/${APP_VERSION}_be_${OS_TYPE}_${OS_ARCH} main.go
	@cd frontend && yarn build && zip -r ../releases/${APP_VERSION}_fe_$(uname -s)_$(uname -m) build/ && cd ..
	@ls -la releases
	@git checkout master

db-compose:
	@docker-compose --env-file .env down -v
	@docker-compose --env-file .env up -d mysql
