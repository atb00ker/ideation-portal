// +build unit_tests all_tests

package excel

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"
)

var testGetExcelPathAction_Response_Table = []struct {
	state string
	code  int
}{
	{"error", 400},
	{"success", 200},
}

func TestGetExcelPathAction_Response(t *testing.T) {
	for _, row := range testGetExcelPathAction_Response_Table {
		testCaller := ExcelCaller{Hasura: &mockHasuraClient{
			state: row.state,
		}}
		handler := http.HandlerFunc(testCaller.GetExcelPathAction)
		response := genericRequestSender(GetExcelPathUrl, bytes.NewBuffer([]byte("")), &handler)

		if response.Code == 400 {
			respBytes, err := ioutil.ReadAll(response.Body)
			if err != nil {
				t.Errorf("Requested errored unexpectedly")
			}

			var testResponse graphQLError
			if err = json.Unmarshal(respBytes, &testResponse); err != nil {
				t.Errorf("Error unmarshalling response")
			}

			if testResponse.Message != row.state {
				t.Errorf("Unexpected Message received")
			}
		}

		// Assert HTTP status
		if response.Code != row.code {
			t.Errorf("Expected %d, got %d", row.code, response.Code)
		}
	}
}
