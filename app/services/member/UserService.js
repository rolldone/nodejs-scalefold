const UserMain = require('../main/UserService.js');
const Client = require('@app/Client.js');

module.exports = UserMain.extend({
  returnUserApp : function(){
    return Client.create();
  }
})