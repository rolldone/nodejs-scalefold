const ClientAppService = require("../main/ClientAppService");

module.exports = ClientAppService.extend({
  getClientApps : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  getClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  addClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  updateClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  deleteClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  }
})