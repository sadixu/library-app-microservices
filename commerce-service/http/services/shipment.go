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
		json.NewEncoder(w).Encode("Error during decoding JSON")
	}

	result, error := Commands.CreateShipmentCommand(req.Name, req.Cost)

	if error != nil {
		fmt.Fprintf(w, "%+v", string(error.Message))
	}

	if result != nil {
		json.NewEncoder(w).Encode(result)
	}
}

// func GetShipments(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	result := Service.GetShipments()

// 	json.NewEncoder(w).Encode(result)
// }

// func GetShipmentByName(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	vars := mux.Vars(r)
// 	name := vars["Name"]

// 	result := Service.GetShipmentByName(name)
// 	if result == nil {
// 		w.WriteHeader(http.StatusNotFound)
// 		fmt.Fprint(w, "Shipment not found")
// 	}

// 	if result != nil {
// 		json.NewEncoder(w).Encode(result)
// 	}
// }

// func CreateShipment(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	reqBody, _ := ioutil.ReadAll(r.Body)

// 	result := Service.CreateShipment(reqBody)
// 	json.NewEncoder(w).Encode(result)
// }
