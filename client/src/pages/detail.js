import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  getSIngleMovie,
  getsingleShow
} from '../services/queries'
import {useQuery} from '@apollo/react-hooks'
import StarRatings from  'react-star-ratings'

function Detail(){
  const {movieId} = useParams()
  const {error:movieErr, loading:movieLoad, data:movieData} = useQuery(getSIngleMovie,{variables:{_id:movieId}})
  const {error:showErr, loading:showLoad, data:showData} = useQuery(getsingleShow,{variables:{_id:movieId}})
  console.log(showData)

  // console.log(movieId)
  return(
    <div className="body-cointainer">
      {
        movieData!==undefined &&
        <>
        {movieData.getMovie._id &&

          <div className="detail-container">
          <div className="detail-left">
            <img className="detail-image" src={movieData.getMovie.poster_path}></img>
          </div>
          <div className="detail-right">
            <h1>{movieData.getMovie.title}</h1>
            <hr></hr>
            <StarRatings
            rating={movieData.getMovie.popularity}
            numberOfStars={5}
            starDimension='20px'
            starRatedColor='rgb(244,200,47)'
            >

            </StarRatings>
            <p>{movieData.getMovie.overview}</p>
            <h3>Popularity:  {movieData.getMovie.popularity}</h3>
            <h3>Tags : {movieData.getMovie.tags}</h3>
          </div>
        </div>
        }
        </>
        }
        { showData!==undefined && 
        <>
          { showData.getShow._id &&
            <div className="detail-container">
            <div className="detail-left">
              <img className="detail-image"  src={showData.getShow.poster_path}></img>
            </div>
            <div className="detail-right">
              <h1>{showData.getShow.title}</h1>
              <hr></hr>
              <StarRatings
                rating={showData.getShow.popularity}
                numberOfStars={5}
                starDimension='20px'
                starRatedColor='rgb(244,200,47)'
              />
              <p>{showData.getShow.overview}</p>
              <h3>{showData.getShow.popularity}</h3>
              <h3>{showData.getShow.tags}</h3>
            </div>
          </div>
          }
        </>
      }
    </div>
  )

}

export default Detail