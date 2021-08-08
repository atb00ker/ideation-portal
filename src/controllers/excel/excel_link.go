package excel

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
)

var excelDirName = "dist"
var excelFileName = "reports.csv"

func getExcelLink(caller *ExcelCaller) (response getExcelOutput, err error) {
	result, err := caller.Hasura.getExcelRawData()
	if err != nil {
		return
	}

	_, err = os.Stat(excelDirName)
	if os.IsNotExist(err) {
		if err = os.MkdirAll(excelDirName, 0755); err != nil {
			return
		}
	}

	file, err := os.Create(fmt.Sprintf("%s/%s", excelDirName, excelFileName))
	if err != nil {
		return
	}
	defer file.Close()
	writer := csv.NewWriter(file)
	defer writer.Flush()
	writer.Write([]string{"Total Visitors", strconv.FormatUint(result.Total_site_visitors.Site_visitors, 10)})

	for _, topicsByMonth := range result.Topics_created_by_month {
		if err = writer.Write([]string{topicsByMonth.Month,
			strconv.Itoa(int(topicsByMonth.Topics_created))}); err != nil {
			return
		}
	}

	response.Excel_link = excelFileName
	return response, err
}
