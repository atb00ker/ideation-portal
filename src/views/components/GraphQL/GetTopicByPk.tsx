import { useQuery, gql } from '@apollo/client';

export const GET_TOPIC_BY_PK = gql`
  query ($topics_pk: uuid!, $users_pk: String!) {
    topics_by_pk(id: $topics_pk) {
      title
      category
      department
      description
      link
      status
      updated_at
      author_details {
        id
        name
      }
      userLiked: topics_users_likes_associations_aggregate(
        where: { topics_pk: { _eq: $topics_pk }, users_pk: { _eq: $users_pk } }
      ) {
        aggregate {
          count
        }
      }
      totalLikes: topics_users_likes_associations_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const GetTopicByPk = (topics_pk: string, users_pk: string) => {
  return useQuery(GET_TOPIC_BY_PK, { variables: { topics_pk, users_pk } });
};

export default GetTopicByPk;
