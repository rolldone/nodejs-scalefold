const BaseService = require('../BaseService.js');
const UserApp = require('@app/User.js');

module.exports = BaseService.extend({
  returnUserApp : function(){
    return UserApp.create();
  }
})