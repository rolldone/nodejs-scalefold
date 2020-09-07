const BaseApp = require("./BaseApp");
const { ProductItem } = require('@model');

module.exports = BaseApp.extend({
  model : ProductItem
})