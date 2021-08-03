import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from "react-router-dom";
import './topics-collection.scss';
import { TopicStatusSteps } from '../../enums/TopicStatusSteps';
import { TopicCategory } from '../../enums/TopicCategory';
import { TopicDepartment } from '../../enums/TopicDepartment';

const TopicsCollection: React.FC<any> = ({ topics }) => {
  const [showStepNames, setShowStepNames] = useState(true)

  const handleResize = () => {
    if (window.innerWidth < 992)
      setShowStepNames(false)
    else
      setShowStepNames(true)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });

  return (
    <React.Fragment>
      {topics.map((topic: any) =>
        <Card key={topic.id} className="idea-card mt-4">
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Subtitle className="pt-1 mb-2">
          <Badge pill bg="primary" className="me-1">
              {` ${TopicCategory[Object.keys(TopicCategory)[topic.category]].name} `}
          </Badge>
          <Badge pill bg="success" className="me-1">
              {` ${TopicDepartment[Object.keys(TopicDepartment)[topic.department]].name} `}
          </Badge>
          <Badge pill bg="danger">
              {` ${topic.likes} `} likes
          </Badge>
          </Card.Subtitle>
          <Card.Text className="p-2">
            {topic.short_description ? topic.short_description : `${topic.description.substring(0, 240)}...`}
          </Card.Text>
        </Card.Body>
        <div className="card-options">
          <Stepper className="card-stepper-container" activeStep={topic.status}>
            {Object.keys(TopicStatusSteps).map(key =>
              <Step key={TopicStatusSteps[key].id}>
                <StepLabel>{showStepNames && TopicStatusSteps[key].name}</StepLabel>
              </Step>
            )}
          </Stepper>
          <Link className="rounded-0 card-btn btn btn-primary" to={`/topic/${topic.id}`} >Read More</Link>
        </div>
      </Card>
    )}
    </React.Fragment>
  )
};

export default TopicsCollection;
