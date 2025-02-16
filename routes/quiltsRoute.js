const routes = require('express').Router();
const quiltsController = require('../controllers/quiltsController');
const utilities = require('../utilities');

routes.get('/quilts/', utilities.handleErrors(quiltsController.getQuilts));
routes.get('/quilts/:id', utilities.handleErrors(quiltsController.getSingleQuiltById));

routes.post('/quilts/', quiltsController.createQuilt);
routes.put('/quilts/:id', quiltsController.updateQuilt);
routes.delete('/quilts/:id', utilities.handleErrors(quiltsController.deleteQuilt));


module.exports = routes;