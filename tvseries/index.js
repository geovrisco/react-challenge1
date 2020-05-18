const express = require('express')
const {ApolloServer,gql } = require('apollo-server-express')
const mongo = require('./config/mongo')
const PORT = process.env.PORT || 4001
const cors = require('cors')
const app = express()
mongo.connect((err) =>{
  if(!err){
    const typeDefs = require('./schemes/typeDefs')
    const resolvers = require('./schemes/resolvers')
    const server = new ApolloServer({typeDefs,resolvers})
    server.applyMiddleware({app})
    app.use(cors())
    app.use(express.urlencoded({extended:true}))
    app.listen({port:PORT}, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
    
  }
})