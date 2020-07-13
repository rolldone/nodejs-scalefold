const Proto = require('uberproto');
let { SerializeError } = require('@tool');

module.exports = Proto.extend({
  /* Todo something here */
  responseErrorStatus : function(ex,res){
    return res.status(400).send({
      status : 'error',
      status_code : 400,
      return : SerializeError(ex)
    })
  }
});