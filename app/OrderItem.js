const BaseApp = require("./BaseApp");
const { OrderItem } = require('@model');

module.exports = BaseApp.extend({
  model : OrderItem
})