import { gql, useMutation } from '@apollo/client';

const UpdatePageVisited = () => {
  const updatePageVisitedQuery = gql`
    mutation UpdatePageVisited {
      update_reports_by_pk(pk_columns: { id: 0 }, _inc: { site_visitors: 1 }) {
        site_visitors
      }
    }
  `;

  const [updatePageVisited] = useMutation(updatePageVisitedQuery);
  return { updatePageVisited };
};

export default UpdatePageVisited;
