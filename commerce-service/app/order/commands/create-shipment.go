package commands

import (
	ShipmentRepository "order/app/order/database/repos/shipment"
	Domain "order/app/order/domain"
	Model "order/app/order/domain/shipment"
	Queries "order/app/order/queries"
	
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateShipmentCommand(n string, c float32) (*mongo.InsertOneResult, *Domain.Error) {
	s, err := Model.NewShipment(n, c)

	if err != nil {
		return nil, err
	}

	existingShipment := Queries.GetShipmentByNameQuery(n)

	if existingShipment != nil {
		return nil, Model.ShipmentAlreadyExistsError
	}

	result := ShipmentRepository.SaveShipment(*s)

	return result, nil
}
