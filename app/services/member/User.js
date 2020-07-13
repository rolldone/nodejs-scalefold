const UserMain = require('../main/User.js');
const ClientApp = require('@app/Client.js');

module.exports = UserMain.extend({
  returnUserApp : function(){
    return ClientApp.create();
  }
})