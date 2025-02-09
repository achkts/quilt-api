const routes = require('express').Router();
const quiltsController = require('../controllers/quiltsController');

routes.get('/quilts/', quiltsController.getQuilts);
routes.get('/quilts/:id', quiltsController.getSingleQuiltById);

routes.post('/quilts/', quiltsController.createQuilt);
routes.put('/quilts/:id', quiltsController.updateQuilt);
routes.delete('/quilts/:id', quiltsController.deleteQuilt);


module.exports = routes;