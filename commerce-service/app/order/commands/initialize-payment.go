package commands

import (
	PaymentRepository "order/app/order/database/repos/payment"
	Domain "order/app/order/domain"
	Model "order/app/order/domain/payment"

	"go.mongodb.org/mongo-driver/mongo"
)

func InitializePaymentCommand(v float32, uid string) (*mongo.InsertOneResult, *Domain.Error) {
	s, err := Model.NewPayment(v, uid)

	if err != nil {
		return nil, err
	}

	result := PaymentRepository.SavePayment(*s)

	return result, nil
}
