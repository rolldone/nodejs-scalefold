const AuthMain = require('../main/Auth.js');
const ClientApp = require('@app/Client.js');

module.exports = AuthMain.extend({
  returnUserApp : function(){
    return ClientApp.create();
	},
})