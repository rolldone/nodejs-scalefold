const BaseService = require("../BaseService");
const Schedule = require("../../Schedule");

module.exports = BaseService.extend({
  returnScheduleApp : function(){
    return Schedule.create();
  },
  getSchedules : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        take : 'required',
        page : 'required',
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      let scheduleapp = self.returnScheduleApp();
      let resData = await scheduleapp.get({
        offset : props.take * props.page,
        limit : props.take,
        include: [{
          model: self.returnClientApp().model,
          as: 'client_app',
          where : {
            user_id : props.user_id
          }
        }],
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getSchedule : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      let scheduleapp = self.returnScheduleApp();
      let resData = await scheduleapp.get({
        where : {
          id : props.id
        },
        include: [{
          model: self.returnClientApp().model,
          as: 'client_app',
          where : {
            user_id : props.user_id
          }
        }],
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addSchedule : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        name : 'required',
        app_id : 'required',
        key : 'required',
        description : 'required',
        status : 'required',
        limit : 'required',
        date : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      let scheduleapp = self.returnScheduleApp();
      let resData = await scheduleapp.save(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateSchedule : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        name : 'required',
        app_id : 'required',
        key : 'required',
        description : 'required',
        status : 'required',
        limit : 'required',
        date : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      let scheduleapp = self.returnScheduleApp();
      let resData = await scheduleapp.update(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteSchedule : async function(ids){
    let self = this;
    try{
      let validator = self.returnValidator({ids},{
        ids : 'required',
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validation",JSON.stringify(validator.errors.errors));
      }
      ids = JSON.parse(ids);
      let scheduleapp = self.returnScheduleApp();
      let resData = scheduleapp.delete({
        where : {
          id : ids,
        },
        include: [{
          model: self.returnClientApp().model,
          as: 'client_app',
          where : {
            user_id : props.user_id
          }
        }],
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})