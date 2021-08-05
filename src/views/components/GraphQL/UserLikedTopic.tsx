import { ApolloCache, gql, useMutation } from '@apollo/client';
import { GET_TOPIC_BY_PK } from './GetTopicByPk';
// import { updateTopicOnMutate } from './GetTopicsCollection';

const UserLikedTopic = (topics_pk: string, users_pk: string) => {
  const createTopicQuery = gql`
    mutation UserLikedTopic($topics_pk: uuid!, $users_pk: String!) {
      insert_topics_users_likes_association_one(object: { topics_pk: $topics_pk, users_pk: $users_pk }) {
        topics_pk
      }
    }
  `;

  const [userLikedTopic, { error: likedError }] = useMutation(createTopicQuery, {
    variables: { topics_pk, users_pk },
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
