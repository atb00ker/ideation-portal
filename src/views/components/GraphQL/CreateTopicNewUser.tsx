import { gql, useMutation } from '@apollo/client';
// import { updateTopicOnMutate } from './GetTopicsCollection';

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
        title
        short_description
        status
        category
        created_at
        updated_at
        department
        likes
      }
    }
  `;
  const [createTopicNewUser, { loading: newUserMutationLoading, error: newUserMutationError }] = useMutation(
    createTopicQuery,
    {
      // update: updateTopicOnMutate,
      // refetchQueries: [],
    },
  );

  return { createTopicNewUser, newUserMutationLoading, newUserMutationError };
};

export default CreateTopicNewUser;
