const BaseRoute = require('./BaseRoute');
const HomeController = require('@controller/v1/front/HomeController.js');
const {DeviceRegisterMiddleware} = require('@middleware')
module.exports = BaseRoute.extend({
  baseRoute : '',
  onready : function(){
    let self = this;
    self.use('/',[(DeviceRegisterMiddleware.create()).action],function(route){
      route.get('','front.index',[],(HomeController.create()).index);
    });
  }
})