const {getDatabase} = require("../config/mongo")
const db = getDatabase()
const Series = db.collection('TvSeries')
const {ObjectId} = require('mongodb')

const resolvers = {
  Query: {
    getSeries: ()=>{
      return Series.find().toArray()
      .then(results => {
        return results
      })
      .catch(err => {
        return err
      })
    
    },

    getShow: (_,args) => {
        return Series.findOne({_id: ObjectId(args._id)})
        .then(result => {
          if(result){
            return result
          }else {
            throw ({message:'Code : 404. data not found'})
          }
        })
        .catch(err=>{
          return err
        })
    }

  },

  Mutation: {
    addSeries: (_,args) => {
        const newSeries = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        return Series.insertOne(newSeries)
        .then(data => {
          return data.ops[0]
        })
        .catch(err=>{
          return err
        })

    },

    updateSeries: (_,args) => {
        const newSeries = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }

        return Series.updateOne(
          {_id:ObjectId(args._id)},
          {$set : newSeries}
        ).then(result=>{
          if(result.matchedCount>0){
            let message =`succesfully update series ${args.title}`
            return {message}
          } else {
            throw ({message:'Code : 404. data not found'})
          }
        })
        .catch(err => {
          return err
        })
      
    },

    deleteSeries:  (_,args)=> {
        return Series.deleteOne( {_id:ObjectId(args._id)} )
        .then(result=>{
          // console.log(result.deleted)
          if(result.deletedCount<1){
            throw ({message:'Code : 404. data not found'})
          }else{
            message='Succesfull delete data'
            return {message}
          }
        }).catch(err=> {
          return err
        })
    }

  }
}

module.exports = resolvers