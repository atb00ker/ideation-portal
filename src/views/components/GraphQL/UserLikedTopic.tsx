import { ApolloCache, gql, useMutation } from '@apollo/client';
import { GET_TOPIC_BY_PK } from './GetTopicByPk';
// import { updateTopicOnMutate } from './GetTopicsCollection';

const UserLikedTopic = (topics_pk: string, users_pk: string, user_name: string, user_email: string) => {
  const userLikedQuery = gql`
    mutation UserLikedTopic(
      $topics_pk: uuid!
      $users_pk: String!
      $user_name: String!
      $user_email: String!
    ) {
      insert_topics_users_likes_association_one(
        object: {
          topics_pk: $topics_pk
          user: {
            data: { id: $users_pk, name: $user_name, email: $user_email }
            on_conflict: { constraint: users_pkey, update_columns: [name, email] }
          }
        }
      ) {
        topics_pk
      }
    }
  `;

  const [userLikedTopic, { error: likedError }] = useMutation(userLikedQuery, {
    variables: { topics_pk, users_pk, user_name, user_email },
    refetchQueries: [],
    optimisticResponse: {
      insert_topics_users_likes_association_one: {
        __typename: 'insert_topics_users_likes_association_one',
        topics_pk: topics_pk,
      },
    },
    update: (cache: ApolloCache<any>, { _ }: any) => {
      const topicInCache: any = cache.readQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
      });

      cache.writeQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
        data: {
          topics_by_pk: {
            ...topicInCache.topics_by_pk,
            userLiked: { aggregate: { count: 1 } },
            totalLikes: { aggregate: { count: topicInCache.topics_by_pk.totalLikes.aggregate.count + 1 } },
          },
        },
      });
    },
  });
  return { userLikedTopic, likedError };
};

export default UserLikedTopic;
