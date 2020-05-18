import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri:'http://localhost:4004/graphql',

  clientState: {
    resolvers: {
      mutation: {
        addFavorite: (root, args, context ,info) => {
          console.log('ini mutation')
          console.log(root, args, context, info)
        }
      }
    },
    defaults: {
      entertainData:[],
      favorites:[]
    } 
  }
})