package domain

type Error struct {
	Message string
}

func GenerateError(msg string) *Error {
	return &Error{msg}
}
