const BaseController = require('@app/controllers/BaseController.js');

module.exports = BaseController.extend({
  action : function(req,res,next){
    console.log('BaseMiddleware - Override this function');
    next();
  }
})