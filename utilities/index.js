const Util = {}
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

Util.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
   
    const token = authHeader && authHeader.split(' ')[1];
  
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
       console.log('error status', err)
      if (err) return res.sendStatus(403);
      
      
      req.user = user;
      next();
    });
  }
  


module.exports = Util