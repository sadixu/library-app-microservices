package payment

import (ErrorDomain "order/app/order/domain")

var InvalidValueError = ErrorDomain.GenerateError("Value must be bigger than 0", 400)
var EmptyUserError = ErrorDomain.GenerateError("User ID must not be empty", 400)
var UnableToPayError = ErrorDomain.GenerateError("Unable pay for the order", 400)
var AlreadyPaidError = ErrorDomain.GenerateError("Payment is already paid", 400)
var PaymentNotFoundError = ErrorDomain.GenerateError("Payment is already paid", 404)
