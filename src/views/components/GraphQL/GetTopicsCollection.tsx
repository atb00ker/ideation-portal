import { useQuery, gql } from '@apollo/client';
import { IGetTopicCollectionInput } from '../../interfaces/IGetTopicCollectionInput';

const GET_TOPIC_COLLECTION = gql`
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

// export const updateTopicOnMutate = (cache: ApolloCache<any>, { data }: any) => {
//   const topicInCache: any = cache.readQuery({
//     query: GET_TOPIC_COLLECTION,
//     variables: { limit: 20, offset: 0, searchFilter: "" },
//   });

//   if (topicInCache) {
//     cache.writeQuery({
//       query: GET_TOPIC_COLLECTION,
//       variables: { limit: 20, offset: 0, searchFilter: "" },
//       data: { topics: [data.insert_topics_one, ...topicInCache.topics] },
//     });
//   } else {
//     cache.reset();
//   }
// };

const GetTopicsCollection = ({
  limit,
  offset,
  searchFilter,
  categoryIdList,
  departmentIdList,
  statusIdList,
}: IGetTopicCollectionInput) => {
  return useQuery(GET_TOPIC_COLLECTION, {
    variables: { limit, offset, searchFilter, categoryIdList, departmentIdList, statusIdList },
    fetchPolicy: 'no-cache',
  });
};

export default GetTopicsCollection;
