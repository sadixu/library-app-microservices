package main

import (
	TestController "./app/test"
	"github.com/gorilla/mux"
)

func loadRoutes() {
	router := mux.NewRouter().StrictSlash(true)

	TestController.LoadApi(router)
}

func main() {
	loadRoutes()
}

/*
TODO:
* structure:

* mongodb:
	* shipment schema
	* payment schema
	* manager schema
	* client schema
	* order schema

* routing
	* POST order
	* GET shipment
	* POST payment propably :) will require Stripe
	* PUT order/:id/shipment adds also tracking number and shipment "Waiting to ship"
	* PUT order/:id finish shipment
	* PUT order/:id/payment confirms payment
	* PUT order/:id/shipment/tracking adds tracking number, ships package

* features
	* Stripe: https://github.com/stripe/stripe-go

DONE:
* structure:
	* routing import complexity - mostly checked whether imports work as I wanted to
	* reading environment variables - from JSON file, but at least it works :)

* routing:
	* example endpoints to extract body, params, send response - maybe a rubbish code, but works too
*/
