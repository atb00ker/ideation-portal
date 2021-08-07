package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type muxRouter struct{}

type Router interface {
	GET(uri string, f func(w http.ResponseWriter, r *http.Request))
	POST(uri string, f func(w http.ResponseWriter, r *http.Request))
	SERVE(port string)
	FILESERVE(uri string, fs http.Handler)
}

var (
	muxDispatcher = mux.NewRouter()
)

func NewMuxRouter() Router {
	return &muxRouter{}
}

func (*muxRouter) GET(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	muxDispatcher.HandleFunc(uri, f).Methods("GET")
}

func (*muxRouter) POST(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	muxDispatcher.HandleFunc(uri, f).Methods("POST")
}

func (*muxRouter) SERVE(port string) {
	fmt.Printf("Mux HTTP server running on port %v", port)
	err := http.ListenAndServe(port, muxDispatcher)
	log.Fatal(err)
}

func (*muxRouter) FILESERVE(uri string, fs http.Handler) {
	muxDispatcher.HandleFunc(uri, func(response http.ResponseWriter, request *http.Request) {
		vars := mux.Vars(request)
		filename := vars["filename"]
		response.Header().Set("Access-Control-Allow-Origin", "*")
		if strings.HasSuffix(filename, "csv") {
			response.Header().Set("Content-type", "application/vnd.ms-excel")
		}
		fs.ServeHTTP(response, request)
	})
}
