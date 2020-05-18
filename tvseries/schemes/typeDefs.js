const {gql} = require('apollo-server-express')

const typeDefs = gql `
  type Show {
    _id:ID,
    title: String
    overview: String
    popularity: Float,
    poster_path: String
    tags: [String]
  }
  type Message{
    message:String
  }

  type Query{
    getSeries : [Show]
    getShow(_id:String) : Show
  }

  type Mutation{
    addSeries(
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Show

    updateSeries(
      _id: String,
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Message

    deleteSeries(
      _id: String
    ) :Message

  }
`
module.exports = typeDefs