package controllers

import (
	"log"
	"net/http"

	TestSvc "../../domain/services/tester"
	"github.com/gorilla/mux"
)

/*
	Knowledge base:
	* tutorial about routing: https://tutorialedge.net/golang/creating-restful-api-with-golang/
*/

func LoadApi() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/casual-string-returner", TestSvc.TestFunction)
	router.HandleFunc("/casual-json-returner", TestSvc.TestFunction2)
	router.HandleFunc("/casual-parameter-returner/{id}", TestSvc.TestFunction3)
	router.HandleFunc("/casual-body-returner", TestSvc.TestFunction4).Methods("POST")
	router.HandleFunc("/casual-body-extractor", TestSvc.TestFunction5).Methods("PUT")

	log.Fatal(http.ListenAndServe(":8086", router))
}
