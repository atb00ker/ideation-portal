// +build unit_tests all_tests

package excel

import (
	"bytes"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
	"testing"
)

var testGetExcelDataRequest_ResponseCode_table = []struct {
	state string
}{
	{"http-error"},
	{"request-error"},
	{"response-error"},
	{"success"},
}

type mockHTTPClient struct {
	state string
}

func (mock *mockHTTPClient) Do(req *http.Request) (response *http.Response, err error) {
	if mock.state == "http-error" {
		return &http.Response{
			StatusCode: 400,
		}, errors.New("http-error")
	} else if mock.state == "request-error" {
		data := excelRawDataResponse{
			Data:   excelRawData{},
			Errors: []graphQLError{{Message: mock.state}},
		}
		dataJson, _ := json.Marshal(data)
		return &http.Response{
			StatusCode: 200,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte(dataJson))),
		}, nil
	} else if mock.state == "response-error" {
		dataJson, _ := json.Marshal("{\"incorrect-data\": 10}")
		return &http.Response{
			StatusCode: 200,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte(dataJson))),
		}, nil
	}

	data := excelRawDataResponse{
		Data: excelRawData{
			Total_site_visitors: graphQLTotalSiteVisitors{100},
			Topics_created_by_month: []graphQLTopicsByMonth{
				{
					Month:          "Jan",
					Topics_created: 10,
				},
				{
					Month:          "Feb",
					Topics_created: 11,
				},
			},
		},
		Errors: []graphQLError{},
	}

	dataJson, _ := json.Marshal(data)
	return &http.Response{
		StatusCode: 200,
		Body:       ioutil.NopCloser(bytes.NewReader([]byte(dataJson))),
	}, nil
}

func TestGetExcelDataRequest_ResponseCode(t *testing.T) {
	for _, row := range testGetExcelDataRequest_ResponseCode_table {
		client := &mockHTTPClient{state: row.state}
		result, err := getExcelDataRequest(client)

		if row.state == "success" {
			if len(result.Topics_created_by_month) != 2 ||
				result.Topics_created_by_month[0].Month != "Jan" || result.Topics_created_by_month[1].Topics_created != 11 {
				t.Errorf("Unexpected list value: %v", result.Topics_created_by_month)
			}
			if (result.Total_site_visitors != graphQLTotalSiteVisitors{100}) {
				t.Errorf("Expected: %d. Got: %v", 100, result.Total_site_visitors.Site_visitors)
			}
			return
		}

		error_message := err.Error()
		if row.state == "response-error" {
			if !strings.Contains(error_message, "json: cannot unmarshal") {
				t.Errorf("Expected unmarshall error for %v", error_message)
			}
			return
		}

		if error_message != row.state {
			t.Errorf("Error not thrown, instead got %s", error_message)
		}

	}
}
