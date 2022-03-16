import { ApolloProvider } from 'react-apollo'

import client from './client'
import { Query } from 'react-apollo';
import {ME} from './graphql'


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        hi GraphQL
      </div>
      <Query query={ME}>{
        ({loading,error,data})=>{
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return <div>{data.user.name}</div>
        }
      }</Query>
      </ApolloProvider>
    
  )
}

export default App;
