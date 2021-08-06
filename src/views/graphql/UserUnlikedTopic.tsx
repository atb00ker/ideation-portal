import { ApolloCache, gql, useMutation } from '@apollo/client';
import { GET_TOPIC_BY_PK } from './GetTopicByPk';

const UserUnlikedTopic = (topics_pk: string, users_pk: string) => {
  const userUnlikedQuery = gql`
    mutation UserUnlikedTopic($topics_pk: uuid!, $users_pk: String!) {
      delete_topics_users_likes_association_by_pk(topics_pk: $topics_pk, users_pk: $users_pk) {
        topics_pk
      }
    }
  `;

  const [userUnlikedTopic, { error: unlikedError }] = useMutation(userUnlikedQuery, {
    variables: { topics_pk, users_pk },
    refetchQueries: [],
    optimisticResponse: {
      delete_topics_users_likes_association_by_pk: {
        __typename: 'delete_topics_users_likes_association_by_pk',
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
            userLiked: { aggregate: { count: 0 } },
            totalLikes: { aggregate: { count: topicInCache.topics_by_pk.totalLikes.aggregate.count - 1 } },
          },
        },
      });
    },
  });
  return { userUnlikedTopic, unlikedError };
};

export default UserUnlikedTopic;
