import { gql, useMutation } from '@apollo/client';
import { ON_UPDATE_TOPICS_REFETCH_LIST, updateTopicOnMutate } from './GetTopicsCollection';

const CreateTopicExistingUser = () => {
  const createTopicQuery = gql`mutation CreateTopic($category: Int, $department: Int, $description: String,
    $link: String, $short_description: String, $title: String, $author: String) {
      insert_topics_one(object: {
        category: $category,
        department: $department,
        description: $description,
        author: $author,
        link: $link,
        short_description: $short_description,
        title: $title
      }) {
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
    }`;

  const [createTopicExistingUser, {loading: existingUserMutationLoading,
    error: existingUserMutationError}] = useMutation(createTopicQuery, { update: updateTopicOnMutate,
    refetchQueries: ON_UPDATE_TOPICS_REFETCH_LIST });

  return { createTopicExistingUser, existingUserMutationLoading, existingUserMutationError };
};

export default CreateTopicExistingUser;
