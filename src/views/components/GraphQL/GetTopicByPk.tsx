import { useQuery, gql } from '@apollo/client';

export const GET_TOPIC_BY_PK = gql`
  query GetTopicByPk($topics_pk: uuid!, $users_pk: String!) {
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
        email
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
      comments: topics_users_comments_associations(
        where: { topics_pk: { _eq: $topics_pk } }
        order_by: { created_at: desc }
        limit: 25
      ) {
        id
        comment
        user {
          name
        }
      }
    }
  }
`;

const GetTopicByPk = (topics_pk: string, users_pk: string) => {
  return useQuery(GET_TOPIC_BY_PK, { variables: { topics_pk, users_pk } });
};

export default GetTopicByPk;
