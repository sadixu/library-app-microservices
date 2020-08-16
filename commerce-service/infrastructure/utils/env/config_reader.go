package env

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

type Configuration struct {
	Port int
}

func LoadEnvs() Configuration {
	configuration := Configuration{}
	file, err := os.Open("go_config.json")

	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&configuration)
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	return configuration
}

func GetPort() string {
	config := LoadEnvs()

	port := strconv.Itoa(config.Port)

	return port
}
