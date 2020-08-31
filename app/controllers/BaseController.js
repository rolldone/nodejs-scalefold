const Proto = require('uberproto');
let { SerializeError } = require('@tool');

module.exports = Proto.extend({
  __init : 'construct',
  construct : function(){
    let self = this;
    try{
      for(var key in self){
        switch(Object.prototype.toString.call(self[key])){
          case '[object String]':
          case '[object Number]':
          case '[object Object]':
              break;
          default:
            self[key] = self[key].bind(self);
            break;
        } 
      }
    }catch(ex){
      console.error('----------------------------------------------------------------------------------------------------------'); 
      console.error('error.binding_controller','=>','Maybe you want binding, but this method "'+key+'" is not a function!');
      console.error('----------------------------------------------------------------------------------------------------------'); 
      console.error(ex);
    }
  },
  /* Todo something here */
  responseErrorStatus : function(ex,res){
    return res.status(400).send({
      status : 'error',
      status_code : 400,
      return : SerializeError(ex)
    })
  },
  getBaseQuery : function(req){
    return {
      take : req.query.take||20,
      page : req.query.page||0,
      search : req.query.search||null,
    }
  }
});