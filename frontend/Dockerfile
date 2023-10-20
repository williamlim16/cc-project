FROM node:lts

COPY . .
RUN npm install && \ 
    npm run build

FROM golang:1.21

WORKDIR /usr/src/app

COPY go.mod ./
RUN go mod download && go mod verify

COPY . .
RUN go build main.go

CMD ["./main"]
