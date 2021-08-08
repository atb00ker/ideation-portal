package excel

import (
	"bytes"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"os"
)

var graphqlEndpoint = os.Getenv("HASURA_GRAPHQL_ENDPOINT") + os.Getenv("HASURA_GRAPHQL_API_PATHS_GRAPHQL")

func (c *HasuraClient) getExcelRawData() (response excelRawData, err error) {
	client := &http.Client{}
	return getExcelDataRequest(client)
}

func getExcelDataRequest(client httpInterface) (response excelRawData, err error) {

	reqBody := graphQLQuery{
		Query: `query GetExcelRawData {
      total_site_visitors: reports_by_pk(id: 0) {
        site_visitors
      }
      topics_created_by_month {
        month
        topics_created
      }
    }`,
		Variables: noVariables{},
	}

	reqBytes, err := json.Marshal(reqBody)
	if err != nil {
		return
	}

	graphRequest, err := http.NewRequest("POST", graphqlEndpoint, bytes.NewBuffer(reqBytes))
	if err != nil {
		return
	}

	var auth = []string{os.Getenv("HASURA_GRAPHQL_ADMIN_SECRET")}
	graphRequest.Header = http.Header{
		"Content-Type":          []string{"application/json"},
		"x-hasura-admin-secret": auth,
	}

	resp, err := client.Do(graphRequest)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	var hasuraResponse excelRawDataResponse
	if err = json.Unmarshal(respBytes, &hasuraResponse); err != nil {
		return
	}

	if len(hasuraResponse.Errors) != 0 {
		err = errors.New(hasuraResponse.Errors[0].Message)
		return
	}

	response = hasuraResponse.Data
	return
}
