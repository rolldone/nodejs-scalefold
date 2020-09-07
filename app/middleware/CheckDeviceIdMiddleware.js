const BaseMiddleware = require("./BaseMiddleware");
module.exports = BaseMiddleware.extend({
  action : async function(req,res,next){
    let self = this;
    try{
      GAuth.setDefaultRequest(req);
      let device = await GAuth.getDeviceID();
      if(device == null){
        throw new CustomError('error.device_not_found_exception','Device identity not found, Register your device first!')    
      }
      next();
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  }
})