package controllers

import (
	Services "order/http/services"

	"github.com/gorilla/mux"
)

func LoadOrdersApi(r *mux.Router) {
	r.HandleFunc("/order/{Id}", Services.GetOrderHandler)
	r.HandleFunc("/order", Services.CreateOrderHandler).Methods("POST")
	r.HandleFunc("/order/{Id}/payment", Services.PrepareOrderPaymentHandler).Methods("POST")
	r.HandleFunc("/order/{Id}/shipment/{ShipmentId}", Services.SetOrderShipmentHandler).Methods("PUT")
}
