import { gql, useMutation } from '@apollo/client';

const CreateTopic = () => {
  const createTopicQuery = gql`
    mutation CreateTopic(
      $category: Int!
      $department: Int!
      $description: String!
      $link: String
      $short_description: String!
      $title: String!
      $author_id: String!
      $author_name: String!
      $author_email: String!
    ) {
      insert_topics_one(
        object: {
          category: $category
          department: $department
          description: $description
          author_details: {
            data: { id: $author_id, name: $author_name, email: $author_email }
            on_conflict: { constraint: users_pkey, update_columns: [name, email] }
          }
          link: $link
          short_description: $short_description
          title: $title
        }
      ) {
        id
      }
    }
  `;

  const [createTopic, { loading: createTopicLoading, error: createTopicError }] =
    useMutation(createTopicQuery);

  return { createTopic, createTopicLoading, createTopicError };
};

export default CreateTopic;
