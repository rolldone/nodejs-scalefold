const BaseService = require('../BaseService.js');
const UserApp = require('@app/User.js');
module.exports = BaseService.extend({
  returnUserApp : function(){
    return UserApp.create();
  },
  basicLogin : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        email : 'required|email',
        password : 'required'
      })
      switch(await validator.check()){
        case validator.passes:
          
          break;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  apiLogin : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        email : 'required|email',
        password : 'required'
      })
      switch(await validator.check()){
        case validator.passes:
          
          break;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  register : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        first_name : 'required',
        email : 'required|emmail',
        password : 'required|min:8',
        password_confirm : 'required|same:password'
      });
      switch(await validator.check()){
        case validator.passes:
          break;
        case validator.fails:
          break;
      }
    }catch(ex){
      throw ex;
    }
  },
  logout : function(){

  }
})