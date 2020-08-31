const AuthController = require("../admin/AuthController");
const Auth = require("../../../../services/member/AuthService");

module.exports = AuthController.extend({
  returnAuthMainService : function(){
    return Auth.create();
  },
})