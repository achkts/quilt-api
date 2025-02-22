const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const dotenv = require('dotenv');
dotenv.config();


const app = express();

const quiltsRoute = require('./routes/quiltsRoute');
const authRoutes = require('./routes/authRoutes');

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

  .use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
  .use(passport.initialize())
  .use(passport.session())

  .use('/', quiltsRoute)
  .use('/', authRoutes);


//swagger docs
app.get('/', function(req, res, next) {
  res.redirect('/api-docs')
});

app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

app.use(async (err, req, res, next) => {
  
  let message = '';
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.status(err.status || 500).json({
    message: message
  })
})
