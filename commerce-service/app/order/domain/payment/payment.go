package payment

import (
	Domain "order/app/order/domain"
)

// Payment schema for MongoDB, joined with domain model, as it is not complex and this is learning app
type Payment struct {
	BsonID          string `json:"id" bson:"_id,omitempty"`
	Value           float32
	UserID          string
	Paid            bool
	StripePaymentID string
}

func NewPayment(v float32, uid string) (*Payment, *Domain.Error) {
	if uid == "" {
		return nil, EmptyUserError
	}

	if v < 0 {
		return nil, InvalidValueError
	}

	return &Payment{Value: v, UserID: uid, Paid: false, StripePaymentID: ""}, nil
}
