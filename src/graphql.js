import { gql } from 'graphql-tag';

export const ME = gql`
  query me {
    user(login: "yunosuke924"){
      name
      avatarUrl
    }
  }
`