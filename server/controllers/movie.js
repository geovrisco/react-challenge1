const Movie = require('../models/movie')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static find (request,response,next){
    Movie.find()
    .then(result => {
      response.json(result)
    })
    .catch(error=> {
      console.log(error)
      response.status(400).json(error)
    })
  }

  static findById (request,response,next){
    // console.log(request.params.id,'ini params')
    Movie.findById(request.params.id)
    .then(result => {
      if(!result){
        console.log('masuk sini')
        throw({status:404,msg:'Movie Not Found'})
      }else{
        response.json(result)
      }
    })
    .catch(err=>{
      if(err){
        next(err)
      }else{
        next({status:500,msg:'internal server error'})
      }
    })
  }

  static create(request,response,next){
    let newMovie={
      title:request.body.title,
      overview:request.body.overview,
      poster_path:request.body.poster_path,
      popularity:request.body.popularity,
      tags:request.body.tags
    }
    Movie.create(newMovie)
    .then(result=>{
      redis.del('lockdownList')
      response.json(result)
    })
    .catch(err=>{
      if(err.code===121){
        next({
          status:400,
          msg:'Validation Error!'
        })
      }
    })
  }

  static update(request,response,next){
    let newMovie={
      title:request.body.title,
      overview:request.body.overview,
      poster_path:request.body.poster_path,
      popularity:request.body.popularity,
      tags:request.body.tags
    }
    Movie.updateById(request.params.id, newMovie)
    .then(result=>{
      redis.del('lockdownList')
      response.json(result)
    })
    .catch(err=>{
      response.json(err)
    })
  }

  static delete(request,response,next){
    Movie.findById(request.params.id)
    .then(data=>{
      if(data){
        redis.del('lockdownList')
        return Movie.deleteById(request.params.id)
      }else{
        throw ({status:404,msg:'data not found!'})
      }
    })
    .then(result=>{
      response.json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = MovieController