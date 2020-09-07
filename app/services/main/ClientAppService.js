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
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.get({
        offset : props.take * props.page,
        limit : props.take,
        where : (function(){
          let where = {};
          if(props.user_id != null){
            where.user_id = props.user_id;
          }
          return where;
        })(),
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
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.first({
        where : (function(){
          let where = {
            id : props.id
          };
          if(props.user_id != null){
            where.user_id = props.user_id;
          }
          return where;
        })()
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
  deleteClientApp : async function(props){
    staticType(props,[Object]);
    staticType(props.ids,[String]);
    staticType(props.force_delete,[null,Boolean]);
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        ids : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      ids = JSON.parse(ids);
      let clientapp = self.returnClientApp();
      let resData = await clientapp.delete({
        where : (function(){
          let where = {
            id : ids
          };
          if(props.user_id != null){
            where.user_id = props.user_id;
          }
          return where;
        })(),
        force : props.force_delete || false
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})