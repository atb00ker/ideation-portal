import React from 'react';
import Card from 'react-bootstrap/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GetTopicsCollection from '../GraphQL/GetTopicsCollection';
import './topics-collection.scss';

const TablesTopic = ({ auth }) => {
  const { loading, error, data } = GetTopicsCollection();

  // TODO
  console.log(loading);
  console.log(data);
  console.log(error);

  return (
    <React.Fragment>
      <Card className="idea-card mx-auto mt-4">

        <Card.Body>
          <Card.Title>Ideation Portal</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Mindset - Product Engineering</Card.Subtitle>
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
            <Step key={5}>
              <StepLabel>Completed</StepLabel>
            </Step>
          </Stepper>
          <Card.Link className="rounded-0 card-btn btn btn-primary" href="#">Read More</Card.Link>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TablesTopic;
