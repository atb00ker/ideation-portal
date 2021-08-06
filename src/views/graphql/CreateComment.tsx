import { ApolloCache, gql, useMutation } from '@apollo/client';
import { GET_TOPIC_BY_PK } from './GetTopicByPk';

const CreateComment = (topics_pk: string, users_pk: string, users_name: string) => {
  const createCommentQuery = gql`
    mutation CreateComment(
      $topics_pk: uuid!
      $users_pk: String!
      $users_name: String!
      $users_email: String!
      $comment: String!
    ) {
      insert_topics_users_comments_association_one(
        object: {
          comment: $comment
          topics_pk: $topics_pk
          user: {
            data: { email: $users_email, id: $users_pk, name: $users_name }
            on_conflict: { constraint: users_pkey, update_columns: [name, email] }
          }
        }
      ) {
        id
        comment
      }
    }
  `;

  const [createComment, { loading: createCommentLoading }] = useMutation(createCommentQuery, {
    update: (cache: ApolloCache<any>, { data }: any) => {
      const topicInCache: any = cache.readQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
      });

      const addedComment = {
        id: data.insert_topics_users_comments_association_one.id,
        comment: data.insert_topics_users_comments_association_one.comment,
        user: {
          name: users_name,
        },
      };

      cache.writeQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
        data: {
          topics_by_pk: {
            ...topicInCache.topics_by_pk,
            comments: [addedComment, ...topicInCache.topics_by_pk.comments],
          },
        },
      });
    },
  });

  return { createComment, createCommentLoading };
};

export default CreateComment;
