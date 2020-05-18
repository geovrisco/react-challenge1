function errorHandler(err,request,response,next){
  console.log(err,'ini error')
  if(err.status){
      // console.log('if')
      response.status(err.status).json({msg:err.msg})
  }
  
  else{
    response.status(500).json({msg:'internal server error'})
  }
}

module.exports=errorHandler