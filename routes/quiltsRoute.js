const routes = require('express').Router();
const quiltsController = require('../controllers/quiltsController');
const utilities = require('../utilities');
const { authenticateToken } = require('../utilities');

//Get quilts routes
routes.get('/quilts/', utilities.handleErrors(quiltsController.getQuilts));
routes.get('/quilts/:id', utilities.handleErrors(quiltsController.getSingleQuiltById));
//Accesss protected quilter route
routes.post('/quilts/', authenticateToken, quiltsController.createQuilt);
routes.put('/quilts/:id', authenticateToken, quiltsController.updateQuilt);
routes.delete('/quilts/:id', authenticateToken, utilities.handleErrors(quiltsController.deleteQuilt));

//Get quilters routes
routes.get('/quilters/', utilities.handleErrors(quiltsController.getQuilters));
routes.get('/quilters/:id', utilities.handleErrors(quiltsController.getSingleQuilterById));
//Accesss protected quilter route
routes.post('/quilters/', authenticateToken, quiltsController.createQuilter);
routes.put('/quilters/:id', authenticateToken, quiltsController.updateQuilter);
routes.delete('/quilters/:id', authenticateToken, utilities.handleErrors(quiltsController.deleteQuilter));





module.exports = routes;