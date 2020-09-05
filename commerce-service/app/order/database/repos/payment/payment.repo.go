package payment

import (
	"context"
	"fmt"
	"log"
	Model "order/app/order/domain/payment"
	DB "order/utils/database"

	"github.com/globalsign/mgo/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection = DB.Connect().Database("commerce").Collection("Payments")

func GetPayments() []Model.Payment {
	var results []Model.Payment

	cur, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		fmt.Println(err)
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem Model.Payment
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())

	return results
}

func GetPayment(id string) Model.Payment {
	var result Model.Payment

	objectIDS, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectIDS}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println(err)
	}

	return result
}

func SavePayment(s Model.Payment) *mongo.InsertOneResult {
	insertResult, err := collection.InsertOne(context.TODO(), s)

	if err != nil {
		log.Fatal(err)
	}

	return insertResult
}
