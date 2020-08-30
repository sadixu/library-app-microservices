package commands

import (
	ShipmentRepository "order/app/order/database/repos/shipment"
	Domain "order/app/order/domain"
	Model "order/app/order/domain/shipment"

	"go.mongodb.org/mongo-driver/mongo"
)

func CreateShipmentCommand(n string, c float32) (*mongo.InsertOneResult, *Domain.Error) {
	s, err := Model.NewShipment(n, c)

	if err != nil {
		return nil, err
	}

	result := ShipmentRepository.SaveShipment(*s)

	return result, nil
}
