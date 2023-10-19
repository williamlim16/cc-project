package server

import (
	"github.com/gorilla/websocket"
)

func (s *Server) InitRouter() {
	s.conns = make(map[*websocket.Conn]bool)
	s.Router.HandleFunc("/ws", s.Connect)
	s.Router.HandleFunc("/broadcast", s.Broadcast).Methods("POST")
	s.Router.HandleFunc("/menus/{id}", s.DeleteMenu).Methods("DELETE")
	s.Router.HandleFunc("/menus", s.GetMenus).Methods("GET")
	s.Router.HandleFunc("/menus", s.AddMenu).Methods("POST")
	s.Router.HandleFunc("/orders", s.GetOrders).Methods("GET")
	s.Router.HandleFunc("/orders", s.AddOrders).Methods("POST")
	s.Router.HandleFunc("/orders/{id}", s.DeleteOrder).Methods("DELETE")
	s.Router.HandleFunc("/orders/{id}", s.CompleteOrder).Methods("PATCH")
}
