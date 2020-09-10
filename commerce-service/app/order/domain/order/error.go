package payment

import (ErrorDomain "order/app/order/domain")

var EmptyProductError = ErrorDomain.GenerateError("Product ID must not be empty", 400)
var EmptyUserError = ErrorDomain.GenerateError("User ID must not be empty", 400)
var EmptyShipmentError = ErrorDomain.GenerateError("Shipment ID must not be empty", 400)
var EmptyPaymentError = ErrorDomain.GenerateError("Payment ID must not be empty", 400)
var InvalidValueError = ErrorDomain.GenerateError("Invalid order value", 400)
var OrderNotFoundError = ErrorDomain.GenerateError("Order not found", 404)
var OrderNotNewWhileShippingError = ErrorDomain.GenerateError("Order must have status new to be able to choose shipment for it", 400)
var OrderNotShippedError = ErrorDomain.GenerateError("Order must have shipping to connect payment", 400)
var OrderHasAlreadyPaymentError = ErrorDomain.GenerateError("Order already has a payment associated", 400)

