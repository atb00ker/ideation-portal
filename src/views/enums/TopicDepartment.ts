export const TopicDepartment: { [key: string]: { id: number; name: string } } = {
  MINDSET: {
    id: 0,
    name: 'Product Engineering',
  },
  CUSTOMERDELIGHT: {
    id: 1,
    name: 'Product Management',
  },
};

export const getTopicDepartmentById = (id: number) => {
  return TopicDepartment[Object.keys(TopicDepartment)[id]];
};
