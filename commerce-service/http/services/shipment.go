package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	Commands "order/app/order/commands"
	Queries "order/app/order/queries"

	"github.com/gorilla/mux"
)

func GetShipmentsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	result := Queries.GetShipmentsQuery()

	json.NewEncoder(w).Encode(result)
}

func GetShipmentByNameHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	name := vars["Name"]

	result := Queries.GetShipmentByNameQuery(name)

	json.NewEncoder(w).Encode(result)
}

type CreateShipmentRequest struct {
	Name string  `json:"Name`
	Cost float32 `json:"Cost"`
}

func CreateShipmentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	var req CreateShipmentRequest

	err := d.Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error during decoding JSON")
	}

	result, error := Commands.CreateShipmentCommand(req.Name, req.Cost)

	if error != nil {
		w.WriteHeader(error.Code)
		fmt.Fprintf(w, "%+v", string(error.Message))
	}

	if result != nil {
		json.NewEncoder(w).Encode(result)
	}
}
