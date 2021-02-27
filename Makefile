
####################################################################################
.PHONY: all
all: clean build-backend build-frontend open
backend: clean build-backend
frontend: clean build-frontend

##
clean:
	@rm -rf ./saas.app ./frontend/build ./saas
	@echo "[✔️] Clean complete!"
build-backend:
	@go build -o ./saas.app/Contents/MacOS/saas
	@echo "[✔️] Backend build complete!"
build-frontend:
	@cd ./frontend && npm install
	@mkdir -p ./saas.app/Contents/MacOS
	@echo "[✔️] Initialization complete!"
	@cd ./frontend && npm run build
	@echo "[✔️] Frontend build complete!"
open:
	@open ./saas.app
	@echo "[✔️] App is running!"
start:
	@go build main.go ; ./main

####################################################################################
db-compose:
	@docker-compose --env-file .env down -v
	@docker-compose --env-file .env up -d
