import { gql } from 'apollo-boost'
export const ADD_MOVIE = gql `
    mutation addMovie(
      $title: String, 
      $overview: String, 
      $popularity: Float, 
      $poster_path: String, 
      $tags: [String]
      ){
      addMovie(
        title: $title,
        overview: $overview,
        popularity: $popularity
        poster_path: $poster_path,
        tags: $tags
      ){
        _id,
        title,
        overview,
        popularity,
        poster_path,
        tags
      }
    }
  `

export const ADD_SERIES = gql `
  mutation addShow(
    $title: String, 
    $overview: String, 
    $popularity: Float, 
    $poster_path: String, 
    $tags: [String]
    ){
    addShow(
      title: $title,
      overview: $overview,
      popularity: $popularity
      poster_path: $poster_path,
      tags: $tags
    ){
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const CACHE_ENTERTAINMENT = gql `
  {
    entertainData @ client {
      _id
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const GET_FAVOURIte = gql `
  {
    favorites @client {
      _id
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const ADD_FAVORITE = gql `
  mutation addFavorite(
    $_id: String,
    $title: String, 
    $overview: String, 
    $popularity: Float, 
    $poster_path: String, 
    $tags: [String]
    ){
    addFavorite(
      _id: $_id
      title: $title,
      overview: $overview,
      popularity: $popularity
      poster_path: $poster_path,
      tags: $tags
    ) @client {
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    }
  }
`

export const GET_ENTERTAINMENTS = gql`
  query{
    getEntertainment{
      _id
      title
      popularity
      poster_path
      tags
      overview
    }
  }
  `

export const getSIngleMovie = gql`
query getMovie($_id: String){
  getMovie(_id:$_id){
    _id
    title
    popularity
    poster_path
    tags
    overview
  }
}
`

export const getsingleShow = gql`
query getShow($_id: String){
  getShow(_id:$_id){
    _id
    title
    popularity
    poster_path
    tags
    overview
  }
}
`