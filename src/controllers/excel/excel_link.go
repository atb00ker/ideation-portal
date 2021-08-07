package excel

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
)

func getExcelLink(caller *ExcelCaller) (response getExcelOutput, err error) {
	result, err := caller.Hasura.getExcelRawData()
	if err != nil {
		return
	}
	var dirName = "dist"
	var fileName = "reports.csv"
	_, err = os.Stat(dirName)
	if os.IsNotExist(err) {
		if err = os.MkdirAll(dirName, 0755); err != nil {
			return
		}
	}

	file, err := os.Create(fmt.Sprintf("%s/%s", dirName, fileName))
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

	response.Excel_link = fileName
	return response, err
}
