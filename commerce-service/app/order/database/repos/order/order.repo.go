package order

import (
	"context"
	"log"
	Model "order/app/order/domain/order"
	DB "order/utils/database"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection = DB.Connect().Database("commerce").Collection("Orders")

func SaveOrder(s Model.Order) *mongo.InsertOneResult {
	insertResult, err := collection.InsertOne(context.TODO(), s)

	if err != nil {
		log.Fatal(err)
	}

	return insertResult
}

func GetOrder(id string) Model.Order {
	var result Model.Order

	objectIDS, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectIDS}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println(err)
	}

	return result
}

func GetOrderByPayment(id string) Model.Order {
	var result Model.Order

	filter := bson.D{{"PaymentID", id}}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Println(err)
	}

	return result
}

func SetOrderShipment(orderId, shipmentId string) (*mongo.UpdateResult, error) {
	objID, _ := primitive.ObjectIDFromHex(orderId)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	update := bson.M{"$set": bson.M{"ShipmentID": shipmentId, "Status": "awaiting payment connection"}}

	result, err := collection.UpdateOne(
		context.TODO(),
		filter,
		update,
	)

	return result, err
}

func SetPaymentStatus(orderId string) (*mongo.UpdateResult, error) {
	objID, _ := primitive.ObjectIDFromHex(orderId)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	update := bson.M{"$set": bson.M{"Status": "paid"}}

	result, err := collection.UpdateOne(
		context.TODO(),
		filter,
		update,
	)

	return result, err
}

func SetPayment(orderId, paymentId string) (*mongo.UpdateResult, error) {
	objID, _ := primitive.ObjectIDFromHex(orderId)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	update := bson.M{"$set": bson.M{"PaymentID": paymentId, "Status": "awaiting payment"}}

	result, err := collection.UpdateOne(
		context.TODO(),
		filter,
		update,
	)

	return result, err
}

func SetPaymentComplete(orderId, paymentId string) (*mongo.UpdateResult, error) {
	objID, _ := primitive.ObjectIDFromHex(orderId)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	update := bson.M{"$set": bson.M{"PaymentID": paymentId, "Status": "paid"}}

	result, err := collection.UpdateOne(
		context.TODO(),
		filter,
		update,
	)

	return result, err
}
