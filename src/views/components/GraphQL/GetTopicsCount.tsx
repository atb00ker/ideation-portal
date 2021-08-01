import { useQuery, gql } from '@apollo/client';

export const GET_TOPICS_COUNT = gql`query CountTopics {
  topics_aggregate {
    aggregate {
      count
    }
  }
}`;
const GetTopicsCount = () => {
  return useQuery(GET_TOPICS_COUNT);
};

export default GetTopicsCount;
