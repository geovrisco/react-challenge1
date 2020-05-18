const {gql} = require('apollo-server')
const typeDefs = gql `
  type Movie {
    _id: ID,
    title: String,
    overview : String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  type Message{
    message:String
  }

  type Show {
    _id: ID,
    title: String,
    overview : String
    popularity: Float
    poster_path: String
    tags: [String]
  }

  type Query {
    getEntertainment: [Movie]
  }

  type Mutation {
    addMovie(
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Movie

    updateMovie (
      _id:String,
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Message

    deleteMovie(
      _id:String
    ):Message

    addShow(
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Show

    updateShow (
      _id:String,
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Message

    deleteShow(
      _id:String
    ):Message


  }
`

module.exports = typeDefs