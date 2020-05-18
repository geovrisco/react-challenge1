const Series = require('../models/tvSeries')
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {
  static find (request,response,next){
    Series.find()
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
    Series.findById(request.params.id)
    .then(result => {
      if(!result){
        console.log('masuk sini')
        throw({status:404,msg:'Series Not Found'})
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
    let newSeries={
      title:request.body.title,
      overview:request.body.overview,
      poster_path:request.body.poster_path,
      popularity:request.body.popularity,
      tags:request.body.tags
    }
    Series.create(newSeries)
    .then(result=>{
      response.json(result)
      redis.del('lockdownList')
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
    let newSeries={
      title:request.body.title,
      overview:request.body.overview,
      poster_path:request.body.poster_path,
      popularity:request.body.popularity,
      tags:request.body.tags
    }
    Series.updateById(request.params.id, newSeries)
    .then(result=>{
      response.json(result)
      redis.del('lockdownList')
    })
    .catch(err=>{
      response.json(err)
    })
  }

  static delete(request,response,next){
    Series.findById(request.params.id)
    .then(data=>{
      if(data){
        return Series.deleteById(request.params.id)
      }else{
        throw ({status:404,msg:'data not found!'})
      }
    })
    .then(result=>{
      redis.del('lockdownList')
      response.json(result)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = SeriesController