package queries

import (
	PaymentRepository "order/app/order/database/repos/payment"
	Model "order/app/order/domain/payment"
)

func GetUserPaymentsQuery(userId string) []*Model.Payment {
	result := PaymentRepository.GetPaymentsByUser(userId)

	if len(result) == 0 {
		return []*Model.Payment{}
	}

	return result
}
