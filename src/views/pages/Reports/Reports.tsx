import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Chart } from 'react-google-charts';

import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import GetReport from '../../graphql/GetReport';
import { getTopicCategoryById } from '../../enums/TopicCategory';
import { getTopicStatusById, TopicStatus } from '../../enums/TopicStatus';
import { getTopicDepartmentById } from '../../enums/TopicDepartment';
import './reports.scss';

const Reports = () => {
  const { data: reportData, error: reportError, loading: reportLoading } = GetReport();

  if (reportLoading) return <SectionLoader height='500px' width='100%' />;

  if (reportError) {
    console.error(reportError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col className='text-center' xs={3}>
          <h1 className='display-1'>{reportData.reports_by_pk.site_visitors}</h1>
          Total Visitors
        </Col>
        <Col className='text-center' xs={3}>
          <h1 className='display-1'>
            {reportData.topics_count_by_status.find((record: any) => record.status === 0)?.count || 0}
          </h1>
          New Ideas
        </Col>
        <Col className='text-center' xs={3}>
          <h1 className='display-1'>
            {!reportData.topics_count_by_status
              ? reportData.topics_count_by_status
                  .filter((record: any) => {
                    // For all statuses, except the first (proposed) and last (completed), get the id.
                    // The id will be used to reduce and find the sum of the count for
                    // all items in-progress.
                    return [...Array(Object.keys(TopicStatus).length - 2).keys()]
                      .map(index => (index = index + 1))
                      .includes(record.status);
                  })
                  ?.reduce(
                    (totalSum: any, currentRecord: any) => {
                      return currentRecord.count + totalSum.count;
                    },
                    { count: 0 },
                  ) || 0
              : 0}
          </h1>
          Tasks in Progress
        </Col>
        <Col className='text-center' xs={3}>
          <h1 className='display-1'>
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
