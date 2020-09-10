package commands

import (
	OrderRepository "order/app/order/database/repos/order"
	ShipmentRepository "order/app/order/database/repos/shipment"
	Domain "order/app/order/domain"

	Model "order/app/order/domain/order"
	SModel "order/app/order/domain/shipment"
)

func SetOrderShipmentCommand(orderId, shipmentId string) (Model.Order, *Domain.Error) {
	o := OrderRepository.GetOrder(orderId)

	if (o == Model.Order{}) {
		return Model.Order{}, Model.OrderNotFoundError
	}

	if o.Status != "new" {
		return Model.Order{}, Model.OrderNotNewWhileShippingError
	}

	s := ShipmentRepository.GetShipment(shipmentId)

	if (s == SModel.Shipment{}) {
		return Model.Order{}, SModel.ShipmentNotFoundError
	}

	OrderRepository.SetOrderShipment(orderId, shipmentId)

	result := OrderRepository.GetOrder(orderId)

	return result, nil
}
