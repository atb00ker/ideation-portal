import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import SectionLoader from '../../components/ContentState/SectionLoader';
import ServerRequestError from '../../components/ContentState/ServerRequestError';
import GetTopicByPk from '../../graphql/GetTopicByPk';
import { TopicStatus } from '../../enums/TopicStatus';
import { getTopicCategoryById } from '../../enums/TopicCategory';
import { getTopicDepartmentById } from '../../enums/TopicDepartment';
import { IAuth } from '../../interfaces/IAuth';
import { AuthContext } from '../../components/Auth/AuthProvider';
import UserLikedTopic from '../../graphql/UserLikedTopic';
import UserUnlikedTopic from '../../graphql/UserUnlikedTopic';
import ChangeTopicStep from '../../graphql/ChangeTopicStep';
import CreateComment from '../../graphql/CreateComment';
import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import { RouterPath } from '../../enums/RouterPath';
import './topic-details.scss';

const TopicDetails = (props: any) => {
  const auth: IAuth = useContext(AuthContext);
  const history = useHistory();
  const topics_pk = props.match.params.uuid;
  const users_pk = auth.user.id || '';
  const users_name = auth.user?.name || '';
  const users_email = auth.user?.email || '';
  const { userLikedTopic } = UserLikedTopic(topics_pk, users_pk, users_name, users_email);
  const { userUnlikedTopic } = UserUnlikedTopic(topics_pk, users_pk);
  const { changeTopicStep } = ChangeTopicStep(topics_pk, users_pk);
  const { createComment } = CreateComment(topics_pk, users_pk, users_name);
  const { loading: topicLoading, data: topicData, error: topicError } = GetTopicByPk(topics_pk, users_pk);
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const handleChangeStep = (step_inc: number) => {
    changeTopicStep({
      variables: { topics_pk, step_inc },
      optimisticResponse: {
        update_topics_by_pk: {
          status: topicData.topics_by_pk.status + step_inc,
        },
      },
    }).catch(error => console.error(error));
  };

  const handleAddComment = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newComment = form.elements.namedItem('comment-input').value || '';
    form.reset();
    createComment({
      variables: { topics_pk, users_pk, users_name, users_email, comment: newComment },
      optimisticResponse: {
        insert_topics_users_comments_association_one: {
          id: -1,
          comment: newComment,
        },
      },
    }).catch(error => {
      form.elements.namedItem('comment-input').value = newComment;
      console.log(error);
    });
  };

  if (topicLoading) return <SectionLoader height='500px' width='100%' />;

  if (topicError) {
    console.error(topicError);
    return <ServerRequestError height='500px' imgHeight='250px' width='100%' />;
  }

  const userLiked = topicData.topics_by_pk.userLiked.aggregate.count;
  return (
    <React.Fragment>
      <Container>
        <Row>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Col xs={12}>
              <h1 className='m-5 mb-4 text-center'>{topicData.topics_by_pk.title}</h1>
            </Col>
            <Col xs={12}>
              <Stepper activeStep={topicData.topics_by_pk.status} alternativeLabel>
                {Object.keys(TopicStatus).map(key => (
                  <Step key={TopicStatus[key].id}>
                    <StepLabel>{TopicStatus[key].name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Col>
            <Col xs={12} className='m-auto max-width-960'>
              <p className='mt-2 mb-3'>{topicData.topics_by_pk.description}</p>
              {topicData.topics_by_pk.link && (
                <Button className='btn-sm' style={{ padding: 0 }}>
                  <a
                    className='button-href'
                    href={topicData.topics_by_pk.link}
                    target='_blank'
                    style={{ lineHeight: '30px', padding: '10px' }}>
                    More Information {'  '}
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
              )}
            </Col>
            <Col xs={12} className='mb-3 m-auto max-width-960'>
              <hr />
              <Badge bg='primary' className='me-1'>
                Category : {` ${getTopicCategoryById(topicData.topics_by_pk.category).name} `}
              </Badge>
              <Badge bg='success' className='me-1'>
                Department : {` ${getTopicDepartmentById(topicData.topics_by_pk.department).name} `}
              </Badge>
              <Badge bg='danger' className='me-1'>
                Author :{' '}
                {` ${topicData.topics_by_pk.author_details.name} <${topicData.topics_by_pk.author_details.email}> `}
              </Badge>
              <Badge bg='info' className='me-1'>
                Last updated :{' '}
                {new Date(topicData.topics_by_pk.updated_at).toLocaleDateString('en-US', dateFormatOptions)}
              </Badge>
            </Col>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Col xs={12} className='mb-5 m-auto d-lg-inline-flex max-width-960'>
              <Button
                onClick={() => {
                  history.push(RouterPath.Topic);
                }}
                style={{ minWidth: '70px' }}
                variant='outline-primary'
                className='btn-sm me-2 mb-2 buttons-height'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-arrow-return-left'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z'
                  />
                </svg>{' '}
                {'  '}
                Back
              </Button>

              <Form onSubmit={event => handleAddComment(event)}>
                <Form.Group className='d-flex mb-2'>
                  <Form.Control
                    required
                    as='textarea'
                    className='buttons-height'
                    style={{ minWidth: '400px' }}
                    id='comment-input'
                    type='text'
                    placeholder='Comment'
                  />
                  <Button
                    id='comment-input-submit'
                    type='submit'
                    style={{ minWidth: '32px' }}
                    aria-label='Click to add comment'
                    title='Click to add comment'>
                    <svg
                      id='comment-input-icon'
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-arrow-right-circle-fill'
                      viewBox='0 0 16 16'>
                      <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z' />
                    </svg>
                  </Button>
                </Form.Group>
              </Form>

              {!!userLiked && (
                <Button
                  onClick={() => userUnlikedTopic().catch(error => console.error(error))}
                  variant='danger'
                  style={{ minWidth: '50px' }}
                  className='btn-sm me-2 mb-2 buttons-height'>
                  {` ${topicData.topics_by_pk.totalLikes.aggregate.count} `}{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-hand-thumbs-up-fill'
                    viewBox='0 0 16 16'>
                    <path d='M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z' />
                  </svg>
                </Button>
              )}
              {!userLiked && (
                <Button
                  onClick={() => userLikedTopic().catch(error => console.error(error))}
                  variant='outline-danger'
                  style={{ minWidth: '50px' }}
                  className='btn-sm me-2 mb-2 buttons-height'>
                  {` ${topicData.topics_by_pk.totalLikes.aggregate.count} `}{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-hand-thumbs-up'
                    viewBox='0 0 16 16'>
                    <path d='M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z' />
                  </svg>
                </Button>
              )}
              {auth.user.id == topicData.topics_by_pk.author_details.id && (
                <>
                  <Button
                    onClick={() => handleChangeStep(-1)}
                    disabled={topicData.topics_by_pk.status <= 0}
                    variant='outline-primary'
                    style={{ minWidth: '130px' }}
                    className='btn-sm me-2 mb-2 buttons-height'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      style={{ transform: 'translateY(-1px)' }}
                      fill='currentColor'
                      className='bi bi-chevron-left'
                      viewBox='0 0 16 16'>
                      <path
                        fillRule='evenodd'
                        d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                      />
                    </svg>{' '}
                    Previous Step
                  </Button>
                  <Button
                    onClick={() => handleChangeStep(1)}
                    disabled={topicData.topics_by_pk.status >= Object.keys(TopicStatus).length - 1}
                    variant='outline-primary'
                    style={{ minWidth: '100px' }}
                    className='btn-sm me-2 mb-2 buttons-height'>
                    Next Step{' '}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      style={{ transform: 'translateY(-1px)' }}
                      className='bi bi-chevron-right'
                      viewBox='0 0 16 16'>
                      <path
                        fillRule='evenodd'
                        d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                      />
                    </svg>
                  </Button>
                </>
              )}
            </Col>
            <Col xs={12} className='mb-3 m-auto max-width-720'>
              {topicData.topics_by_pk.comments.map((comment: any) => {
                return (
                  <Card key={comment.id} className='m-2'>
                    <Card.Body>
                      {comment.comment}
                      <br />
                      <div style={{ textAlign: 'end', marginRight: '10px' }}>
                        <small className='mt-1 text-muted'>— {comment.user.name}</small>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </ErrorBoundary>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TopicDetails;
