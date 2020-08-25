package repository

import (
	"context"
	"log"

	DB "../../../utils/database"
	Model "../../shipment"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection = DB.Connect().Database("commerce").Collection("Shipments")

type shipmentRepository interface {
	SaveShipment() Model.Shipment
	FindShipmentByName() Model.Shipment
	GetShipments() []Model.Shipment
}

func FindShipmentByName(n string) Model.Shipment {
	var result Model.Shipment

	filter := bson.D{{"name", n}}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println(err)
	}

	return result
}

func SaveShipment(s Model.Shipment) *mongo.InsertOneResult {
	insertResult, err := collection.InsertOne(context.TODO(), s)

	if err != nil {
		log.Fatal(err)
	}

	return insertResult
}

func GetShipments() []*Model.Shipment {
	findOptions := options.Find()
	findOptions.SetLimit(100)

	var results []*Model.Shipment

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Println(err)
		return results
	}

	for cur.Next(context.TODO()) {
		var elem Model.Shipment
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())

	return results
}
