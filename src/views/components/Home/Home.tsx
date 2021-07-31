import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../ContentState/ErrorFallback';
import TopicsCollection from '../TopicsCollection/TopicsCollection';

import './home.scss';

const Home = () => {
  return (
    <Container>

      <Row>
        <Col xs={12}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
          >
            <div className="mx-auto mt-3 input-position text-center">
              <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input id="search-input" type="search" placeholder="Search" />
            </div>
          </ErrorBoundary>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-2">
          <TopicsCollection />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
