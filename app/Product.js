const BaseApp = require("./BaseApp");
const { Product } = require('@model');

module.exports = BaseApp.extend({
  model : Product
})