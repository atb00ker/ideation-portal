package excel

import (
	"encoding/json"
	"net/http"
)

const (
	GetExcelPathUrl = "/excel"
)

func (caller *ExcelCaller) GetExcelPathAction(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	result, err := getExcelLink(caller)
	if err != nil {
		errorObject := graphQLError{
			Message: err.Error(),
		}
		errorBody, _ := json.Marshal(errorObject)
		response.WriteHeader(http.StatusBadRequest)
		response.Write(errorBody)
		return
	}

	data, _ := json.Marshal(result)
	response.Write(data)
}
