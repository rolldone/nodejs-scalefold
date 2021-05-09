const AuthMain = require('../main/AuthService.js');
const Client = require('@app/Client.js');
const config = require('@config');

module.exports = AuthMain.extend({
  getAuthConfig : function(){
    return config.auth.guard.member_api;
  },
  returnUserApp : function(){
    return Client.create();
	},
})