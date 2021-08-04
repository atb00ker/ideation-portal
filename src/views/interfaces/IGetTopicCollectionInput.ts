export interface IGetTopicCollectionInput {
  limit: number;
  offset: number;
  searchFilter: string;
  categoryIdList: Array<number>;
  statusIdList: Array<number>;
  departmentIdList: Array<number>;
}
