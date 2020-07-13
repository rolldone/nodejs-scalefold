const Proto = require('uberproto');
const Validator = require('validatorjs');

module.exports = Proto.extend({
  __init : 'construct',
  construct : function(data,rules){
    let self = this;
    self.validator = new Validator(data,rules);
  },
  setAttributeNames: function(props){
    let self = this;
    self.validator.setAttributeNames(props);
  },
  check : function(){
    let self = this;
    return new Promise(function(resolve){
      var passes = function(){
        self.passes = true;
        resolve(true);
      }
      var fails = function(){
        self.fails = true;
        self.errors = self.validator.errors;
        resolve(true);
      }
      self.validator.checkAsync(passes,fails);
    });
  },
  passes : false,
  fails : false,
  errors : null,
})
