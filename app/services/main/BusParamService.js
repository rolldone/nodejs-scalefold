const BaseService = require("../BaseService");
const BusParam = require("../../BusParam");

module.exports = BaseService.extend({
  returnBusParam : function(){
    return BusParam.create();
  },
  getBusParams : async function(props){
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
      let busparam = this.returnBusParam();
      let resData = await busparam.get({
        where : {},
        offset : props.take * props.page,
        limit : props.take,
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getBusParam : async function(id){
    let self = this;
    try{
      let validator = self.returnValidator({
        id : id
      },{
        id : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let busparam = this.returnBusParam();
      let resData = await busparam.first({
        where : {
          id : id
        },
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addBusParam : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        key : 'required',
        description : 'required',
        status : 'required',
        bussinee_parameter_category_key : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let busparam = self.returnBusParam();
      let resData = await busparam.save(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateBusParam : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        key : 'required',
        // value : 'required',
        description : 'required',
        status : 'required',
        bussinee_parameter_category_key : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.errors));
      }
      let busparam = self.returnBusParam();
      let resData = await busparam.update(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteBusParam : async function(props){
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
      let ids = JSON.parse(props.ids);
      let busparam = self.returnBusParam();
      let resData = await busparam.delete({
        where : {
          id : ids
        },
        force : props.force_delete || false
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getStaticCategories : async function(){
    let self = this;
    try{
      let busparam = self.returnBusParam();
      let resData = await busparam.category;
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})