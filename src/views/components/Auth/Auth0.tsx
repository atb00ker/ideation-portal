import React, { useState, useEffect } from 'react';
import { useAuth0, Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { IAuth } from '../../interfaces/IAuth';
import { AuthContext } from './AuthProvider';

export const Provider = Auth0Provider;
export const ProviderOptions: Auth0ProviderOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin
}
const AuthConfigurations: React.FC = ({ children }) => {
  const auth0Context = useAuth0();
  const auth: IAuth = {
    loginWithRedirect: auth0Context.loginWithRedirect,
    logout: auth0Context.logout,
    isAuthenticated: auth0Context.isAuthenticated,
    isReady: !auth0Context.isLoading,
    user: {
      id: auth0Context.user?.sub,
      name: auth0Context.user?.name,
      email: auth0Context.user?.email
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
