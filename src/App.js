import { ApolloProvider } from 'react-apollo'

import client from './client'
import { Query } from 'react-apollo';
import { SEARCH_REPOSITORIES } from './graphql';
import { useState } from 'react';

const PER_PAGE = 5
const DEFAULT_STATE = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

const App = () => {
  // const {first, after, last, before, query} = DEFAULT_STATE
  const [searchState, setSearchState] = useState(DEFAULT_STATE)
  const {query} = searchState
  return (
    <ApolloProvider client={client}>
      <form>
        <input value={query} onChange={(event)=> setSearchState({...DEFAULT_STATE, query: event.target.value})}/>
      </form>
      <Query query={SEARCH_REPOSITORIES} variables={searchState}>{
        ({loading,error,data})=>{
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`

          const repositoryCount = data.search.repositoryCount
          const repositoryUnit = repositoryCount === 1 ? 'Repositry' : 'Repositries'
          const title = `GitHub Repositroies Search Result - ${repositoryCount} ${repositoryUnit}`
          const search = data.search
          const edges = search.edges

          const goNext = (search) => {
            console.log(search)
            setSearchState({
              first: PER_PAGE,
              after: search.pageInfo.endCursor,
              last: null,
              before: null,
              query: "フロントエンドエンジニア"
            })
          }

          return (
            <>
              <h2>{title}</h2>
              <ul>
                {edges.map(item=>{
                  const node = item.node
                  return (
                    <>
                      <li key={node?.id}>
                        <a href={node?.url} target="_blank" rel="noreferrer">{node?.name}</a>
                      </li>
                    </>
                  )
                })}
              </ul>
              {search.pageInfo?.hasNextPage && (
              <>
                <button onClick={()=>goNext(search)}>next</button>
              </>)}

            </>
          )
        }
      }
      </Query>
    </ApolloProvider>
  )
}

export default App;
