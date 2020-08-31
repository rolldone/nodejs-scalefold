const AuthMain = require('../main/AuthService.js');
const Client = require('@app/Client.js');

module.exports = AuthMain.extend({
  returnUserApp : function(){
    return Client.create();
	},
})