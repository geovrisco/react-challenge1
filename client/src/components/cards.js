import React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import { GET_FAVOURIte, ADD_FAVORITE } from '../services/queries'
import {useHistory} from 'react-router-dom'
import StarRatings from  'react-star-ratings'

function Card(props){

  const {data, client} = useQuery(GET_FAVOURIte)
  const history = useHistory()
  
  function goToDetail(){
    history.push(`/detail/${props.data._id}`)
  }

  function addToFavorite(){
    console.log(data)
    const variables = {
      _id: props.data._id,
      title: props.data.title,
      overview : props.data.overview,
      popularity: +props.data.popularity,
      poster_path : props.data.poster_path,
      tags: props.data.tags,
      __typename:'Favorite'
      }
      data.favorites.push(variables)
      client.writeData({
        data
      })

  }

  return(
    <>
    
    <div className="card" >
      <span onClick={goToDetail} className="go-detail"> {props.data.title}</span>
      <StarRatings rating={props.data.popularity}
        numberOfStars={5}
        starDimension='20px'
        starRatedColor='rgb(244,200,47)'
      />
      <img className="card-image" src={props.data.poster_path}></img>
      <div>
        { !props.favorite &&
          <button className="btn-blue" onClick={addToFavorite}>Favourite!</button>
        }
      </div>

    </div>
    </>
  )

}

export default Card