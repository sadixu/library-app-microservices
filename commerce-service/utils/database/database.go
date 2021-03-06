package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() *mongo.Client {
	log.Println("Connecting to MongoDB...")

	//localhost:27103
	clientOptions := options.Client().ApplyURI("mongodb://root:password@library-mongo-commerce:27019/ecommerce?authSource=admin&w=1")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB.")

	return client
}
