// +build integration_tests unit_tests all_tests

package excel

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
)

// Set of type / funcs used by multiple tests in ghpr
var correctAuthToken = os.Getenv("HASURA_GRAPHQL_ADMIN_SECRET")

type mockHasuraClient struct {
	state                   string
	total_site_visitors     graphQLTotalSiteVisitors
	topics_created_by_month []graphQLTopicsByMonth
}

func (mock *mockHasuraClient) getExcelRawData() (response excelRawData, err error) {

	switch mock.state {
	case "error":
		err = errors.New(mock.state)
		return response, err
	}
	response = excelRawData{
		Total_site_visitors:     mock.total_site_visitors,
		Topics_created_by_month: mock.topics_created_by_month,
	}
	return response, err
}

func genericRequestSender(path string, body io.Reader, handler *http.HandlerFunc) *httptest.ResponseRecorder {

	req, _ := http.NewRequest("POST", path, body)
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, req)
	return response
}

func hash_file_md5(filePath string) (string, error) {
	var returnMD5String string
	file, err := os.Open(filePath)
	if err != nil {
		return returnMD5String, err
	}
	defer file.Close()
	hash := md5.New()
	if _, err := io.Copy(hash, file); err != nil {
		return returnMD5String, err
	}
	hashInBytes := hash.Sum(nil)[:16]
	returnMD5String = hex.EncodeToString(hashInBytes)
	return returnMD5String, nil
}
