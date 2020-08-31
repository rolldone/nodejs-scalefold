const BaseController = require('@app/controllers/BaseController.js');

module.exports = BaseController.extend({
  action : function(req,res,next){
    console.log('BaseMiddleware - Override this function');
    next();
  },
  setValue : function(...props){
    let self = this;
    return self.action.bind(self,...props);
    /* Or be like this */
    return function(req,res,next){
      return self.action(...props,req,res,next);
    }
  }
})