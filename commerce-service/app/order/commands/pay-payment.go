package commands

import (
	PaymentRepository "order/app/order/database/repos/payment"
	Domain "order/app/order/domain"
	Model "order/app/order/domain/payment"
	Stripe "order/app/order/external/stripe"
)

func PayPaymentCommand(v float32, email, pId string) (Model.Payment, *Domain.Error) {
	if v < 0 {
		return Model.Payment{}, Model.InvalidValueError
	}

	payment := PaymentRepository.GetPayment(pId)

	customer := Stripe.GetOrCreateCustomer(email)

	if customer == nil {
		return Model.Payment{}, Stripe.NoCustomerError
	}

	paymentStatus := Stripe.PayAndConfirm(v, payment.BsonID, customer.ID)

	if paymentStatus == nil {
		return Model.Payment{}, Stripe.UnableToPayError
	}

	_, err := PaymentRepository.UpdatePaymentStatus(payment.BsonID, paymentStatus.ID)

	if err != nil {
		return Model.Payment{}, Model.UnableToPayError
	}

	paymentUpdated := PaymentRepository.GetPayment(pId)

	return paymentUpdated, nil
}
