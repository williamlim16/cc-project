package main

import (
	"net/http"

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
	http.ListenAndServe("0.0.0.0:8000", s.Router)
	defer s.DB.Close()
}
