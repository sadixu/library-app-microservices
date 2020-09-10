package shipment

import (ErrorDomain "order/app/order/domain")

var EmptyNameError = ErrorDomain.GenerateError("Shipment name cannot be empty", 400)
var EmptyPriceError = ErrorDomain.GenerateError("Shipment price must be bigger than 0", 400)
var ShipmentAlreadyExistsError = ErrorDomain.GenerateError("Shipment with that name already exists", 400)
var ShipmentNotFoundError = ErrorDomain.GenerateError("Shipment not found", 404)
