import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider as BaseApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';


const ApolloProvider: React.FC = ({ children }) => {
  const auth: IAuth = React.useContext(AuthContext);
  const [client, setClient] = useState(undefined as ApolloClient<any>)
  const graphqlServer = new URL(
    process.env.HASURA_GRAPHQL_API_PATHS_GRAPHQL,
    process.env.HASURA_GRAPHQL_ENDPOINT
  );

  const createApolloClient = (authToken: string) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: graphqlServer.toString(),
        headers: {
          Authorization: `Bearer ${authToken}`
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

  if (!client) {
    // TODO
    return <h1>Loading...</h1>
  }

  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
};

export default ApolloProvider;
