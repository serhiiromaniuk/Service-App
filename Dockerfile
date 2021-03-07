FROM node:12.20.1-alpine3.10 AS frontend

COPY frontend frontend
RUN npm install --prefix frontend \
    && npm build --prefix frontend

FROM golang:1.15.7 as backend

# Install dependencies
RUN apt update && apt install -y libwebkit2gtk-4.0-dev

COPY backend backend
COPY package package
COPY main.go main.go
COPY --from=frontend frontend/build build

RUN unset GOPATH \
    && go build main.go \
    && echo "[✔️] Backend build complete!"
