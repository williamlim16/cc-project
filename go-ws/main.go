package main

import (
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"

	"github.com/williamlim16/go-ws/server"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Gorilla!\n"))
}

func main() {
	s := server.Server{}
	s.InitDB()
	s.InitRouter()
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "HEAD", "POST", "PATCH", "PUT", "OPTIONS", "DELETE"},
	})
	log.Fatal(http.ListenAndServe(":8000", c.Handler(s.Router)))

	defer s.DB.Close()
}
