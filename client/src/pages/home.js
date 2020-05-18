import React,{useState} from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import {CACHE_ENTERTAINMENT,
  GET_FAVOURIte
} from '../services/queries'
import CardHolder from '../components/cardHolder'

const GET_ENTERTAINMENTS = gql`
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

function Home(){

  const {error, loading, data:entertainData}= useQuery(GET_ENTERTAINMENTS)
  const {error:cacheErr, loading:cacheLoading, data:cacheData} = useQuery(CACHE_ENTERTAINMENT)
  
  if(loading){
    return (<p>Loading</p>)
  }

  return(
    <div className='body-cointainer'>
        <CardHolder data={entertainData} defaultState={cacheData}></CardHolder>
    </div>
  )

}

export default Home