const router = require("express").Router()
const seriesRouter = require('./series')

router.get('/home',(request,response,next) => {
  response.json('sukses')
})
router.use('/series',seriesRouter)

module.exports = router
