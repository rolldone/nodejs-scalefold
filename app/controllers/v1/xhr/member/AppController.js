const BaseController = require("../../../BaseController");
const ClientAppService = require("../../../../services/member/ClientAppService");
const BusParam = require("../../../../services/main/BusParamService");

module.exports = BaseController.extend({
  returnClientApp : function(){
    return ClientAppService.create();
  },
  returnBusParam : function(){
    return BusParam.create();
  },
  getAppCategories : async function(req,res){
    let self = this;
    try{
      let props = self.getBaseQuery(req);
      props.bussinee_parameter_category_key = 'TYPE_APP';
      let busparam = self.returnBusParam();
      let resData = await busparam.getBusParams(props);
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
  getApps : async function(req,res){
    let self = this;
    try{
      let auth = await GAuth.getAuth();
      let props = self.getBaseQuery(req);
      props.user_id = auth.id;
      let clientapp = self.returnClientApp();
      let resData = await clientapp.getClientApps(props);
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
  getApp : async function(req,res){
    let self = this;
    try{
      let auth = await GAuth.getAuth();
      let props = {
        user_id : auth.id,
        id : req.params.id
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.getClientApp(props);
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
  addApp : async function(req,res){
    let self = this;
    try{
      let auth = await GAuth.getAuth();
      let props = {
        user_id : auth.id,
        buss_param_id : req.body.buss_param_id,
        name : req.body.name,
        limit : req.body.limit,
        status : req.body.status,
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.addClientApp(props);
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
  updateApp : async function(req,res){
    let self = this;
    try{
      let auth = await GAuth.getAuth();
      let props = {
        user_id : auth.id,
        id : req.body.id,
        buss_param_id : req.body.buss_param_id,
        name : req.body.name,
        limit : req.body.limit,
        status : req.body.status,
      }
      let clientapp = self.returnClientApp();
      let resData = await clientapp.updateClientApp(props);
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
  deleteApp : async function(req,res){
    let self = this;
    try{
      let auth = await GAuth.getAuth();
      let ids = req.body.ids || '[]';
      let clientapp = self.returnClientApp();
      let resData = await clientapp.deleteClientApp(ids);
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