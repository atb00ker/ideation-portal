package excel

import "net/http"

// Graphql Generic
type graphQLError struct {
	Message string `json:"message"`
}

type noVariables struct{}
type graphQLQuery struct {
	Query     string      `json:"query"`
	Variables noVariables `json:"variables"`
}

// Hasura
type ExcelCaller struct {
	Hasura HasuraInterface
}

type HasuraInterface interface {
	getExcelRawData() (excelRawData, error)
}

type HasuraClient struct{}

// HTTP Client
type httpInterface interface {
	Do(req *http.Request) (*http.Response, error)
}

// Get Raw Data
type graphQLTotalSiteVisitors struct {
	Site_visitors uint64 `json:"site_visitors"`
}

type graphQLTopicsByMonth struct {
	Month          string `json:"month"`
	Topics_created uint16 `json:"topics_created"`
}

type excelRawData struct {
	Total_site_visitors     graphQLTotalSiteVisitors `json:"total_site_visitors"`
	Topics_created_by_month []graphQLTopicsByMonth   `json:"topics_created_by_month"`
}

type excelRawDataResponse struct {
	Data   excelRawData   `json:"data,omitempty"`
	Errors []graphQLError `json:"errors,omitempty"`
}

// Final GraphQL response
type getExcelOutput struct {
	Excel_link string `json:"excel_link"`
}
