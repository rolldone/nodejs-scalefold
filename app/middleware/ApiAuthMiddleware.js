const BaseMiddleware = require("./BaseMiddleware");

module.exports = BaseMiddleware.extend({
  action : async function(guard,req,res,next){
    let self = this;
    let user = null;
    try{
      user = await GAuth.getSelectAuth(guard,req);
      if(user == null){
        throw new CustomError("error.authentication","You are not authenticated!");
      }
      next();
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  }
})