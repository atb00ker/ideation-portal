import { useQuery, gql } from '@apollo/client';

const GET_TOPIC_BYPK = gql`
  query CountTopics($pk: uuid!) {
    topics_by_pk(id: $pk) {
      category
      department
      description
      likes
      link
      status
      title
      updated_at
      author_details {
        id
        name
      }
    }
  }
`;

const GetTopicsCollection = (pk: string) => {
  return useQuery(GET_TOPIC_BYPK, { variables: { pk } });
};

export default GetTopicsCollection;
