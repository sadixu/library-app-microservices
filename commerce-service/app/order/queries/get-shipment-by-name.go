package queries

import (
	ShipmentRepository "order/app/order/database/repos/shipment"
	Model "order/app/order/domain/shipment"
)

func GetShipmentByNameQuery(n string) *Model.Shipment {
	result := ShipmentRepository.FindShipmentByName(n)

	if (result == Model.Shipment{}) {
		return nil
	}

	return &result
}