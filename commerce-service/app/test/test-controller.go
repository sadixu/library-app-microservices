package test

import (
	TestSvc "../../domain/services/tester"
	"github.com/gorilla/mux"
)

/*
	Knowledge base:
	* tutorial about routing: https://tutorialedge.net/golang/creating-restful-api-with-golang/
*/

func LoadApi(r *mux.Router) {
	r.HandleFunc("/casual-string-returner", TestSvc.TestFunction)
	r.HandleFunc("/casual-json-returner", TestSvc.TestFunction2)
	r.HandleFunc("/casual-parameter-returner/{id}", TestSvc.TestFunction3)
	r.HandleFunc("/casual-body-returner", TestSvc.TestFunction4).Methods("POST")
	r.HandleFunc("/casual-body-extractor", TestSvc.TestFunction5).Methods("PUT")
}
