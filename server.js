const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const dotenv = require('dotenv');
dotenv.config();


const app = express();
const quiltsRoute = require('./routes/quiltsRoute');


const port = process.env.PORT
const host = process.env.HOST


app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

  .use('/', quiltsRoute);



