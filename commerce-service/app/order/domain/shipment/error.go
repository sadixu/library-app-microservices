package shipment

import (ErrorDomain "order/app/order/domain")

var EmptyNameError = ErrorDomain.GenerateError("Shipment name cannot be empty")
var EmptyPriceError = ErrorDomain.GenerateError("Shipment price must be bigger than 0")
