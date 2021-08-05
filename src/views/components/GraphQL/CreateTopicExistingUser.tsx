import { gql, useMutation } from '@apollo/client';

const CreateTopicExistingUser = () => {
  const createTopicQuery = gql`
    mutation CreateTopic(
      $category: Int!
      $department: Int!
      $description: String!
      $link: String
      $short_description: String!
      $title: String!
      $author: String!
    ) {
      insert_topics_one(
        object: {
          category: $category
          department: $department
          description: $description
          author: $author
          link: $link
          short_description: $short_description
          title: $title
        }
      ) {
        id
      }
    }
  `;

  const [
    createTopicExistingUser,
    { loading: existingUserMutationLoading, error: existingUserMutationError },
  ] = useMutation(createTopicQuery);

  return {
    createTopicExistingUser,
    existingUserMutationLoading,
    existingUserMutationError,
  };
};

export default CreateTopicExistingUser;
