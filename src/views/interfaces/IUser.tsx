export interface IUser {
  id: string,
  name: string,
  email: string,
  jwt: (options?: any) => Promise<any>,
};
