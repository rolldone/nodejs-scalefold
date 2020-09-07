const AuthController = require("../admin/AuthController");
const Auth = require("../../../../services/member/AuthService");

module.exports = AuthController.extend({
  returnAuthMainService : function(){
    return Auth.create();
  },
  registerDeviceID : async function(req,res){
    let self = this;
    let resData = await (async function(){
      let res = {
        status : 'success',
        status_code : 200,
        return : await GAuth.setDeviceID(req)
      }
      return res;
    })()
    return res.status(resData.status_code).send(resData);
  }
})