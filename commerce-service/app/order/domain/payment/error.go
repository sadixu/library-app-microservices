package payment

import (ErrorDomain "order/app/order/domain")

var InvalidValueError = ErrorDomain.GenerateError("Value must be bigger than 0", 400)
var EmptyUserError = ErrorDomain.GenerateError("User ID must not be empty", 400)
