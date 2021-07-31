import React from 'react';
import { useAuth0, Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { IAuth } from '../../interfaces/IAuth';
import { AuthContext } from './AuthProvider';

export const Provider = Auth0Provider;
export const ProviderOptions: Auth0ProviderOptions = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  cacheLocation: "localstorage"
}
const AuthConfigurations: React.FC = ({ children }) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    loginWithRedirect();
  }

  const getJwt = async (): Promise<string> => {
    if (isAuthenticated) {
      const token = await getIdTokenClaims()
      return token.__raw;
    }
    return new Promise((_, __) => '');
  }

  const auth: IAuth = {
    loginWithRedirect: loginWithRedirect,
    logout: logout,
    isAuthenticated: isAuthenticated,
    isReady: !isLoading,
    user: {
      id: user?.sub,
      name: user?.name,
      email: user?.email,
      jwt: getJwt,
    }
  };

  return (
    <React.Fragment>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default AuthConfigurations;
