package payment

import (
	"context"
	"fmt"
	"log"
	Model "order/app/order/domain/payment"
	DB "order/utils/database"

	"github.com/globalsign/mgo/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection = DB.Connect().Database("commerce").Collection("Payments")

func GetPaymentsByUser(uid string) []*Model.Payment {
	findOptions := options.Find()
	findOptions.SetLimit(100)

	// filter := bson.a{{"userid", "DHLgsagasgass3"}}
	fmt.Println(string(uid))
	var results []*Model.Payment
	var resultsFiltered []bson.M

	cur, err := collection.Find(context.TODO(), bson.M{"Paid": false}, findOptions)
	if err = cur.All(context.TODO(), &resultsFiltered); err != nil {
		log.Fatal(err)
	}
	fmt.Println(resultsFiltered)
	if err != nil {
		log.Println(err)
		return results
	}

	fmt.Println("1")
	defer cur.Close(context.TODO())
	for cur.Next(context.TODO()) {
		fmt.Println("2")

		var elem Model.Payment
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s\n", elem)
		results = append(results, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return results
}

func GetPayment(id string) Model.Payment {
	var result Model.Payment

	filter := bson.D{{"_id", id}}

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
