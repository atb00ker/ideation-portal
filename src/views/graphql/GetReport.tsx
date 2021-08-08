import { useQuery, gql } from '@apollo/client';

export const GET_REPORT_QUERY = gql`
  query GetReport {
    reports_by_pk(id: 0) {
      site_visitors
    }
    topics_count_by_category {
      category
      count
    }
    topics_count_by_status {
      status
      count
    }
    topics_count_by_department {
      department
      count
    }
    topics_created_by_month {
      month
      topics_created
    }
  }
`;

const GetReport = () => {
  return useQuery(GET_REPORT_QUERY, { fetchPolicy: 'no-cache' });
};

export default GetReport;
