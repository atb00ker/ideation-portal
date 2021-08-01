import React from 'react';
import Card from 'react-bootstrap/Card';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from "react-router-dom";

import GetTopicsCollection from '../GraphQL/GetTopicsCollection';
import SectionLoader from '../ContentState/SectionLoader';
import ServerRequestError from '../ContentState/ServerRequestError';
import NoRecordsFound from '../ContentState/NoRecordsFound';
import './topics-collection.scss';

const TablesTopic = () => {
  const { loading, error, data } = GetTopicsCollection(20, 0);

  if (loading)
    return <SectionLoader height="500px" width="100%" />

  if (error) {
    console.error(error);
    return <ServerRequestError height="500px" imgHeight="250px" width="100%" />
  }

  if (!data.topics.length)
    return <NoRecordsFound height="500px" imgHeight="250px" width="100%" />

  return (
    <React.Fragment>
      {data.topics.map((topic: any) =>
        <Card key={topic.id} className="idea-card max-width-960 mx-auto mt-4">
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{topic.category} - {topic.department}</Card.Subtitle>
          <Card.Text>
            {topic.short_description}
          </Card.Text>
        </Card.Body>
        <div className="card-options">
          <Stepper className="card-stepper-container" activeStep={topic.status}>
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
          <Link className="rounded-0 card-btn btn btn-primary" to={`/topic/${topic.id}`} >Read More</Link>
        </div>
      </Card>
    )}
    </React.Fragment>
  )
};

export default TablesTopic;
