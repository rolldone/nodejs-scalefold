const BaseApp = require("./BaseApp");
const { Cart } = require('@model');
module.exports = BaseApp.extend({
  model : Cart
})