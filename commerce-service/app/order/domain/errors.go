package domain

type Error struct {
	Message string
	Code int
}

func GenerateError(msg string, c int) *Error {
	return &Error{msg, c}
}
