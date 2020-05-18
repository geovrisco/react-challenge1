const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

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
          const movieData = await axios.get('Http://localhost:3000/movie/')
          const seriesData = await axios.get('Http://localhost:3001/series/')
          let movieSeries = movieData.data.concat(seriesData.data)
          await redis.set('entertainData', JSON.stringify(movieSeries))
          return movieSeries
        }
      }
      catch(error){
        console.log(error)
      }
    }
  },

  Mutation:{
    addMovie: async (_,args) => {
      try {
        const newMovie = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        // console.log(newMovie)

        const {data} = await axios.post('Http://localhost:3000/movie/', newMovie)
        await redis.del('entertainData')
        console.log(data.ops)
        return data.ops[0]


      } catch (error) {
        console.log(error)
      }
    },
    updateMovie: async (_,args)=> {
      try{
        const newMovie = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        const {data} = await axios.put(`Http://localhost:3000/movie/${args._id}`,newMovie)
        await redis.del('entertainData')
        // console.log(data)
        let message='data succesfully update'
        return  {message:message}

      }
      catch(err){
        console.log(err)
      }
    },
    deleteMovie: async (_,args)=> {
      try {
        const {data} = await axios.delete(`Http://localhost:3000/movie/${args._id}`)
        await redis.del('entertainData')
        let message='succesfully delete data'
        // console.log(data,'ini dari ')
        return {message}
      } catch (error) {
        console.log(error.response,'ini error')
        let message=`error code : ${error.response.status}, ${error.response.statusText}`
        return {message}
      }
    },


    addShow: async (_,args) => {
      try {
        const newShow = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        // console.log(newMovie)

        const {data} = await axios.post('Http://localhost:3001/series/', newShow)
        await redis.del('entertainData')
        console.log(data.ops)
        return data.ops[0]


      } catch (error) {
        console.log(error)
      }
    },
    updateShow: async (_,args)=> {
      try{
        const newShow = {
          title:args.title,
          overview: args.overview,
          popularity: args.popularity,
          poster_path:args.poster_path,
          tags:args.tags
        }
        const {data} = await axios.put(`Http://localhost:3001/series/${args._id}`,newShow)
        await redis.del('entertainData')
        // console.log(data)
        let message='data succesfully update'
        return  {message:message}

      }
      catch(err){
        console.log(err)
      }
    },
    deleteShow: async (_,args)=> {
      try {
        const {data} = await axios.delete(`Http://localhost:3001/series/${args._id}`)
        await redis.del('entertainData')
        let message='succesfully delete data'
        // console.log(data,'ini dari ')
        return {message}
      } catch (error) {
        console.log(error.response,'ini error')
        let message=`error code : ${error.response.status}, ${error.response.statusText}`
        return {message}
      }
    }




    

  }
}

module.exports = resolvers