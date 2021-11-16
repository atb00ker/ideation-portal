import React, { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import TopicsCollection from '../../components/TopicsCollection/TopicsCollection';
import GetTopicsCollection from '../../graphql/GetTopicsCollection';
import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import NoRecordsFound from '../../components/ContentState/NoRecordsFound';
import TopicsIndexOperations from '../../components/TopicsIndexOperations/TopicsIndexOperations';
import { TopicDepartment } from '../../enums/TopicDepartment';
import { TopicCategory } from '../../enums/TopicCategory';
import { TopicStatus } from '../../enums/TopicStatus';
import { IGetTopicCollectionInput } from '../../interfaces/IGetTopicCollectionInput';

const Topic = () => {
  let pageSize = parseInt(process.env.HOME_RECORDS_PAGE_SIZE || '5');
  const [pageActive, setPageActive] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(Object.keys(TopicStatus).map(key => TopicStatus[key].id));
  const [departmentFilter, setDepartmentFilter] = useState(
    Object.keys(TopicDepartment).map(key => TopicDepartment[key].id),
  );
  const [categoryFilter, setCategoryFilter] = useState(
    Object.keys(TopicCategory).map(key => TopicCategory[key].id),
  );

  const {
    loading: topicsLoading,
    data: topicsData,
    error: topicsError,
  } = GetTopicsCollection({
    limit: pageSize,
    offset: pageSize * pageActive,
    searchFilter,
    categoryIdList: categoryFilter,
    departmentIdList: departmentFilter,
    statusIdList: statusFilter,
  } as IGetTopicCollectionInput);

  const filteredTopics = useMemo(() => {
    if (!topicsData?.topics?.length) return [];
    return searchFilter
      ? topicsData.topics.filter((item: any) =>
          item.short_description.toLowerCase().includes(searchFilter.toLowerCase()),
        )
      : topicsData.topics;
  }, [topicsData]);

  useEffect(() => {
    if (!topicsData?.topics_aggregate) setPageCount(0);
    else setPageCount(Math.ceil(topicsData.topics_aggregate.aggregate.count / pageSize));
  }, [topicsData]);

  useEffect(() => {
    setPageActive(0);
  }, [searchFilter, statusFilter, departmentFilter, categoryFilter]);

  if (topicsLoading)
    return (
      <Container>
        <TopicsIndexOperations
          onClickSearchInput={setSearchFilter}
          onChangeDepartment={setDepartmentFilter}
          onChangeCategory={setCategoryFilter}
          onChangeStatus={setStatusFilter}
        />
        <SectionLoader height='500px' width='100%' />
      </Container>
    );

  if (topicsError) {
    console.error(topicsError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  if (!filteredTopics.length) {
    return (
      <Container>
        <TopicsIndexOperations
          onClickSearchInput={setSearchFilter}
          onChangeDepartment={setDepartmentFilter}
          onChangeCategory={setCategoryFilter}
          onChangeStatus={setStatusFilter}
        />
        <NoRecordsFound height='500px' imgHeight='250px' width='100%' />
      </Container>
    );
  }

  const changePage = (pageNumber: number) => setPageActive(pageNumber);

  return (
    <Container>
      <TopicsIndexOperations
        onClickSearchInput={setSearchFilter}
        onChangeDepartment={setDepartmentFilter}
        onChangeCategory={setCategoryFilter}
        onChangeStatus={setStatusFilter}
      />
      <Row className='max-width-960 mx-auto'>
        <Col xs={12} className='mb-5 p-0'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TopicsCollection topics={filteredTopics} />
            {pageCount > 1 && (
              <Pagination className='float-end' size='sm'>
                <Pagination.Prev />
                {Array.from(Array(pageCount), (_, index) => {
                  return (
                    <Pagination.Item
                      onClick={() => changePage(index)}
                      key={index}
                      active={index == pageActive}>
                      {index + 1}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next />
              </Pagination>
            )}
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
};

export default Topic;
