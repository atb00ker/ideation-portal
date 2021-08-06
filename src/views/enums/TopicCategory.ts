export const TopicCategory: {
  [key: string]: { id: number; name: string; description: string };
} = {
  MINDSET: {
    id: 0,
    name: 'Mindset',
    description: 'To help set our mindset to align with values.',
  },
  CUSTOMERDELIGHT: {
    id: 1,
    name: 'Customer Delight',
    description: 'To help set our mindset to align with values.',
  },
};

export const getTopicCategoryById = (id: number) => {
  return TopicCategory[Object.keys(TopicCategory)[id]];
};
