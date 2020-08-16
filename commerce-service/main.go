package main

import (
	Controller "./app/controllers"
)

func main() {
	Controller.LoadApi()
}

/*
TODO:
* structure:
	* routing import complexity

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
*/
