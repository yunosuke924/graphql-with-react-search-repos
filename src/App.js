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

          const repositoryCount = data.search.repositoryCount
          const repositoryUnit = repositoryCount === 1 ? 'Repositry' : 'Repositries'
          const title = `GitHub Repositroies Search Result - ${repositoryCount} ${repositoryUnit}`
          const edges = data?.search.edges

          return (
            <>
              <h2>{title}</h2>
              <ul>
                {edges.map(item=>{
                  const node = item.node
                  return (
                    <>
                      <li key={node?.id}>
                        <a href={node?.url} target="_blank">{node?.name}</a>
                      </li>
                    </>
                  )
                })}
              </ul>
            </>

          )
        }
      }
      </Query>
    </ApolloProvider>
  )
}

export default App;
