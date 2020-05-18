const axios = require('axios')
const Redis = require('ioredis')
const {request} = require('graphql-request')
const redis = new Redis()
const {
  getMovieQuery,
  getSeriesQuery,
} = require('./queries')

const resolvers = {
  Query: {
    getEntertainment: async ()=> {
      try{
        let entertainData = await redis.get('entertainData')
        if (entertainData){
          console.log('valid')
          return JSON.parse(entertainData)
        }else{
          console.log('invalid')
          const movieData = await request('http://localhost:4002/graphql',getMovieQuery)
          const seriesData = await request('http://localhost:4001/graphql',getSeriesQuery)
          const movieSeries = movieData.getMovies.concat(seriesData.getSeries)
          console.log(movieSeries)
          await redis.set('entertainData', JSON.stringify(movieSeries))
          return movieSeries
        }
      }
      catch(error){
        console.log(error)
      }
    },

    getShow: async (_, args) => {
      const getSingleShow = `
      {
        getShow(
          _id:"${args._id}"
        ){
          title
          overview
          popularity
          tags
          poster_path
          _id
        }
      }
      `
      try{
        const seriesData = await request('http://localhost:4001/graphql',getSingleShow)
        console.log(seriesData)

        return seriesData.getShow
      } catch (err) {
        console.log(err)
      }
    },

    getMovie: async (_, args) => {
      const getSingleShow = `
      {
        getMovie(
          _id:"${args._id}"
        ){
          title
          overview
          popularity
          tags
          poster_path
          _id
        }
      }
      `
      try{
        const seriesData = await request('http://localhost:4002/graphql',getSingleShow)
        console.log(seriesData)

        return seriesData.getMovie
      } catch (err) {
        console.log(err)
      }
    },
    
  },

  Mutation:{
    addMovie: async (_,args) => {
      
      try {
        const addMovieQ= `
        mutation {
          addMovie(
            title: "${args.title}",
            overview: "${args.overview}",
            popularity: ${args.popularity},
            poster_path: "${args.poster_path}",
            tags: ["${args.tags.join('","')}"],
          ){
            title
            overview
            popularity
            poster_path
            tags
            _id
          }
        }
        `
        console.log(addMovieQ)
        const data = await request('http://localhost:4002/graphql',addMovieQ)
        await redis.del('entertainData')
        // console.log(data)
        return data.addMovie


      } catch (error) {
        console.log(error.response.errors,'ini eror tai')
      }
    },
    updateMovie: async (_,args)=> {
      try{
        const editQuery= `
        mutation {
          updateMovie(
            _id:"${args._id}",
            title: "${args.title}",
            overview: "${args.overview}",
            popularity: ${args.popularity},
            poster_path: "${args.poster_path}",
            tags: ["${args.tags.join('","')}"],
          ){
            message
          }
        }
        `
        const data = await request('http://localhost:4002/graphql',editQuery)
        await redis.del('entertainData')
        if(data.updateMovie){
          throw(data.updateMovie)
        }else{
          let message='data succesfully update'
          return  {message:message}
        }

      }
      catch(err){
        console.log(err)
        return err
      }
    },
    deleteMovie: async (_,args)=> {
      try {
        const deleteD= `
        mutation {
          deleteMovie(
            _id:"${args._id}",
          ){
            message
          }
        }
        `
        const data = await request('http://localhost:4002/graphql',deleteD)
        console.log(data)

        if(data.deleteMovie){
          throw (data.deleteMovie)
        }else{
          await redis.del('entertainData')
          let message='succesfully delete data'
          // console.log(data,'ini dari ')
          return {message}
        }

      } catch (error) {
      return (error)
      }
    },

    addShow: async (_,args) => {
      
      try {
        const addSeriesQ= `
        mutation {
          addSeries(
            title: "${args.title}",
            overview: "${args.overview}",
            popularity: ${args.popularity},
            poster_path: "${args.poster_path}",
            tags: ["${args.tags.join('","')}"],
          ){
            title
            overview
            popularity
            poster_path
            tags
            _id
          }
        }
        `
        // console.log(addSeriesQ)
        const data = await request('http://localhost:4001/graphql',addSeriesQ)
        await redis.del('entertainData')
        console.log(data)
        return data.addSeries


      } catch (error) {
        console.log(error.response.errors)
      }
    },
    
    updateShow: async (_,args)=> {
      try{
        const editQuery= `
        mutation {
          updateSeries(
            _id:"${args._id}",
            title: "${args.title}",
            overview: "${args.overview}",
            popularity: ${args.popularity},
            poster_path: "${args.poster_path}",
            tags: ["${args.tags.join('","')}"],
          ){
            message
          }
        }
        `
        const data = await request('http://localhost:4001/graphql',editQuery)
        await redis.del('entertainData')
        console.log(data)
        if(data.updateSeries){
          throw(data.updateSeries)
        }else{
          let message='data succesfully update'
          return  {message:message}
        }

      }
      catch(err){
        console.log(err)
        return err
      }
    },

    deleteShow: async (_,args)=> {
      try {
        const deleteD= `
        mutation {
          deleteSeries(
            _id:"${args._id}",
          ){
            message
          }
        }
        `
        const data = await request('http://localhost:4001/graphql',deleteD)
        console.log(data)

        if(data.deleteSeries){
          throw (data.deleteSeries)
        }else{
          await redis.del('entertainData')
          let message='succesfully delete data'
          // console.log(data,'ini dari ')
          return {message}
        }

      } catch (error) {
      return (error)
      }
    },

    

  }
}

module.exports = resolvers