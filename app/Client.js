const BaseApp = require("./BaseApp");
const {Client} = require('@model');
module.exports = BaseApp.extend({
  model : Client,
  excludes : ['password','remember_token']
})