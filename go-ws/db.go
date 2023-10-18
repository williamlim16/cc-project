package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gorilla/mux"
)

const (
	host     = "database-ecm.c4lovv8lv5kg.ap-southeast-1.rds.amazonaws.com"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

func (s *Server) InitDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=require",
		host, port, user, password, dbname)
	var err error
	s.DB, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	s.DB.Ping()
	s.Router = mux.NewRouter()
}
