package services

import (
	"encoding/json"
	"log"

	Model "../../../domain/shipment"
	Repository "../../../domain/shipment/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetShipments() []*Model.Shipment {
	result := Repository.GetShipments()

	if len(result) == 0 {
		return []*Model.Shipment{}
	}

	return Repository.GetShipments()
}

func GetShipmentByName(n string) *Model.Shipment {
	result := Repository.FindShipmentByName(n)

	if (result == Model.Shipment{}) {
		return nil
	}

	return &result
}

func CreateShipment(b []byte) *mongo.InsertOneResult {
	var s Model.Shipment
	err := json.Unmarshal(b, &s)
	if err != nil {
		panic(err)
	}
	log.Println(s.Name)
	log.Println(s.Cost)

	result := Repository.SaveShipment(s)

	return result
}
