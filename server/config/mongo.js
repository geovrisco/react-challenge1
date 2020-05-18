const MongoCLient = require('mongodb').MongoClient
const uri = "mongodb://localhost:27017"
const dbName = "native-fox-entertainMe"
const client = new MongoCLient(uri,{useUnifiedTopology:true})
var db;

function connect(cb){
  client.connect((err) => {

    if(err){
      console.log('connection error : ',err)
    } else {
      db = client.db(dbName)
    }

    cb(err)

  })
}

function getDatabase(){
  return db
}

module.exports = {
  connect, getDatabase
}