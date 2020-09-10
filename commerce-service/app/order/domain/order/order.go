package payment

import (
	Domain "order/app/order/domain"
)

// Order schema for MongoDB, joined with domain model, as it is not complex and this is learning app
type Order struct {
	BsonID     string `json:"id" bson:"_id,omitempty"`
	ProductID  string 
	UserID     string
	ShipmentID string
	Status     string
	Shipped    bool
	Value      float32
	PaymentID  string `json:"PaymentID" bson:"PaymentID"`
}

func NewOrder(uId, prodId string, v float32) (*Order, *Domain.Error) {
	if uId == "" {
		return nil, EmptyUserError
	}

	if prodId == "" {
		return nil, EmptyProductError
	}

	if v <= 0 {
		return nil, InvalidValueError
	}

	return &Order{UserID: uId, ProductID: prodId, Status: "new", Shipped: false, Value: v}, nil
}
