package tester

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

func TestFunction(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello there")
	fmt.Fprintf(w, "Welcome home!")
}

func TestFunction2(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	articles := []Article{
		Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
		Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
	}

	json.NewEncoder(w).Encode(articles)
}

func TestFunction3(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]

	fmt.Fprintf(w, "Key: "+key)
}

func TestFunction4(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Fprintf(w, "%+v", string(reqBody))
}

func TestFunction5(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var article Article

	json.Unmarshal(reqBody, &article)

	fmt.Println(article)
	fmt.Println(article.Content)
	fmt.Fprintf(w, "Thanks for the body")
}
