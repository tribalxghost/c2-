

const ExpressError = require("../expressError.js")


function authenticateJWT(req, res, next) {
    try {
      const tokenFromBody = req.body._token;
        console.log("Authenticated")
      return next();
    } catch (err) {
      // error in this middleware isn't error -- continue on
      return next();
    }
  }



  function ensureLoggedIn(req, res, next){
    console.log(req.body.username)
    if(!req.body.username){
        const e = new ExpressError("Please login first!", 401)
        
    }else{
        
       return next() 
    }
  }

  module.exports = { authenticateJWT, ensureLoggedIn };