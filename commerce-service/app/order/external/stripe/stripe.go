package stripe

import (
	Config "order/utils/env"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/customer"
	"github.com/stripe/stripe-go/paymentintent"
)

/*
{
  "id": "cus_Hz8Hgxk3VUpYH6",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1599583818,
  "currency": "pln",
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": null,
  "invoice_prefix": "890DFD7",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null
  },
  "livemode": false,
  "metadata": {},
  "name": null,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none"
}
*/

type Customer struct {
	Id             string
	Object         string
	Address        string
	Balance        float32
	Created        float32
	Currency       string
	Default_source string
	delinquent     bool
	Description    string
}

var config = Config.GetStripeConfig()

func createCustomer(email string) *stripe.Customer {
	stripe.Key = config.StripeSecret

	params := &stripe.CustomerParams{
		Email: stripe.String(email),
	}

	c, _ := customer.New(params)

	return c
}

func searchCustomer(email string) *stripe.Customer {
	stripe.Key = config.StripeSecret

	params := &stripe.CustomerListParams{
		Email: stripe.String(email),
	}
	params.Filters.AddFilter("limit", "", "1")
	i := customer.List(params)

	for i.Next() {
		c := i.Customer()
		return c
	}

	return nil
}

func GetOrCreateCustomer(email string) *stripe.Customer {
	c := searchCustomer(email)

	if c == nil {
		cstmr := createCustomer(email)

		return cstmr
	}

	return c
}

func charge(v float32, paymentId, cId string) *stripe.PaymentIntent {
	stripe.Key = config.StripeSecret

	params := &stripe.PaymentIntentParams{
		Customer:    stripe.String(cId),
		Description: stripe.String(paymentId),
		Amount:      stripe.Int64(2000),
		Currency:    stripe.String(string(stripe.CurrencyPLN)),
		PaymentMethodTypes: []*string{
			stripe.String("card"),
		},
	}
	pi, _ := paymentintent.New(params)

	return pi
}

func confirm(pId string) *stripe.PaymentIntent {
	stripe.Key = config.StripeSecret

	params := &stripe.PaymentIntentConfirmParams{
		PaymentMethod: stripe.String("card_1HPB8uJ1o5Se36U3c5p2wNkq"),
	}

	pi, _ := paymentintent.Confirm(
		pId,
		params,
	)

	return pi
}

func PayAndConfirm(v float32, paymentId string, cId string) *stripe.PaymentIntent {
	stripe.Key = config.StripeSecret

	payment := charge(v, paymentId, cId)
	pi := confirm(payment.ID)

	return pi
}
