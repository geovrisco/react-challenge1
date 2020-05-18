const movieRouter = require('express').Router()
const movieController = require('../controllers/movie')

movieRouter.get('/', movieController.find)
movieRouter.get('/:id',movieController.findById)
movieRouter.post('/',movieController.create)
movieRouter.put('/:id',movieController.update)
movieRouter.delete('/:id',movieController.delete)


module.exports = movieRouter