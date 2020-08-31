const BaseService = require("../BaseService");
const ClientApp = require('../../ClientApp.js');
const BusParam = require("../../BusParam");
module.exports = BaseService.extend({
  returnClientApp : function(){
    return ClientApp.create();
  },
  returnBusParam : function(){
    return BusParam.create();
  },
  getClientApps : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        take : 'required',
        page : 'required',
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.get({
        offset : props.take * props.page,
        limit : props.take,
        where : {
          user_id : props.user_id
        },
        include: [{
          model: self.returnBusParam().model,
          as: 'bus_param',
        }],
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required',
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.first({
        where : {
          user_id : props.user_id,
          id : props.id
        }
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required',
        buss_param_id : 'required',
        name : 'required',
        limit : 'required',
        status : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.save(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateClientApp : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        user_id : 'required',
        buss_param_id : 'required',
        name : 'required',
        limit : 'required',
        status : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.update(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteClientApp : async function(ids){
    let self = this;
    try{
      let validator = self.returnValidator({
        ids : ids
      },{
        ids : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      ids = JSON.parse(ids);
      let clientapp = self.returnClientApp();
      let resData = await clientapp.delete({
        id : ids
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})