const getMovieQuery = `
{
  getMovies{
    title
    tags
    overview
    popularity
    poster_path
    _id
  }
}
`
const getSeriesQuery =`
{
  getSeries{
    title
      tags
      overview
      popularity
      poster_path
      _id
  }
}
`

const addMovieQuery = `
mutation{
  addMovie(
    $title: String,
    $overview : String,
    $popularity : Float,
    $poster_path:String
    $tags: [String]
  ){
    Movie(
      title: $title,
      overview : $overview,
      popularity: $popularity,
      poster_path: $poster_path
      tags: $tags
    ){
      title
      overview
      popularity
      poster_path
      tags
    }
  }
}
`

module.exports= {
  getMovieQuery,
  addMovieQuery,
  getSeriesQuery
}

