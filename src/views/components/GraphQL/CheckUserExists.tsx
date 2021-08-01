import { useQuery, gql } from '@apollo/client';

const CheckUserExists = (userId: string) => {
  const queryTopicsCollection = gql`query UserExists ($userId: String!) {
    users_by_pk(id: $userId) { id }
  }`;
  return useQuery(queryTopicsCollection, { variables: { userId }, fetchPolicy: 'no-cache' });
};

export default CheckUserExists;
