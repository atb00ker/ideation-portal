import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ErrorBoundary } from 'react-error-boundary';
import Form from 'react-bootstrap/Form';

import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import { TopicStatus } from '../../enums/TopicStatus';
import { TopicDepartment } from '../../enums/TopicDepartment';
import { TopicCategory } from '../../enums/TopicCategory';
import { RouterPath } from '../../enums/RouterPath';
import './topics-index-operations.scss';

interface ITopicsIndexOperations {
  onClickSearchInput: (value: string) => void;
  onChangeDepartment: (value: number[]) => void;
  onChangeCategory: (value: number[]) => void;
  onChangeStatus: (value: number[]) => void;
}

const TopicsIndexOperations: React.FC<ITopicsIndexOperations> = ({
  onClickSearchInput,
  onChangeDepartment,
  onChangeCategory,
  onChangeStatus,
}) => {
  const triggerSearch = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    onClickSearchInput(form.elements.namedItem('search-input').value || '');
  };

  return (
    <>
      <Row className='mt-4'>
        <Col xs={12}>
          <Row className='m-auto max-width-960'>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Col data-testid='home-top-message' className='ps-0' sm={10} md={11}>
                Do you have an Idea to share? A challenge your team is facing? We want to hear about it!
                Please click the 'add' button to share.
              </Col>
              <Col className='pe-0' sm={2} md={1}>
                <Link to={RouterPath.TopicAdd}>
                  <Button className='float-end' variant='primary'>
                    Add
                  </Button>
                </Link>
              </Col>
            </ErrorBoundary>
          </Row>
        </Col>
      </Row>
      <Row className='max-width-960 mx-auto'>
        <Col xs={12} className='p-0'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className='mt-2'>
              <Form onSubmit={event => triggerSearch(event)}>
                <Form.Group className='mb-3 d-flex'>
                  <Form.Control
                    data-testid='home-search-box'
                    id='search-input'
                    type='search'
                    placeholder='Search'
                  />
                  <Button
                    id='search-icon-btn'
                    type='submit'
                    aria-label='Click to Search'
                    title='Click to Search'>
                    <svg
                      id='search-icon'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      className='bi bi-search'
                      viewBox='0 -3 24 24'>
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                    </svg>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </ErrorBoundary>
        </Col>
      </Row>
      <Row className='max-width-960 mx-auto'>
        {[
          ['All Categories', TopicCategory, onChangeCategory],
          ['All Departments', TopicDepartment, onChangeDepartment],
          ['All Statuses', TopicStatus, onChangeStatus],
        ].map(item => {
          const filterOn: any = item[0];
          const filterOptions: any = item[1];
          const changeAction: any = item[2];
          return (
            <Col xs={3} key={filterOn} className='mb-3 p-0 me-1'>
              <Form>
                <Form.Group className='mb-3' controlId={filterOn.replace(/ /g, '')}>
                  <Form.Select
                    defaultValue={filterOn}
                    onChange={event => {
                      const inputValue = event.currentTarget.value.split(',').map(value => parseInt(value));
                      changeAction(inputValue);
                    }}>
                    <option value={Object.keys(filterOptions).map(key => filterOptions[key].id)}>
                      {filterOn}
                    </option>
                    {Object.keys(filterOptions).map(key => (
                      <option key={filterOptions[key].id} value={filterOptions[key].id}>
                        {filterOptions[key].name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default TopicsIndexOperations;
