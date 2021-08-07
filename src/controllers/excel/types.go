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

type graphQLCategories struct {
	Categories uint8  `json:"categories"`
	Count      uint16 `json:"count"`
}

type graphQLStatuses struct {
	Status uint8  `json:"status"`
	Count  uint16 `json:"count"`
}

type graphQLDepartments struct {
	Department uint8
	Count      uint16
}
type graphQLTopicsByMonth struct {
	Month          string
	Topics_created uint16
}

type excelRawData struct {
	Total_site_visitors     graphQLTotalSiteVisitors `json:"total_site_visitors"`
	Categories              []graphQLCategories
	Statuses                []graphQLStatuses
	Departments             []graphQLDepartments
	Topics_created_by_month []graphQLTopicsByMonth
}

type exceRawDataResponse struct {
	Data   excelRawData   `json:"data,omitempty"`
	Errors []graphQLError `json:"errors,omitempty"`
}

// Final GraphQL response
type getExcelOutput struct {
	Excel_link string `json:"excel_link"`
}
