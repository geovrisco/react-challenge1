const express = require('express')
const app = express()
const Redis = require('ioredis')
const redis = new Redis()
const PORT = process.env.PORT || 3003
const axios = require('axios')

app.use(express.json())

app.get('/test',(request,response,next) =>{
  response.json('masuk')
})

app.get('/entertainme', async(request,response) => {
  
  try{
    const data = await (redis.get('lockdownList'))
    if (data){
      console.log('cachevalid')
      response.json(JSON.parse(data))
    }else {
      const movieData = await axios.get('Http://localhost:3000/movie/')
      const seriesData = await axios.get('Http://localhost:3001/series/')
      let entertainData = movieData.data.concat(seriesData.data)
      await redis.set('lockdownList',JSON.stringify(entertainData))
      console.log('cache invalid ')
      response.json(entertainData)

    }
  }
  catch(err){
    console.log(err)
    response.json(err)
  }

})

app.listen(PORT,() => {
  console.log('orchestrator on port', PORT)
})