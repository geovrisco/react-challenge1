const router = require("express").Router()
const movieRouter = require('./movies')

router.get('/home',(request,response,next) => {
  response.json('sukses')
})
router.use('/movie',movieRouter)

module.exports = router
