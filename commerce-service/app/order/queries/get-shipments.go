package queries

import (
	ShipmentRepository "order/app/order/database/repos/shipment"
	Model "order/app/order/domain/shipment"
)

func GetShipmentsQuery() []*Model.Shipment {
	result := ShipmentRepository.GetShipments()

	if len(result) == 0 {
		return []*Model.Shipment{}
	}

	return result
}
