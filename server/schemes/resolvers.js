const {getDatabase} = require("../config/mongo")
const db = getDatabase()
const Movie = db.collection('Movies')
const {ObjectId} = require('mongodb')

const resolvers = {
  Query: {
    getMovies: ()=>{
      return Movie.find().toArray()
      .then(results => {
        return results
      })
      .catch(err => {
        return err
      })
    
    },

    getMovie: (_,args) => {
        return Movie.findOne({_id: ObjectId(args._id)})
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
    addMovie: (_,args) => {
        const newMovie = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        return Movie.insertOne(newMovie)
        .then(data => {
          return data.ops[0]
        })
        .catch(err=>{
          return err
        })

    },

    updateMovie: (_,args) => {
        const newMovie = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }

        return Movie.updateOne(
          {_id:ObjectId(args._id)},
          {$set : newMovie}
        ).then(result=>{
          console.log(result.matchedCount)
          if(result.matchedCount>0){
            let message =`succesfully update movie: ${args.title}`
            return {message}
          } else {
            throw ({message:'Code : 404. data not found'})
          }
        })
        .catch(err => {
          return err
        })
      
    },

    deleteMovie:  (_,args)=> {
        return Movie.deleteOne( {_id:ObjectId(args._id)} )
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