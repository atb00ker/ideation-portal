import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './home.scss';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="mx-auto mt-3 input-position text-center">
            <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input id="search-input" type="search" placeholder="Search" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card className="idea-card mx-auto mt-4">
            <Card.Body>
              <Card.Title>Ideation Portal</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Mindset - Product Engineering - Ajay Tripathi</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content. Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <div className="card-options">
              <Stepper className="card-stepper-container" activeStep={2}>
                <Step key={1}>
                  <StepLabel>Proposed</StepLabel>
                </Step>
                <Step key={2}>
                  <StepLabel>Brainstorming</StepLabel>
                </Step>
                <Step key={3}>
                  <StepLabel>Creating</StepLabel>
                </Step>
                <Step key={4}>
                  <StepLabel>Feedback</StepLabel>
                </Step>
                <Step key={4}>
                  <StepLabel>Completed</StepLabel>
                </Step>
              </Stepper>
              <Card.Link className="rounded-0 card-btn btn btn-primary" href="#">Read More</Card.Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
