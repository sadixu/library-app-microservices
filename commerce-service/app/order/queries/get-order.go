package queries

import (
	PaymentRepository "order/app/order/database/repos/order"
	Model "order/app/order/domain/order"
)

func GetOrderQuery(id string) *Model.Order {
	result := PaymentRepository.GetOrder(id)

	if (result == Model.Order{}) {
		return nil
	}

	return &result
}
