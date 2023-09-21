package main

import (
	"github.com/gorilla/websocket"
)

func (s *Server) InitRouter() {

	s.conns = make(map[*websocket.Conn]bool)
	s.Router.HandleFunc("/ws", s.Connect)
	s.Router.HandleFunc("/broadcast", s.Broadcast).Methods("POST")
	s.Router.HandleFunc("/", HomeHandler).Methods("POST")
}
