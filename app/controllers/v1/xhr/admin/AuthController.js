const BaseController = require("../../../BaseController");
const Auth = require("../../../../services/main/AuthService");
module.exports = BaseController.extend({
  returnAuthMainService : function(){
    return Auth.create();
  },
  basicLogin : function(req,res){
    let self = this;
    try{
      let props = {};
      props.email = req.body.email;
      props.password = req.body.password;
      let resData = self.returnAuthMainService();
      resData = resData.basicLogin(props);
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
  apiLogin : async function(req,res){
    let self = this;
    try{
      let props = {};
      props.email = req.body.email;
      props.password = req.body.password;
      let resData = self.returnAuthMainService();
      resData = await resData.apiLogin(props);
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
  register : async function(req,res){
    let self = this;
    try{
      let props = {};
      props.first_name = req.body.first_name;
      props.last_name = req.body.last_name;
      props.email = req.body.email;
      props.password = req.body.password;
      props.password_confirm = req.body.password_confirm;
      let resData = self.returnAuthMainService();
      resData = await resData.register(props);
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
  logout : function(req,res){},
  test : function(req,res){
    res.send('aaaaaaaaaaaaaaa');
  }
})