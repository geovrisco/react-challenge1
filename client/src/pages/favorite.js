import React,{useEffect} from 'react'
import {
  GET_FAVOURIte
} from '../services/queries'
import CardHolder from '../components/cardHolder'
import {useQuery} from '@apollo/react-hooks'

function Favorite (){
  const {data:favouriteData} = useQuery(GET_FAVOURIte)
  const getEntertainment=false
  return(
    <div className="body-cointainer">
      <CardHolder favorite={favouriteData}></CardHolder>
    </div>
  )


}

export default Favorite