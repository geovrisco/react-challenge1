import React,{useState} from 'react'
import Card from './cards'
import Modal from './TesModal'

function CardHolder (props){
  const [modalTrigger, setModalTrigger]= useState(false)
  
  function toggleModal(){
    setModalTrigger(!modalTrigger)
  }

  function modalTrue(){
    setModalTrigger(true)
  }
  let allData = null
  if(!props.favorite){
    allData = props.data.getEntertainment.concat(props.defaultState.entertainData)
    console.log(allData,'ini all data')
  }
  console.log(props,'ini props')
  return(
    <>
      <div className="card-holder-title">
        <span className="title">Lockdown Hub</span>
        <div>
          {
            <button className="btn-add" onClick={toggleModal}>+</button>
          }
        </div>
      </div>
    <div className="card-holder">
      {
        allData &&
        allData.map(film => {
          return <Card key={film._id} data={film}></Card>
        })
      }
      {
        props.favorite &&
        props.favorite.favorites.map(film => {
          return <Card key={film._id} data={film} favorite={true}></Card>
        })
      }
      
    </div>

    <Modal Trigger={modalTrigger} toggle={toggleModal} stay={modalTrue}></Modal>
    </>
  )

}

export default CardHolder 