const BaseService = require('../BaseService.js');
const UserApp = require('@app/User.js');

module.exports = BaseService.extend({
  returnUserApp : function(){
    return UserApp.create();
  },
  getUsers : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        take : 'required',
        page : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          let UserApp = self.returnValidator();
          if(props.page == 1){
            props.page = 0;
          }
          let resData = await UserApp.get({
            offset : props.take * props.page,
            limit : props.take
          })
          return resData;
        case validator.fails:
          throw new CustomError("error.user.add",JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  },
  getUser : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          let UserApp = self.returnUserApp();
          let resData = await UserApp.first({
            where : props
          })
          return resData;
        case validator.fails:
          throw new CustomError("error.user.add",JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  },
  addUser : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        first_name : 'required',
        email : 'required|email',
      });
      switch(await validator.check()){
        case validator.passes:
          validator = self.returnValidator(props,{
            password : 'required|min:8',
            password_confirm : 'required|same:password'
          });
          switch(await validator.check()){
            case validator.passes:
              props.password = await GAuth.generatePassword(props.password);
            break;
          }
          let UserApp = this.returnUserApp();
          UserApp = await UserApp.first({
            email : props.email
          });
          if(UserApp != null){
            throw new CustomError("error.user.exist","This email "+props.email+" is not available!");
          }
          UserApp = this.returnUserApp();
          let resData = await UserApp.save(props);
          return resData;
        case validator.fails:
          throw new CustomError("error.user.add",JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  },
  updateUser : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        first_name : 'required',
        email : 'required|email',
      });
      switch(await validator.check()){
        case validator.passes:
          break;
        case validator.fails:
          throw new CustomError("error.user.update",JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  },
  deleteUser : async function(ids){
    let self = this;
    try{
      let validator = self.returnValidator({ids},{
        ids : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          ids = JSON.parse(ids);

          break;
        case validator.fails:
          throw new CustomError("error.user.delete",JSON.stringify(validator.errors.errors));
      }
    }catch(ex){
      throw ex;
    }
  }
})