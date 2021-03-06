const BaseMiddleware = require("./BaseMiddleware");
const DeviceService = require("../services/main/DeviceService");
module.exports = BaseMiddleware.extend({
  action : async function(req,res,next){
    let self = this;
    try{
      switch (true) {
        case req.xhr:
          next();
          break;
        default:
          let device = DeviceService.create();
          let resData = await device.getDeviceByDeviceID(req.sessionID)
          if(resData == null){
            await device.addDevice({
              browser_type : req.headers['user-agent'],
              ip_address : req.header('x-forwarded-for') || req.connection.remoteAddress,
              status : device.status.NEW,
              device_id : req.sessionID
            });
          }
          next();
          break;
      }
    }catch(ex){
      console.error('DeviceRegisterMiddleware - ex ',ex);
      // eturn self.responseErrorStatus(ex,res);
    }
  }
})