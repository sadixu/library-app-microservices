package commands

import (
	OrderRepository "order/app/order/database/repos/order"
	PaymentRepository "order/app/order/database/repos/payment"
	ShipmentRepository "order/app/order/database/repos/shipment"
	Domain "order/app/order/domain"
	OModel "order/app/order/domain/order"
	PModel "order/app/order/domain/payment"
	SModel "order/app/order/domain/shipment"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func getIdFromPrimivite(result *mongo.InsertOneResult) string {
	if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
		tempmap := map[string]string{
			"id": oid.Hex(),
		}

		return tempmap["id"]
	}

	return ""
}

func PrepareOrderPaymentCommand(orderId string) (*mongo.InsertOneResult, *Domain.Error) {
	o := OrderRepository.GetOrder(orderId)

	if (o == OModel.Order{}) {
		return nil, OModel.OrderNotFoundError
	}

	if o.ShipmentID == "" {
		return nil, OModel.EmptyShipmentError
	}

	s := ShipmentRepository.GetShipment(o.ShipmentID)

	if (s == SModel.Shipment{}) {
		return nil, SModel.ShipmentNotFoundError
	}

	if (o.PaymentID != "") {
		return nil, OModel.OrderHasAlreadyPaymentError
	}
	
	totalBal := o.Value + s.Cost

	payment, err := PModel.NewPayment(totalBal, o.UserID)

	if err != nil {
		return nil, err
	}

	result := PaymentRepository.SavePayment(*payment)

	id := getIdFromPrimivite(result)

	if id == "" {
		return nil, PModel.UnableToPayError
	}

	OrderRepository.SetPayment(orderId, id)

	return result, nil
}
