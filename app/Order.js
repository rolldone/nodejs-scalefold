const BaseApp = require("./BaseApp");
const { Order } = require('@model');

module.exports = BaseApp.extend({
  model : Order
})