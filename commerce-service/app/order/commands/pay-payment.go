package commands

import (
	"fmt"
	OrderRepository "order/app/order/database/repos/order"
	PaymentRepository "order/app/order/database/repos/payment"
	Domain "order/app/order/domain"
	OModel "order/app/order/domain/order"
	Model "order/app/order/domain/payment"
	Stripe "order/app/order/external/stripe"
)

func PayPaymentCommand(email, pId string) (Model.Payment, *Domain.Error) {
	payment := PaymentRepository.GetPayment(pId)

	if payment.Paid == true {
		return Model.Payment{}, Model.AlreadyPaidError
	}
	order := OrderRepository.GetOrderByPayment(pId)
	fmt.Println(order)

	if (order == OModel.Order{}) {
		return Model.Payment{}, OModel.OrderNotFoundError
	}

	customer := Stripe.GetOrCreateCustomer(email)

	if customer == nil {
		return Model.Payment{}, Stripe.NoCustomerError
	}

	paymentStatus := Stripe.PayAndConfirm(payment.Value, payment.BsonID, customer.ID)

	if paymentStatus == nil {
		return Model.Payment{}, Stripe.UnableToPayError
	}

	_, err := PaymentRepository.UpdatePaymentStatus(payment.BsonID, paymentStatus.ID)
	OrderRepository.SetPaymentStatus(order.BsonID)

	if err != nil {
		return Model.Payment{}, Model.UnableToPayError
	}

	paymentUpdated := PaymentRepository.GetPayment(pId)

	return paymentUpdated, nil
}
