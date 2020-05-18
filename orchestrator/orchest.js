const { request } = require( 'graphql-request')
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./schemes2/typeDefs')
const resolvers = require('./schemes2/resolvers')
const express = require('express')
const app = express()
const PORT =process.env.PORT || 4004

const server = new ApolloServer({typeDefs,resolvers})
server.applyMiddleware({app})

app.listen({port:PORT}, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})
