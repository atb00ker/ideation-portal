import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination'
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import TopicsCollection from '../../components/TopicsCollection/TopicsCollection';
import GetTopicsCollection from '../../components/GraphQL/GetTopicsCollection';
import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import NoRecordsFound from '../../components/ContentState/NoRecordsFound';
import GetTopicsCount from '../../components/GraphQL/GetTopicsCount';
import SearchSvg from '../../assets/icons/bootstrap-search.svg';
import './home.scss';

const Home = () => {
  let pageSize = 5;
  const [pageActive, setPageActive] = useState(0);
  const { loading: countLoading, data: countData, error: countError } = GetTopicsCount();
  const { loading: topicsLoading, data: topicsData,
          error: topicsError } = GetTopicsCollection(pageSize, pageSize*pageActive);

  const AddPageSection = (
    <Row className="mt-4">
      <Col xs={12}>
        <Row className="m-auto max-width-960">
          <Col className="ps-0" sm={10} md={11}>
            Do you have an Idea to share?
            A challenge your team is facing?
            We want to hear about it! Please click the 'add' button to share.
          </Col>
          <Col className="pe-0" sm={2} md={1}>
            <Link to={'/topic/'}>
            <Button className="float-end" variant="primary">Add</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  if (countLoading || topicsLoading)
    return <SectionLoader height="500px" width="100%" />

  if (countError || topicsError) {
    console.error(countError, topicsError);
    return <ServerRequestError height="500px" imgHeight="250px" width="100%" />
  }

  if (!topicsData.topics.length) {
    return (
      <>
        {AddPageSection}
        <NoRecordsFound height="500px" imgHeight="250px" width="100%" />
      </>
    )
  }

  const changePage = (pageNumber: number) => setPageActive(pageNumber);
  const pagesCount = Math.ceil(countData.topics_aggregate.aggregate.count / pageSize);

  return (
    <Container>
      {AddPageSection}
      <Row>
        <Col xs={12}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="mx-auto mt-2 input-position text-center">
              <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input id="search-input" className="max-width-960" type="search" placeholder="Search" />
            </div>
          </ErrorBoundary>
        </Col>
      </Row>
      <Row className="max-width-960 mx-auto">
        <Col xs={12} className="mt-2 mb-5 p-0">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <TopicsCollection topics={topicsData.topics} />
            {pagesCount > 1 && <Pagination className="mb-4 mt-4 float-end" size="sm">
              <Pagination.Prev />
              {Array.from(Array(pagesCount), (_, index) => {
                return <Pagination.Item onClick={() => changePage(index)} key={index}
                                        active={index==pageActive}>
                  {index + 1}
                </Pagination.Item>
              })}
              <Pagination.Next />
            </Pagination>}
          </ErrorBoundary>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
