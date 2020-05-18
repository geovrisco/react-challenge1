const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
const mongo = require('./config/mongo')
const errorHandler = require('./helpers/errorHandler')
const cors = require('cors')
mongo.connect((err) => {
  if(!err){
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({extended:true}))
    app.use('/',require('./routes/index'))
    app.use(errorHandler)
    
    app.listen(PORT, ()=>{
      console.log('running on port: ',PORT)
    })
  }  
})