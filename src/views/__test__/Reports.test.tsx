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
import Reports from '../pages/Reports/Reports';
import { MOCK_GET_EXCEL_QUERY, MOCK_GET_REPORT } from './mock/ApolloQueries';

const _reportsComponent = (
  <ApolloMockedProvider addTypename={false} mocks={[MOCK_GET_REPORT, MOCK_GET_EXCEL_QUERY]}>
    <Router>
      <Reports></Reports>
    </Router>
  </ApolloMockedProvider>
);

describe('Report page tests', () => {
  // beforeEach(() => {});
  afterEach(() => cleanup);

  it('renders without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(_reportsComponent, root);
  });

  it('test search and filter section exists and content section exists', async () => {
    let page: RenderResult | any;
    await act(async () => {
      page = await render(_reportsComponent);
    });
    await waitFor(() => expect(page.getByText('Total Visits')).toBeInTheDocument());
    expect(page.getByText('New Ideas')).toBeInTheDocument();
    expect(page.getByText('Tasks in Progress')).toBeInTheDocument();
    expect(page.getByText('Completed Ideas')).toBeInTheDocument();
    expect(page.getByTestId('reports-proposed-topics')).toHaveTextContent('1');
    expect(page.getByTestId('reports-inprogress-topics')).toHaveTextContent('0');
    expect(page.getByTestId('reports-completed-topics')).toHaveTextContent('0');
  });

  it('report snapshot structure', () => {
    const snapTree = renderer.create(_reportsComponent);
    expect(snapTree.toJSON()).toMatchSnapshot();
  });
});
