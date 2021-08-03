export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  jwt: () => Promise<string>;
}
