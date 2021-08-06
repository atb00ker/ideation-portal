import { useQuery, gql } from '@apollo/client';

const GetReport = () => {
  const getReportQuery = gql`
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

  return useQuery(getReportQuery, { fetchPolicy: 'no-cache' });
};

export default GetReport;
