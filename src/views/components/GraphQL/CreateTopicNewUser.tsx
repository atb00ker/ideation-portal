import { gql, useMutation } from '@apollo/client';

const CreateTopicNewUser = () => {
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
    ) {
      insert_topics_one(
        object: {
          category: $category
          department: $department
          description: $description
          author_details: { data: { id: $author_id, name: $author_name } }
          link: $link
          short_description: $short_description
          title: $title
        }
      ) {
        id
      }
    }
  `;
  const [createTopicNewUser, { loading: newUserMutationLoading, error: newUserMutationError }] =
    useMutation(createTopicQuery);

  return { createTopicNewUser, newUserMutationLoading, newUserMutationError };
};

export default CreateTopicNewUser;
