const BaseApp = require("./BaseApp");
const { User } = require('@model');
module.exports = BaseApp.extend({
  model : User,
  excludes : ['password','remember_token']
})