package controllers

import (
	Controller "../controllers"
	"github.com/gorilla/mux"
)

func LoadApi(r *mux.Router) {
	r.HandleFunc("/shipments", Controller.GetShipments)
	r.HandleFunc("/shipment/{Name}", Controller.GetShipmentByName)
	r.HandleFunc("/shipment", Controller.CreateShipment).Methods("POST")

}
