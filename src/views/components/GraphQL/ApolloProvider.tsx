import React, { useEffect, useState, useContext } from 'react';
import { ApolloClient, ApolloProvider as BaseApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';
import PageLoader from '../ContentState/PageLoader';

const ApolloProvider: React.FC = ({ children }) => {
  const auth: IAuth = useContext(AuthContext);
  const [client, setClient] = useState(undefined as unknown as ApolloClient<any>);
  const graphqlServer = new URL(
    process.env.HASURA_GRAPHQL_API_PATHS_GRAPHQL || '',
    process.env.HASURA_GRAPHQL_ENDPOINT,
  );

  const createApolloClient = (authToken: string) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlServer.toString(),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      cache: new InMemoryCache(),
    });
  };

  useEffect(() => {
    if (auth.isReady && auth.isAuthenticated) {
      auth.user.jwt().then(jwtToken => setClient(createApolloClient(jwtToken)));
    }
  }, [auth]);

  if (!client) return <PageLoader />;
  client.resetStore();
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};

export default ApolloProvider;
