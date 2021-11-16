/**
 * @jest-environment jsdom
 */

import { MockedProvider as ApolloMockedProvider } from '@apollo/react-testing';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, act, waitFor, RenderResult } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import Topic from '../pages/Topic/Topic';
import { MOCK_GET_TOPIC_COLLECTION } from './mock/ApolloQueries';

const _homeComponent = (
  <ApolloMockedProvider addTypename={false} mocks={[MOCK_GET_TOPIC_COLLECTION]}>
    <Router>
      <Topic></Topic>
    </Router>
  </ApolloMockedProvider>
);

describe('Home page tests', () => {
  // beforeEach(() => {});
  afterEach(() => cleanup);

  it('renders without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(_homeComponent, root);
  });

  it('test search and filter section exists and content section exists', async () => {
    let page: RenderResult | any;
    await act(async () => {
      page = await render(_homeComponent);
    });
    expect(page.getByText('All Statuses')).toBeInTheDocument();
    expect(page.getByText('All Departments')).toBeInTheDocument();
    expect(page.getByText('All Categories')).toBeInTheDocument();
    expect(page.getByTestId('home-top-message')).toBeInTheDocument();
    expect(page.getByTestId('home-search-box')).toBeInTheDocument();
    await waitFor(() => expect(page.getByText('testTitle')).toBeInTheDocument());
  });

  it('home snapshot structure', () => {
    const snapTree = renderer.create(_homeComponent);
    expect(snapTree.toJSON()).toMatchSnapshot();
  });
});
