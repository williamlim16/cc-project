package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Order struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Done      bool      `json:"done"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type OrderRequest struct {
	Name   string `json:"name"`
	MenuID string `json:"menuId"`
}

func (s *Server) GetOrders(w http.ResponseWriter, r *http.Request) {
	rows, err := s.DB.Query("SELECT * FROM `Order`")
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

	jsonResponse, jsonError := json.Marshal(orders)

	if jsonError != nil {
		fmt.Println("Unable to encode JSON")
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func (s *Server) AddOrders(w http.ResponseWriter, r *http.Request) {

	var order OrderRequest
	err := json.NewDecoder(r.Body).Decode(&order)
	if err != nil {
		log.Fatal(err)
	}
	query := "INSERT INTO `Order` (`id`, `name`, `updatedAt`) VALUES (?,?,?)"
	genId := uuid.New()
	_, err = s.DB.ExecContext(context.Background(), query, genId.String(), order.Name, time.Now())

	if err != nil {
		log.Fatal(err)
	}

	query_relation := "INSERT INTO `_MenuToOrder` (`A`, `B`) VALUES (?,?)"
	_, err = s.DB.ExecContext(context.Background(), query_relation, order.MenuID, genId.String())
	if err != nil {
		log.Fatalf("impossible insert order: %s", err)
	}

	if err != nil {
		log.Fatal(err)
	}
}

func (s *Server) DeleteOrder(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/orders/")
	query := "DELETE FROM `Order` WHERE id = ?"
	_, err := s.DB.ExecContext(context.Background(), query, id)
	if err != nil {
		log.Fatalf("impossible delete order: %s", err)
	}
}

func (s *Server) CompleteOrder(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/orders/")
	query := "UPDATE `Order` SET done = TRUE, updatedAt=? WHERE id = ?"
	_, err := s.DB.ExecContext(context.Background(), query, time.Now(), id)
	if err != nil {
		log.Fatalf("impossible delete order: %s", err)
	}
}
