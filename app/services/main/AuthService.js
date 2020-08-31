const BaseService = require('../BaseService.js');
const User = require('../../User.js');

module.exports = BaseService.extend({
  returnUserApp : function(){
    return User.create();
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
          let user = self.returnUserApp();
          user.includes = ['password'];
          user = await user.first({
            where : { email : props.email },
          });
          if(user == null){
            throw new CustomError("error.authentication_exception","Email or Password is not match!");
          }
          let resData = await GAuth.checkPassword(props.password,user.password);
          if(resData == false){
            throw new CustomError("error.authentication_exception","Email or Password is not match!");
          }
          let token = GAuth.generateToken({
            id : user.id,
            email : user.email,

          })
          return token;
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
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
        email : 'required|email',
        password : 'required|min:8',
        password_confirm : 'required|same:password'
      });
      switch(await validator.check()){
        case validator.passes:
          let UserApp = this.returnUserApp();
          props.password = await GAuth.generatePassword(props.password,function(error){
            throw new Error(error);
          });
          let resData = await UserApp.save(props);
          return resData;
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  },
  logout : function(){}
})