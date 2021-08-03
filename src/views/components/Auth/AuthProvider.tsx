import React from 'react';
import AuthConfigurations, { Provider, ProviderOptions } from './Auth0';
import { IAuth } from '../../interfaces/IAuth';

export const AuthContext = React.createContext<IAuth>(undefined as unknown as IAuth);

const AuthProvider: React.FC = ({ children }) => {
  return (
    <Provider {...ProviderOptions}>
      <AuthConfigurations>{children}</AuthConfigurations>
    </Provider>
  );
};

export default AuthProvider;
