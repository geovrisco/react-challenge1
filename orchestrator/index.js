const {ApolloServer} = require('apollo-server')
const typeDefs = require('./schemes/typeDefs')
const resolvers = require('./schemes/resolvers')

const server = new ApolloServer({typeDefs,resolvers})


server.listen().then(({url}) => {
  console.log('server running on ',url)
})