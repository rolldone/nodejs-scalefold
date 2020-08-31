const BaseService = require("../BaseService");
const Job = require("../../Job");
const ClientApp = require("../../ClientApp");

module.exports = BaseService.extend({
  returnJobApp : function(){
    return Job.create();
  },
  returnClientApp : function(){
    return ClientApp.create();
  },
  getJobs : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        take : 'required',
        page : 'required',
        user_id : 'required'
      }) ;
      switch(await validator.check()){
        case validator.fails :
          throw CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let jobapp = self.returnJobApp();
      let resData = await jobapp.get({
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
  getJob : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        user_id : 'required'
      }) ;
      switch(await validator.check()){
        case validator.fails :
          throw CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let jobapp = self.returnJobApp();
      let resData = await jobapp.first({
        where : {
          id : props.id,
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
  addJob : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        name : 'required',
        app_id : 'required',
        key : 'required',
        status : 'required',
        limit : 'required',
        delay : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validator",JSON.stringify(validator.errors.errors));
      }
      let job = self.returnJobApp();
      let resData = await job.save(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateJob : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        name : 'required',
        app_id : 'required',
        key : 'required',
        status : 'required',
        limit : 'required',
        delay : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validator",JSON.stringify(validator.errors.errors));
      }
      let job = self.returnJobApp();
      let resData = await job.update(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteJob : async function(ids){
    let self = this;
    try{
      let validator = self.returnValidator({
        ids
      },{
        ids : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError("error.validator",JSON.stringify(validator.errors.errors));
      }
      ids = JSON.parse(ids);
      let job = self.returnJobApp();
      let resData = await job.delete({
        where : {
          id : ids
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