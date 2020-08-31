const BaseMiddleware = require("./BaseMiddleware");

module.exports = BaseMiddleware.extend({
  action : async function(guard,req,res,next){
    await GAuth.setDefaultGuard(guard,req);
    next();
  }
})