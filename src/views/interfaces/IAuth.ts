import { IUser } from './IUser';

export interface IAuth {
  loginWithRedirect: (options?: any) => Promise<void>;
  logout: (options?: any) => void;
  isAuthenticated?: boolean;
  isReady?: boolean;
  user: IUser;
}
