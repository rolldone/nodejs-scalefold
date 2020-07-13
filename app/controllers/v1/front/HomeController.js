const BaseController = require('../../BaseController');

module.exports = BaseController.extend({
  index : function(req,res){
    res.send('Welcome to my world - '+req.session.id);
  }
})