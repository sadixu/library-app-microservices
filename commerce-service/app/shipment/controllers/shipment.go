package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	Service "../services"
	"github.com/gorilla/mux"
)

type Article struct {
	Title   string
	Desc    string
	Content string
}

func GetShipments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	result := Service.GetShipments()

	json.NewEncoder(w).Encode(result)
}

func GetShipmentByName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	name := vars["Name"]

	result := Service.GetShipmentByName(name)
	if result == nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, "Shipment not found")
	}

	if result != nil {
		json.NewEncoder(w).Encode(result)
	}
}

func CreateShipment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, _ := ioutil.ReadAll(r.Body)

	result := Service.CreateShipment(reqBody)
	json.NewEncoder(w).Encode(result)
}
