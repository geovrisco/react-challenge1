const {getDatabase} = require("../config/mongo")
const db = getDatabase()
const Movie = db.collection('Movies')
const ObjectId = require('mongodb').ObjectId

class MovieModel {
  static find(){
    return Movie.find().toArray()
  }

  static findById(id){
    return Movie.findOne({_id: ObjectId(id)})
  }

  static create(newMovie){
    return Movie.insertOne(newMovie)
  }

  static updateById(id,updated){
    return Movie.updateOne(
      { _id : ObjectId(id)},
      {$set : updated}
    )
  }

  static deleteById(id){
    return Movie.deleteOne(
      {_id: ObjectId(id)}
    )
  }

}

module.exports = MovieModel