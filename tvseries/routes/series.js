const seriesRouter = require('express').Router()
const seriesController = require('../controllers/series')

seriesRouter.get('/', seriesController.find)
seriesRouter.get('/:id',seriesController.findById)
seriesRouter.post('/',seriesController.create)
seriesRouter.put('/:id',seriesController.update)
seriesRouter.delete('/:id',seriesController.delete)


module.exports = seriesRouter