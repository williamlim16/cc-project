package main

import (
	"database/sql"
	"net/http"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Server struct {
	mu     sync.Mutex
	conns  map[*websocket.Conn]bool
	Router *mux.Router
	DB     *sql.DB
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Gorilla!\n"))
}

func main() {
	s := Server{}
	s.InitDB()
	s.InitRouter()
	http.ListenAndServe("0.0.0.0:8000", s.Router)
	defer s.DB.Close()
}
