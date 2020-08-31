const BaseApp = require("./BaseApp");
const { QueueRecord } = require('@model');
module.exports = BaseApp.extend({
  model : QueueRecord
})