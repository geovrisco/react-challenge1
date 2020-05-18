import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'

import {
  ADD_MOVIE,
  ADD_SERIES,
  CACHE_ENTERTAINMENT

} from '../services/queries'


function Modal(props){
  // console.log(props,'ini modal')
  const[title, setTitle] = useState(null)
  const[overview, setOverview] = useState(null)
  const[popularity, setPopularity] = useState(null)
  const[poster_path, setPosterPath]= useState(null)
  const[tags, setTags] = useState(null)


  const[addMovie] = useMutation(ADD_MOVIE, {
    update: (proxy, {data: {addMovie} }) => {
      const {entertainData} = proxy.readQuery({query:CACHE_ENTERTAINMENT})
      entertainData.push(addMovie)
      proxy.writeData({
        data:{entertainData}
      })
    }
  })


  const[addShow] = useMutation(ADD_SERIES,{
    update: (proxy, {data: {addShow} }) => {
      const {entertainData} = proxy.readQuery({query:CACHE_ENTERTAINMENT})  
      console.log(addShow)
      entertainData.push(addShow)
      proxy.writeData({
        data:{entertainData}
      })

    }
  })

  async function functAddMovie(){
    await addMovie({
      variables:{
        title: title,
        overview: overview,
        popularity: +popularity,
        poster_path: poster_path,
        tags: tags.split(" ")
      }
    })
    // setTimeout(() => {
      props.toggle()
    // },3000)
  }

  async function functAddSHow(){
    await addShow({
      variables:{
        title: title,
        overview: overview,
        popularity: +popularity,
        poster_path: poster_path,
        tags: tags.split(" ")
      }
    })
    props.toggle()
  }

    return (
      <>
      { props.Trigger &&
        <div className="modal-overlay">
          <span>CLick Here to Close the Window</span>
          <div className="modal-content">
            <div className="modal-close" onClick={props.toggle}>
              <span style={{textAlign:"center"}}>Close</span>
            </div>
            <div className="modal-title">
              <span>Add New Data</span>
            </div>
                <div className="modal-form">
                  <label>Title</label>
                  <input onChange={ (e) => setTitle(e.target.value)} 
                  required
                    type="text" placeholder="e.g. Link Pemersatu: The Beginning">
                  </input>
                </div>
                <div className="modal-form">
                  <label>Overview</label>
                  <input required
                    onChange = {(e) => setOverview(e.target.value)}
                    type="text" placeholder="sebuah harapan kecil ditengah bangsa yang terpecah">
                  </input>
                </div>
                <div className="modal-form">
                  <label>Popularity</label>
                  <input  type="number"  required
                    onChange={(e) => setPopularity(e.target.value)}
                    min={1}
                    max={5}
                  />
                </div>
                <div className="modal-form">
                  <label>Image Url</label>
                  <input required type="text" placeholder="www.something.com/image.jpg" 
                  onChange = {(e) => setPosterPath(e.target.value)}
                  />
                </div>
                <div className="modal-form">
                  <label>Tags</label>
                  <input required type="text" placeholder="action comedy thriller" 
                    onChange = {(e) => setTags(e.target.value)}
                  />
                </div>
                {
                  title && overview && tags && poster_path && popularity && poster_path &&
                  <div>
                    <input type="submit" onClick={functAddMovie} className="btn-blue" value="Movies"></input>
                    <input type="submit" onClick={functAddSHow} className="btn-blue" value="Series"></input>
                </div>
                }
          </div>
        </div>
      }
      
      </>
    )


}

export default Modal