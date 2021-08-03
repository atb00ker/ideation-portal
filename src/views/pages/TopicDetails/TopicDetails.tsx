import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Step, StepLabel, Stepper } from '@material-ui/core';

import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import GetTopicByPk from '../../components/GraphQL/GetTopicByPk';
import { TopicStatusSteps } from '../../enums/TopicStatusSteps';
import { getTopicCategoryById } from '../../enums/TopicCategory';
import { getDepartmentById } from '../../enums/TopicDepartment';

const TopicDetails = (props: any) => {
  const { loading: topicLoading, data: topicData, error: topicError } = GetTopicByPk(props.match.params.uuid);

  if (topicLoading) return <SectionLoader height='500px' width='100%' />;

  if (topicError) {
    console.error(topicError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className='m-5 mb-4 text-center'>{topicData.topics_by_pk.title}</h1>
          </Col>
          <Col xs={12}>
            <Stepper activeStep={topicData.topics_by_pk.status} alternativeLabel>
              {Object.keys(TopicStatusSteps).map(key => (
                <Step key={TopicStatusSteps[key].id}>
                  <StepLabel>{TopicStatusSteps[key].name}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Col>
          <Col xs={12} className='m-auto max-width-960'>
            <p className='mt-2 mb-3'>{topicData.topics_by_pk.description}</p>
            <Button style={{ padding: 0 }}>
              <a
                className='button-href'
                href={topicData.topics_by_pk.link}
                target='_blank'
                style={{ lineHeight: '38px', padding: '10px' }}>
                More Information
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='16px'
                  viewBox='0 2 24 24'
                  width='16px'
                  fill='#ffffff'>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
                </svg>
              </a>
            </Button>
            <h4 className='float-end'>— {topicData.topics_by_pk.author_details.name}</h4>
          </Col>
          <Col xs={12} className='mb-5 m-auto max-width-960'>
            <hr />
            <Badge bg='primary' className='me-1'>
              Category : {` ${getTopicCategoryById(topicData.topics_by_pk.category)} `}
            </Badge>
            <Badge bg='success' className='me-1'>
              Department : {` ${getDepartmentById(topicData.topics_by_pk.department)} `}
            </Badge>
            <Badge bg='danger' className='me-1'>
              Likes : {` ${topicData.topics_by_pk.likes} `}
            </Badge>
            <Badge bg='info'>
              Last updated :{' '}
              {new Date(topicData.topics_by_pk.updated_at).toLocaleDateString('en-US', dateFormatOptions)}
            </Badge>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TopicDetails;
