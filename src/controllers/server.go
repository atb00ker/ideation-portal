package main

import (
	"ideation/src/controllers/excel"
	"net/http"
)

var httpRouter Router = NewMuxRouter()

func main() {
	// Excel Routes
	excelCaller := excel.ExcelCaller{Hasura: &excel.HasuraClient{}}
	httpRouter.POST(excel.GetExcelPathUrl, excelCaller.GetExcelPathAction)
	// Static Files
	httpRouter.FILESERVE("/{filename}", http.FileServer(http.Dir("./dist/")))
	// Start Server
	httpRouter.SERVE(":3000")
}
