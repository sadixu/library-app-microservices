package shipment

import (
	Domain "order/app/order/domain"

	"github.com/globalsign/mgo/bson"
)

// Shipment schema for MongoDB, joined with domain model, as it is not complex and this is learning app
type Shipment struct {
	BsonID bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name   string
	Cost   float32
}

func NewShipment(n string, c float32) (*Shipment, *Domain.Error) {
	if n == "" {
		return nil, EmptyNameError
	}

	if c < 0 {
		return nil, EmptyPriceError
	}

	return &Shipment{Name: n, Cost: c}, nil
}
