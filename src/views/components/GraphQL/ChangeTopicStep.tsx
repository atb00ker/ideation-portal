import { ApolloCache, gql, useMutation } from '@apollo/client';
import { GET_TOPIC_BY_PK } from './GetTopicByPk';

const ChangeTopicStep = (topics_pk: string, users_pk: string) => {
  const changeTopicStepsQuery = gql`
    mutation Update($topics_pk: uuid!, $step_inc: Int!) {
      update_topics_by_pk(pk_columns: { id: $topics_pk }, _inc: { status: $step_inc }) {
        status
      }
    }
  `;
  const [changeTopicStep, { error: changeTopicStepError }] = useMutation(changeTopicStepsQuery, {
    refetchQueries: [],
    update: (cache: ApolloCache<any>, { data }: any) => {
      const topicInCache: any = cache.readQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
      });

      cache.writeQuery({
        query: GET_TOPIC_BY_PK,
        variables: { topics_pk, users_pk },
        data: {
          topics_by_pk: {
            ...topicInCache.topics_by_pk,
            status: data.update_topics_by_pk.status,
          },
        },
      });
    },
  });

  return { changeTopicStep, changeTopicStepError };
};

export default ChangeTopicStep;
