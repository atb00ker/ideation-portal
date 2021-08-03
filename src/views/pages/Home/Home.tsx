import React, { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import TopicsCollection from '../../components/TopicsCollection/TopicsCollection';
import GetTopicsCollection from '../../components/GraphQL/GetTopicsCollection';
import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import NoRecordsFound from '../../components/ContentState/NoRecordsFound';
import TopicsIndexOperations from '../../components/TopicsIndexOperations/TopicsIndexOperations';

const Home = () => {
  let pageSize = 5;
  const [pageActive, setPageActive] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [pageCount, setPageCount] = useState(1);

  const {
    loading: topicsLoading,
    data: topicsData,
    error: topicsError,
  } = GetTopicsCollection(pageSize, pageSize * pageActive, searchFilter);

  const triggerTopicFilter = (searchValue: string) => {
    setSearchFilter(searchValue);
    setPageActive(0);
  };


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

  if (topicsLoading)
    return (
      <Container>
        <TopicsIndexOperations onClickSearchInput={triggerTopicFilter} />
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
        <TopicsIndexOperations onClickSearchInput={triggerTopicFilter} />
        <NoRecordsFound height='500px' imgHeight='250px' width='100%' />
      </Container>
    );
  }

  const changePage = (pageNumber: number) => setPageActive(pageNumber);

  return (
    <Container>
      <TopicsIndexOperations onClickSearchInput={triggerTopicFilter} />
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

export default Home;
