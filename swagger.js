const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();
// const port = process.env.PORT
// const host = process.env.HOST

const doc = {
  info: {
    title: 'Quilt API',
    description: 'API for Quilt',
  },
  // host: `${host}:${port}`,
  host: 'quilt-api.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const routes = ['./routes/quiltsRoute.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
console.log('Generating Swagger API documentation');
swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./server.js')    
});