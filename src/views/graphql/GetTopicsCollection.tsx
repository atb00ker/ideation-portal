import { useQuery, gql } from '@apollo/client';
import { IGetTopicCollectionInput } from '../interfaces/IGetTopicCollectionInput';

const GetTopicsCollection = ({
  limit,
  offset,
  searchFilter,
  categoryIdList,
  departmentIdList,
  statusIdList,
}: IGetTopicCollectionInput) => {
  const getTopicCollection = gql`
    query TopicsCollection(
      $limit: Int!
      $offset: Int!
      $searchFilter: String
      $departmentIdList: [Int!]
      $categoryIdList: [Int!]
      $statusIdList: [Int!]
    ) {
      topics(
        limit: $limit
        offset: $offset
        where: {
          _and: {
            short_description: { _iregex: $searchFilter }
            department: { _in: $departmentIdList }
            category: { _in: $categoryIdList }
            status: { _in: $statusIdList }
          }
        }
        order_by: { updated_at: desc }
      ) {
        id
        title
        short_description
        status
        category
        created_at
        updated_at
        department
        topics_users_likes_associations_aggregate {
          aggregate {
            count
          }
        }
      }
      topics_aggregate(
        where: {
          _and: {
            short_description: { _iregex: $searchFilter }
            department: { _in: $departmentIdList }
            category: { _in: $categoryIdList }
            status: { _in: $statusIdList }
          }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  return useQuery(getTopicCollection, {
    variables: { limit, offset, searchFilter, categoryIdList, departmentIdList, statusIdList },
    fetchPolicy: 'no-cache',
  });
};

export default GetTopicsCollection;
