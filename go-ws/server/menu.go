package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/google/uuid"
)

type Menu struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (s *Server) GetMenus(w http.ResponseWriter, r *http.Request) {
	rows, err := s.DB.Query("SELECT * FROM `Menu`")
	if err != nil {
		log.Fatal(err)
	}
	var menus []Menu
	for rows.Next() {
		var menu Menu
		if err := rows.Scan(&menu.ID, &menu.Name); err != nil {
			log.Fatal(err)
		}
		menus = append(menus, menu)
	}
	jsonResponse, jsonError := json.Marshal(menus)

	if jsonError != nil {
		fmt.Println("Unable to encode JSON")
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func (s *Server) AddMenu(w http.ResponseWriter, r *http.Request) {
	var menu Menu
	err := json.NewDecoder(r.Body).Decode(&menu)
	if err != nil {
		log.Fatal(err)
	}
	query := "INSERT INTO `Menu` (`id`, `name`) VALUES (?,?)"
	genId := uuid.New()

	_, err = s.DB.ExecContext(context.Background(), query, genId.String(), menu.Name)
	if err != nil {
		log.Fatalf("impossible insert teacher: %s", err)
	}

	if err != nil {
		log.Fatal(err)
	}
}

func (s *Server) DeleteMenu(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/menus/")
	query := "DELETE FROM `Menu` WHERE id = ?"
	_, err := s.DB.ExecContext(context.Background(), query, id)
	if err != nil {
		log.Fatalf("impossible delete menu: %s", err)
	}

	if err != nil {
		log.Fatal(err)
	}
}
