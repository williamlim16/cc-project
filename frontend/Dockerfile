FROM node:lts AS react

COPY . .
RUN npm install && \ 
    npm run build

FROM golang:1.21

WORKDIR /usr/src/app
COPY go.mod ./
COPY --from=react /dist /usr/src/app/dist
COPY --from=react .env /usr/src/app/.env
RUN go mod download && go mod verify

COPY . .
RUN go build main.go

CMD ["./main"]
