import { ApolloProvider } from 'react-apollo'
import { gql } from 'graphql-tag';
import client from './client'
import { Query } from 'react-apollo';

const ME = gql`
  query me {
    user(login: "yunosuke924"){
      name
      avatarUrl
    }
  }
`
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
