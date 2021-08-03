import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { ErrorBoundary } from 'react-error-boundary';
import Form from 'react-bootstrap/Form';

import { ErrorFallback } from '../../components/ContentState/ErrorFallback';
import { TopicStatusSteps } from '../../enums/TopicStatusSteps';
import { TopicDepartment } from '../../enums/TopicDepartment';
import { TopicCategory } from '../../enums/TopicCategory';
import './topics-index-operations.scss';

const Home: React.FC<{ onClickSearchInput: (value: string) => void }> = ({ onClickSearchInput }) => {
  const triggerSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    onClickSearchInput((form.elements.namedItem('search-input') as any)?.value || '');
  };

  return (
    <>
      <Row className='mt-4'>
        <Col xs={12}>
          <Row className='m-auto max-width-960'>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Col className='ps-0' sm={10} md={11}>
                Do you have an Idea to share? A challenge your team is facing? We want to hear about it!
                Please click the 'add' button to share.
              </Col>
              <Col className='pe-0' sm={2} md={1}>
                <Link to={'/topic/'}>
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
                  <Form.Control id='search-input' type='search' placeholder='Search' />
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
        <Col xs={12} className='mb-3 p-0 me-1'>
          {[
            ['Category', TopicCategory],
            ['Department', TopicDepartment],
            ['Status', TopicStatusSteps],
          ].map(item => {
            const filterOn: any = item[0];
            const filterOptions: any = item[1];
            return (
              <DropdownButton
                className='me-1'
                as={ButtonGroup}
                size='sm'
                key={filterOn}
                id='dropdown-item-button'
                title={filterOn}>
                {Object.keys(filterOptions).map(key => (
                  <Dropdown.Item key={filterOptions[key].id} value={filterOptions[key].id} as='button'>
                    {filterOptions[key].name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default Home;
