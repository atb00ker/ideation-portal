package main

import (
	"net/http"
)

var httpRouter Router = NewMuxRouter()

func main() {
	// Static Files
	muxDispatcher.PathPrefix("/").Handler(http.FileServer(http.Dir("./dist/")))
	// Start Server
	httpRouter.SERVE(":3000")
}
