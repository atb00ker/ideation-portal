import { useQuery, gql } from '@apollo/client';

const GetTopicsCollection = () => {
  const queryTopicsCollection = gql`query TopicsCollection {
    topics(limit: 15, offset: 1) {
      id
      description
      link
      short_description
      status
      title
      author_details {
        department
        id
        name
      }
    }
  }`;

  return useQuery(queryTopicsCollection);
};

export default GetTopicsCollection;
