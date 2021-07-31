import { useQuery, gql } from '@apollo/client';

const GetTopicsCollection = (limit: number, offset: number) => {
  const queryTopicsCollection = gql`query TopicsCollection {
    topics(limit: ${limit}, offset: ${offset}, order_by: {created_at: desc, updated_at: desc}) {
      id
      title
      short_description
      status
      category
      created_at
      updated_at
      author_details {
        department
      }
    }
  }`;

  return useQuery(queryTopicsCollection);
};

export default GetTopicsCollection;
