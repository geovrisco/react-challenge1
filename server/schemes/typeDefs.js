const {gql} = require('apollo-server-express')

const typeDefs = gql `
  type Movie {
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
    getMovies : [Movie]
    getMovie(_id:String) : Movie
  }

  type Mutation{
    addMovie(
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Movie

    updateMovie(
      _id: String,
      title: String,
      overview: String,
      popularity: Float
      poster_path:String
      tags: [String]
    ):Message

    deleteMovie(
      _id: String
    ) :Message

  }
`
module.exports = typeDefs