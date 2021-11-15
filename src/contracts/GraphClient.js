import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import config from '@/config'

const APIURL = config.theGraphUrl;


const graphClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
});


export default graphClient;