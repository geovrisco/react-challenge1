const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongo = require('./config/mongo')
const cors = require('cors')
const errorHandler = require('./helpers/errorHandler')

mongo.connect((err) => {
  if(!err){
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use('/',require('./routes/index'))
    app.use(errorHandler)
    
    app.listen(PORT, ()=>{
      console.log('running on port: ',PORT)
    })
  }  
})