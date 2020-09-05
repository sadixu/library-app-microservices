package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	Commands "order/app/order/commands"
	Queries "order/app/order/queries"

	"github.com/gorilla/mux"
)

func GetUserPaymentsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	uid := vars["UserId"]

	result := Queries.GetUserPaymentsQuery(uid)

	json.NewEncoder(w).Encode(result)
}

func GetPaymentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["Id"]

	result := Queries.GetPaymentQuery(id)

	json.NewEncoder(w).Encode(result)
}

type CreatePaymentRequest struct {
	UserID string  `json:"UserID"`
	Value  float32 `json:"Value"`
}

func InitPaymentHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	var req CreatePaymentRequest

	err := d.Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error during decoding JSON")
	}

	result, error := Commands.InitializePaymentCommand(req.Value, req.UserID)

	if error != nil {
		w.WriteHeader(error.Code)
		fmt.Fprintf(w, "%+v", string(error.Message))
	}

	if result != nil {
		json.NewEncoder(w).Encode(result)
	}
}

type AcknowledgePaymentRequest struct {
	StripePaymentID string `json:"StripePaymentID"`
}

func PayOrderHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Test")
	d := json.NewDecoder(r.Body)
	d.DisallowUnknownFields()

	var req AcknowledgePaymentRequest

	err := d.Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Error during decoding JSON")
	}

}
