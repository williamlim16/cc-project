package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

type Order struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Done bool   `json:"done"`
}

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

	rows, err := s.DB.Query(`SELECT * FROM "Order" LIMIT 3`)
	if err != nil {
		log.Fatal(err)
	}
	var orders []Order
	for rows.Next() {
		var ord Order
		if err := rows.Scan(&ord.ID, &ord.Name, &ord.Done); err != nil {
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
