package stripe

import (ErrorDomain "order/app/order/domain")


var NoCustomerError = ErrorDomain.GenerateError("Customer not found", 404)
var UnableToCreateCustomer = ErrorDomain.GenerateError("Unable to create new customer", 400)
var UnableToPayError = ErrorDomain.GenerateError("Unable pay for the order", 400)
