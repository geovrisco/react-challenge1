const {getDatabase} = require("../config/mongo")
const db = getDatabase()
const Series = db.collection('TvSeries')
const ObjectId = require('mongodb').ObjectId

class SeriesModel {
  static find(){
    return Series.find().toArray()
  }

  static findById(id){
    return Series.findOne({_id: ObjectId(id)})
  }

  static create(newSeries){
    return Series.insertOne(newSeries)
  }

  static updateById(id,updated){
    return Series.updateOne(
      { _id : ObjectId(id)},
      {$set : updated}
    )
  }

  static deleteById(id){
    return Series.deleteOne(
      {_id: ObjectId(id)}
    )
  }

}

module.exports = SeriesModel