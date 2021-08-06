export const TopicStatus: { [key: string]: { id: number; name: string } } = {
  PROPOSED: {
    id: 0,
    name: 'Proposed',
  },
  BRAINSTORMING: {
    id: 1,
    name: 'Brainstorming',
  },
  CREATING: {
    id: 2,
    name: 'Creating',
  },
  FEEDBACK: {
    id: 3,
    name: 'Feedback',
  },
  COMPLETED: {
    id: 4,
    name: 'Completed',
  },
};

export const getTopicStatusById = (id: number) => {
  return TopicStatus[Object.keys(TopicStatus)[id]];
};
