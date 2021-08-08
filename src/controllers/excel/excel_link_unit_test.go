// +build unit_tests all_tests

package excel

import (
	"fmt"
	"os"
	"testing"
)

func TestGetExcelLink_CorrectResponse(t *testing.T) {
	os.Remove(excelDirName)
	testCaller := ExcelCaller{
		Hasura: &mockHasuraClient{
			total_site_visitors: graphQLTotalSiteVisitors{100},
			topics_created_by_month: []graphQLTopicsByMonth{
				{
					Month:          "Jan",
					Topics_created: 100,
				},
			},
		},
	}

	response, err := getExcelLink(&testCaller)
	if err != nil {
		t.Errorf("Unexpected error %s", err.Error())
	}
	if response.Excel_link != excelFileName {
		t.Errorf("Expected %s. Got %s", excelFileName, response.Excel_link)
	}

	hash, err := hash_file_md5(fmt.Sprintf("%s/%s", excelDirName, excelFileName))
	if err != nil {
		t.Errorf("Expected to find file, got error: %s", err.Error())
	}

	if hash != "b11a040f7135a84951a21c3a068154bb" {
		t.Errorf("Contents of file are not as expected!")
	}

}
