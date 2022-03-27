import { ApolloProvider } from 'react-apollo'

import client from './client'
import { Query } from 'react-apollo';
import { SEARCH_REPOSITORIES } from './graphql';
import { useState } from 'react';

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

const App = () => {
  // const {first, after, last, before, query} = DEFAULT_STATE
  const [defaultState, setDefaultState] = useState(DEFAULT_STATE)
  const {query} = defaultState
  return (
    <ApolloProvider client={client}>
      <form>
        <input value={query} onChange={(event)=> setDefaultState({...DEFAULT_STATE, query: event.target.value})}/>
      </form>
      <div>
        hi GraphQL 20220327
      </div>
      <Query query={SEARCH_REPOSITORIES} variables={defaultState}>{
        ({loading,error,data})=>{
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return <div></div>
        }
      }</Query>
    </ApolloProvider>
  )
}

export default App;
