import { useQuery, gql, ApolloCache } from '@apollo/client';


const GET_TOPIC_COLLECTION = gql`query TopicsCollection($limit: Int, $offset: Int) {
  topics(limit: $limit, offset: $offset, order_by: {updated_at: desc, created_at: desc}) {
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
}`

export const updateTopicOnMutate = (cache: ApolloCache<any>, { data }: any) => {
  const topicInCache: any = cache.readQuery({
    query: GET_TOPIC_COLLECTION,
    variables: { limit: 20, offset: 0 },
  });

  if (topicInCache) {
    cache.writeQuery({
      query: GET_TOPIC_COLLECTION,
      variables: { limit: 20, offset: 0 },
      data: {topics: [data.insert_topics_one, ...topicInCache.topics]}
    });
  } else {
    cache.reset();
  }
}

const GetTopicsCollection = (limit: number, offset: number) => {
  return useQuery(GET_TOPIC_COLLECTION, {variables: { limit, offset }});
};

export default GetTopicsCollection;
