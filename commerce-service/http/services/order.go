package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	Commands "order/app/order/commands"
	Queries "order/app/order/queries"
	Model "order/app/order/domain/order"

	"github.com/gorilla/mux"
)

func GetOrderHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["Id"]

	result := Queries.GetOrderQuery(id)

	json.NewEncoder(w).Encode(result)
}

type CreateOrderRequest struct {
	UserID    string  `json:"UserID"`
	ProductID string  `json:"ProductID"`
	Value     float32 `json:"Value"`
}

func CreateOrderHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	var req CreateOrderRequest

	err := d.Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error during decoding JSON")
	}

	result, error := Commands.CreateOrderCommand(req.UserID, req.ProductID, req.Value)

	if error != nil {
		w.WriteHeader(error.Code)
		fmt.Fprintf(w, "%+v", string(error.Message))
	}

	if result != nil {
		json.NewEncoder(w).Encode(result)
	}
}

func SetOrderShipmentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["Id"]
	shipmentId := vars["ShipmentId"]


	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	result, error := Commands.SetOrderShipmentCommand(id, shipmentId)

	if error != nil {
		w.WriteHeader(error.Code)
		fmt.Fprintf(w, "%+v", string(error.Message))
	}

	if (result != Model.Order{}) {
		json.NewEncoder(w).Encode(result)
	}
}
