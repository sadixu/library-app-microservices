package shipment

import "github.com/globalsign/mgo/bson"

// Shipment schema for MongoDB
type Shipment struct {
	BsonID bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name   string
	Cost   float32
}
