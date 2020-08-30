package controllers

import (
	Services "order/http/services"

	"github.com/gorilla/mux"
)

func LoadShipmentsApi(r *mux.Router) {
	r.HandleFunc("/shipments", Services.GetShipmentsHandler)
	r.HandleFunc("/shipment/{Name}", Services.GetShipmentByNameHandler)
	r.HandleFunc("/shipment", Services.CreateShipmentHandler).Methods("POST")
}
