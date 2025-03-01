const routes = require('express').Router();
const quiltsController = require('../controllers/quiltsController');
const utilities = require('../utilities');
const { authenticateToken } = require('../utilities');

//Get quilts routes
routes.get('/quilts/', utilities.handleErrors(quiltsController.getQuilts));
routes.get('/quilts/:id', utilities.handleErrors(quiltsController.getSingleQuiltById));


routes.post('/quilts/', authenticateToken, quiltsController.createQuilt);
routes.put('/quilts/:id', authenticateToken, quiltsController.updateQuilt);
routes.delete('/quilts/:id', authenticateToken, utilities.handleErrors(quiltsController.deleteQuilt));

//Get quilters routes
routes.get('/quilters/', utilities.handleErrors(quiltsController.getQuilters));




module.exports = routes;