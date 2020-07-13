const BaseRoute = require('./BaseRoute');
const AuthController = require('@controller/v1/xhr/admin/AuthController.js');
module.exports = BaseRoute.extend({
  baseRoute : '/api/v1',
  onready : function(){
    this.get('/display-routes','api.display.route',this.displayRoute.bind(this));
    this.post('/auth/login','api.admin.auth.login',(AuthController.create()).apiLogin);
    this.post('/auth/register','api.admin.auth.register',(AuthController.create()).register);
    this.get('/auth/logout','api.admin.auth.logout',(AuthController.create()).logout);
  }
})