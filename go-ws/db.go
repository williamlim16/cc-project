package main

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func (s *Server) InitDB() {
	var err error
	err = godotenv.Load(filepath.Join("./", ".env"))
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
