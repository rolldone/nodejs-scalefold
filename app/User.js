const BaseApp = require("./BaseApp");
const User = require('@model/user.js');
module.exports = BaseApp.extend({
  model : User
})