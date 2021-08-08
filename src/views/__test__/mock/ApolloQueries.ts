import { MockedResponse } from '@apollo/client/testing';
import { TopicCategory } from '../../enums/TopicCategory';
import { TopicDepartment } from '../../enums/TopicDepartment';
import { TopicStatus } from '../../enums/TopicStatus';
import { GET_EXCEL_QUERY } from '../../graphql/GetExcel';
import { GET_REPORT_QUERY } from '../../graphql/GetReport';
import { GET_TOPIC_COLLECTION } from '../../graphql/GetTopicsCollection';
import { IGetTopicCollectionInput } from '../../interfaces/IGetTopicCollectionInput';

export const MOCK_GET_TOPIC_COLLECTION: MockedResponse = {
  request: {
    query: GET_TOPIC_COLLECTION,
    variables: {
      limit: parseInt(process.env.HOME_RECORDS_PAGE_SIZE || '5'),
      offset: 0,
      searchFilter: '',
      categoryIdList: Object.keys(TopicCategory).map(key => TopicCategory[key].id),
      departmentIdList: Object.keys(TopicDepartment).map(key => TopicDepartment[key].id),
      statusIdList: Object.keys(TopicStatus).map(key => TopicStatus[key].id),
    } as IGetTopicCollectionInput,
  },
  result: {
    data: {
      topics: [
        {
          id: 'testId',
          title: 'testTitle',
          short_description: 'testDescription',
          status: 0,
          category: 0,
          department: 0,
          topics_users_likes_associations_aggregate: {
            aggregate: {
              count: 10,
            },
          },
        },
      ],
      topics_aggregate: {
        aggregate: {
          count: 10,
        },
      },
    },
  },
};

export const MOCK_GET_EXCEL_QUERY: MockedResponse = {
  request: {
    query: GET_EXCEL_QUERY,
  },
  result: {
    data: {
      GetExcel: {
        excel_link: 'reports.csv',
      },
    },
  },
};

export const MOCK_GET_REPORT: MockedResponse = {
  request: {
    query: GET_REPORT_QUERY,
  },
  result: {
    data: {
      reports_by_pk: {
        site_visitors: 100,
      },
      topics_count_by_category: [
        {
          category: 0,
          count: 1,
        },
      ],
      topics_count_by_status: [
        {
          status: 0,
          count: 1,
        },
      ],
      topics_count_by_department: [
        {
          department: 0,
          count: 1,
        },
      ],
      topics_created_by_month: [
        {
          month: 'Jan',
          topics_created: 10,
        },
      ],
    },
  },
};
