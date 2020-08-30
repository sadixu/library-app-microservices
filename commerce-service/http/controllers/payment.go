package controllers

import (
	Services "order/http/services"

	"github.com/gorilla/mux"
)

func LoadPaymentsApi(r *mux.Router) {
	r.HandleFunc("/payment/user/{UserId}", Services.GetUserPaymentsHandler)
	r.HandleFunc("/payment/{Id}", Services.GetPaymentHandler)
	r.HandleFunc("/payment", Services.InitPaymentHandler).Methods("POST")
	r.HandleFunc("/payment/{Id}", Services.PayOrderHandler).Methods("PUT")
}
