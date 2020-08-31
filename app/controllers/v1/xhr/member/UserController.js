const UserController = require("../admin/UserController");
const User = require("../../../../services/member/UserService");

module.exports = UserController.extend({
  returnUser : function(){
    return User.create();
  },
})