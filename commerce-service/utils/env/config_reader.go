package env

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
)

type Configuration struct {
	Port             int
	MongoPort        int
	MongoExpressPort int
	MongoUser        string
	MongoPassword    string
}

type MongoConfiguration struct {
	MongoPort     int
	MongoUser     string
	MongoPassword string
}

var config = LoadEnvs()

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
	port := strconv.Itoa(config.Port)

	return port
}

func GetMongoConfig() MongoConfiguration {
	mongoconfig := MongoConfiguration{MongoPort: config.MongoPort, MongoUser: config.MongoUser, MongoPassword: config.MongoPassword}

	return mongoconfig
}
