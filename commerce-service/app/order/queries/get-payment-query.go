package queries

import (
	PaymentRepository "order/app/order/database/repos/payment"
	Model "order/app/order/domain/payment"
)

func GetPaymentQuery(id string) *Model.Payment {
	result := PaymentRepository.GetPayment(id)

	if (result == Model.Payment{}) {
		return nil
	}

	return &result
}
