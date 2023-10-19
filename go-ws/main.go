package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"

	_ "github.com/go-sql-driver/mysql"
	"github.com/williamlim16/go-ws/server"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Gorilla!\n"))
}

func main() {
	s := server.Server{}
	s.InitDB()
	s.InitRouter()
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	// http.ListenAndServe("0.0.0.0:8000", s.Router)
	log.Fatal(http.ListenAndServe("0.0.0.0:8000", handlers.CORS(originsOk, headersOk, methodsOk)(s.Router)))

	defer s.DB.Close()
}
