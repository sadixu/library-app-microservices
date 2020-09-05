package queries

import (
	PaymentRepository "order/app/order/database/repos/payment"
	Model "order/app/order/domain/payment"
)

func GetUserPaymentsQuery(userId string) []Model.Payment {
	result := PaymentRepository.GetPayments()

	if len(result) == 0 {
		return []Model.Payment{}
	}
	var filteredResult []Model.Payment

	for _, v := range result {
		if v.UserID == userId {
			filteredResult = append(filteredResult, v)
		}
	}

	if len(filteredResult) == 0 {
		return []Model.Payment{}
	}

	return filteredResult
}
