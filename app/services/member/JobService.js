const JobService = require("../main/JobService");

module.exports = JobService.extend({
  getJobs : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      }) ;
      switch(await validator.check()){
        case validator.fails :
          throw CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  getJob : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      }) ;
      switch(await validator.check()){
        case validator.fails :
          throw CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  }
})