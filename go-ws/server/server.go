package server

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

type Server struct {
	mu     sync.Mutex
	conns  map[*websocket.Conn]bool
	Router *mux.Router
	DB     *sql.DB
}

func (s *Server) InitDB() {
	var err error
	err = godotenv.Load()
	if err != nil {
		panic("failed to load .env")
	}
	s.DB, err = sql.Open("mysql", os.Getenv("DSN"))

	if err != nil {
		panic(err)
	}

	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}

	if err := s.DB.Ping(); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}
	s.Router = mux.NewRouter()
}

var upgrader = websocket.Upgrader{}

func (s *Server) Connect(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	log.Printf("new connection: %s", c.RemoteAddr())
	defer func() {
		c.Close()
		s.mu.Lock()
		delete(s.conns, c)
		s.mu.Unlock()
		log.Println("connection has been closed")
	}()
	s.mu.Lock()
	s.conns[c] = true
	s.mu.Unlock()
	log.Println("connection is being maintained")

	rows, err := s.DB.Query("SELECT * FROM `Order` WHERE done = TRUE ORDER BY `updatedAt`  DESC LIMIT 3")
	if err != nil {
		log.Fatal(err)
	}
	var orders []Order
	for rows.Next() {
		var ord Order
		if err := rows.Scan(&ord.ID, &ord.Name, &ord.Done, &ord.CreatedAt, &ord.UpdatedAt); err != nil {
			log.Fatal(err)
		}
		orders = append(orders, ord)
	}
	marshalled, err := json.Marshal(orders)
	if err != nil {
		log.Fatalf("impossible to marshall request: %s", err)
	}
	err = c.WriteMessage(1, marshalled)
	if err != nil {
		log.Println("write:", err)
	}
	for {
		_, _, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		continue
	}
}

func (s *Server) Broadcast(w http.ResponseWriter, r *http.Request) {

	rows, err := s.DB.Query("SELECT * FROM `Order` WHERE done = TRUE ORDER BY `updatedAt` DESC LIMIT 3")
	if err != nil {
		log.Fatal(err)
	}
	var orders []Order
	for rows.Next() {
		var ord Order
		if err := rows.Scan(&ord.ID, &ord.Name, &ord.Done, &ord.CreatedAt, &ord.UpdatedAt); err != nil {
			log.Fatal(err)
		}
		orders = append(orders, ord)
	}

	for conn := range s.conns {
		go func(s *websocket.Conn) {
			marshalled, err := json.Marshal(orders)
			if err != nil {
				log.Fatalf("impossible to marshall request: %s", err)
			}
			err = s.WriteMessage(1, marshalled)
			if err != nil {
				log.Println("write:", err)
			}
		}(conn)
	}

	w.Write([]byte("Success broadcast!\n"))
}
