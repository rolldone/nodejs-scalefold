const BaseController = require("../../../BaseController");
const BusParam = require("../../../../services/main/BusParamService");

module.exports = BaseController.extend({
  returnBusParamService : function(){
    return BusParam.create();
  },
  getBusParams : async function(req,res){
    let self = this;
    try{
      let props = self.getBaseQuery(req);
      let resData = self.returnBusParamService();
      resData = await resData.getBusParams(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  getBusParam : async function(req,res){
    let self = this;
    try{
      let resData = self.returnBusParamService();
      resData = await resData.getBusParam(req.params.id||null);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  addBusParam : async function(req,res){
    let self = this;
    try{
      let props = {
        key : req.body.key||null,
        value : req.body.value||null,
        description : req.body.description||null,
        status : req.body.status||null,
        text : req.body.text||null,
        bussinee_parameter_category_key : req.body.bussinee_parameter_category_key||null,
      }
      let resData = self.returnBusParamService();
      resData = await resData.addBusParam(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  updateBusParam : async function(req,res){
    let self = this;
    try{
      let props = {
        id : req.body.id || null,
        key : req.body.key || null,
        value : req.body.value || null,
        description : req.body.description || null,
        status : req.body.status || null,
        bussinee_parameter_category_key : req.body.bussinee_parameter_category_key || null,
      }
      let resData = self.returnBusParamService();
      resData = await resData.updateBusParam(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  deleteBusParam : async function(req,res){
    let self = this;
    try{
      let resData = self.returnBusParamService();
      resData = await resData.deleteBusParam({
        ids : req.body.ids||'[]',
        force_delete : JSON.parse(req.body.force_delete || 'false')
      });
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  getStaticCategories : async function(req,res){
    let self = this;
    try{
      let resData = self.returnBusParamService();
      resData = await resData.getStaticCategories();
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  }
})