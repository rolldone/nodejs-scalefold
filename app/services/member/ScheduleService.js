const ScheduleService = require("../main/ScheduleService");

module.exports = ScheduleService.extend({
  getSchedules : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  getSchedule : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
})