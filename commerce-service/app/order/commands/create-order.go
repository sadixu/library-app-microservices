package commands

import (
	OrderRepository "order/app/order/database/repos/order"
	Domain "order/app/order/domain"
	Model "order/app/order/domain/order"
	
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateOrderCommand(userId, prodId string, v float32) (*mongo.InsertOneResult, *Domain.Error) {
	o, err := Model.NewOrder(userId, prodId, v)

	if err != nil {
		return nil, err
	}

	result := OrderRepository.SaveOrder(*o)

	return result, nil
}
