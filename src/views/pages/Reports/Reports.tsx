import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Chart } from 'react-google-charts';

import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import GetReport from '../../graphql/GetReport';
import { getTopicCategoryById } from '../../enums/TopicCategory';
import { getTopicStatusById, TopicStatus } from '../../enums/TopicStatus';
import { getTopicDepartmentById } from '../../enums/TopicDepartment';
import GetExcel from '../../graphql/GetExcel';
import './reports.scss';

const Reports = () => {
  const { data: reportData, error: reportError, loading: reportLoading } = GetReport();
  const { data: excelData, error: excelError, loading: excelLoading } = GetExcel();
  const [loadingExcelBtn, setLoadingExcelBtn] = useState(false);
  const showActionBtn: boolean = process.env.SHOW_ACTION_BUTTONS === 'true';

  if (reportLoading) return <SectionLoader height='500px' width='100%' />;

  const handleExcelBtn = () => {
    setLoadingExcelBtn(true);
    const urlToFile = new URL(
      excelData.GetExcel.excel_link,
      `${window.location.protocol}//${process.env.ACTION_BASE_URL}`,
    );
    fetch(urlToFile.href)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ideation-portal.csv');
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => setLoadingExcelBtn(false));
  };

  if (reportError) {
    console.error(reportError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  return (
    <Container className='mt-4'>
      <Row className='m-1'>
        <Col>
          {(excelLoading || loadingExcelBtn) && (
            <Button disabled style={{ width: '80px' }} className='float-end btn-sm' variant='success'>
              Loading...
            </Button>
          )}
          {!excelLoading && !loadingExcelBtn && showActionBtn && !excelError && (
            <Button
              onClick={() => handleExcelBtn()}
              style={{ width: '80px' }}
              className='float-end btn-sm'
              variant='success'>
              <svg height='14px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2048 2048'>
                <path
                  d='M2048 475v1445q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H115q-24 0-44-9t-37-25-25-36-9-45V627q0-24 9-44t25-37 36-25 45-9h397V128q0-27 10-50t27-40 41-28 50-10h933q26 0 49 9t42 28l347 347q18 18 27 41t10 50zm-384-256v165h165l-165-165zM261 1424h189q2-4 12-23t25-45 29-55 29-53 23-41 10-17q27 59 60 118t65 116h187l-209-339 205-333H707q-31 57-60 114t-63 112q-29-57-57-113t-57-113H279l199 335-217 337zm379 496h1280V512h-256q-27 0-50-10t-40-27-28-41-10-50V128H640v384h397q24 0 44 9t37 25 25 36 9 45v922q0 24-9 44t-25 37-36 25-45 9H640v256zm640-1024V768h512v128h-512zm0 256v-128h512v128h-512zm0 256v-128h512v128h-512z'
                  fill='#ffffff'></path>
              </svg>{' '}
              {'    '}
              Excel
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='text-center' xs={3}>
          <h1 className='display-1'>
            {reportData.reports_by_pk.site_visitors < 99999
              ? reportData.reports_by_pk.site_visitors
              : '99999+'}
          </h1>
          Total Visits
        </Col>
        <Col className='text-center' xs={3}>
          <h1 data-testid='reports-proposed-topics' className='display-1'>
            {reportData.topics_count_by_status.find((record: any) => record.status === 0)?.count || 0}
          </h1>
          New Ideas
        </Col>
        <Col className='text-center' xs={3}>
          <h1 data-testid='reports-inprogress-topics' className='display-1'>
            {reportData.topics_count_by_status
              ? reportData.topics_count_by_status
                  .filter((record: any) => {
                    // For all statuses, except the first (proposed) and last (completed), get the id.
                    // The id will be used to reduce and find the sum of the count for
                    // all items in-progress.
                    return [...Array(Object.keys(TopicStatus).length - 2).keys()]
                      .map(index => (index = index + 1))
                      .includes(record.status);
                  })
                  ?.reduce((totalSum: number, currentRecord: any) => {
                    return currentRecord.count + totalSum;
                  }, 0) || 0
              : 0}
          </h1>
          Tasks in Progress
        </Col>
        <Col className='text-center' xs={3}>
          <h1 data-testid='reports-completed-topics' className='display-1'>
            {reportData.topics_count_by_status.find(
              (record: any) => record.status === Object.keys(TopicStatus).length - 1,
            )?.count || 0}
          </h1>
          Completed Ideas
        </Col>
      </Row>
      <Row className='mt-4 mb-5'>
        <Col className='text-center' sm={12} md={6}>
          <Chart
            chartType='PieChart'
            className='chart-height'
            loader={<SectionLoader height='100%' width='100%' />}
            data={[
              ['Category Name', 'Number of Records'],
              ...reportData.topics_count_by_category.map((element: any) => [
                getTopicCategoryById(element.category).name,
                element.count,
              ]),
            ]}
            options={{
              title: 'Ideas by Category',
            }}
            rootProps={{ 'data-testid': 'categoryChart' }}
          />
        </Col>
        <Col className='text-center' sm={12} md={6}>
          <Chart
            chartType='PieChart'
            className='chart-height'
            loader={<SectionLoader height='100%' width='100%' />}
            data={[
              ['Department', 'Number of Records'],
              ...reportData.topics_count_by_department.map((element: any) => [
                getTopicDepartmentById(element.department).name,
                element.count,
              ]),
            ]}
            options={{
              title: 'Ideas by Department',
            }}
            rootProps={{ 'data-testid': 'departmentChart' }}
          />
        </Col>
        <Col className='text-center' sm={12} md={6}>
          <Chart
            className='chart-height'
            chartType='PieChart'
            loader={<SectionLoader height='100%' width='100%' />}
            data={[
              ['Status', 'Number of Records'],
              ...reportData.topics_count_by_status.map((element: any) => [
                getTopicStatusById(element.status).name,
                element.count,
              ]),
            ]}
            options={{
              title: 'Ideas by Status',
            }}
            rootProps={{ 'data-testid': 'statusChart' }}
          />
        </Col>
        {!!reportData.topics_created_by_month.length && (
          <Col className='text-center' sm={12} md={6}>
            <Chart
              chartType='BarChart'
              className='chart-height'
              loader={<SectionLoader height='100%' width='100%' />}
              data={[
                ['Month', 'Ideas Created'],
                ...reportData.topics_created_by_month.map((element: any) => [
                  element.month.trim() || '',
                  element.topics_created || 0,
                ]),
              ]}
              options={{
                title: 'Ideas created / month',
                hAxis: {
                  title: 'Ideas Created',
                  minValue: 0,
                },
                vAxis: {
                  title: 'Month',
                },
                legend: 'none',
              }}
              rootProps={{ 'data-testid': 'monthlyIdeasChart' }}
            />
          </Col>
        )}
        {!reportData.topics_created_by_month.length && (
          <Col className='text-center' sm={12} md={6}>
            <Chart
              className='chart-height'
              chartType='PieChart'
              loader={<SectionLoader height='100%' width='100%' />}
              data={[['A', 'B']]}
              options={{ title: 'Ideas create / month' }}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Reports;
