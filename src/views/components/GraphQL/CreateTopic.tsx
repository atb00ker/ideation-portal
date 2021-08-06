import { gql, useMutation } from '@apollo/client';

const CreateTopic = () => {
  const createTopicQuery = gql`
    mutation CreateComment(
      $comment: String!
      $topics_pk: uuid!
      $users_pk: String!
      $users_name: String!
      $users_email: String!
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

  const [createTopic, { loading: createTopicLoading, error: createTopicError }] =
    useMutation(createTopicQuery);

  return { createTopic, createTopicLoading, createTopicError };
};

export default CreateTopic;
