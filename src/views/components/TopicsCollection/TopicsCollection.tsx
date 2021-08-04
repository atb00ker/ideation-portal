import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from 'react-router-dom';
import './topics-collection.scss';
import { TopicStatus } from '../../enums/TopicStatus';
import { getTopicCategoryById } from '../../enums/TopicCategory';
import { getDepartmentById } from '../../enums/TopicDepartment';
import { RouterPath } from '../../enums/RouterPath';

const TopicsCollection: React.FC<any> = ({ topics }) => {
  const [showStepNames, setShowStepNames] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 992) setShowStepNames(false);
    else setShowStepNames(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  return (
    <React.Fragment>
      {topics.map((topic: any) => (
        <Card key={topic.id} className='idea-card mb-3'>
          <Card.Body>
            <Card.Title>{topic.title}</Card.Title>
            <Card.Subtitle className='pt-1 mb-2'>
              <Badge bg='primary' className='me-1'>
                {` ${getTopicCategoryById(topic.category)} `}
              </Badge>
              <Badge bg='success' className='me-1'>
                {` ${getDepartmentById(topic.department)} `}
              </Badge>
              <Badge bg='secondary'>{` ${topic.likes} `} likes</Badge>
            </Card.Subtitle>
            <Card.Text className='p-2'>{topic.short_description}</Card.Text>
          </Card.Body>
          <div className='card-options'>
            <Stepper className='card-stepper-container' activeStep={topic.status}>
              {Object.keys(TopicStatus).map(key => (
                <Step key={TopicStatus[key].id}>
                  <StepLabel>{showStepNames && TopicStatus[key].name}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Link className='rounded-0 card-btn btn btn-primary' to={`${RouterPath.Topic}${topic.id}`}>
              Read More
            </Link>
          </div>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default TopicsCollection;
