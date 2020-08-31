const BaseApp = require('./BaseApp');
const { client_app } = require('@model');

module.exports = BaseApp.extend({
  model : client_app
})