const BaseController = require("../../../BaseController");
const User = require("../../../../services/main/UserService");

module.exports = BaseController.extend({
  returnUser : function(){
    return User.create();
  },
  profile : async function(req,res){
    let self = this;
    try{
      let user = await GAuth.getAuth();
      req.params.id = user.id;
      let resData = await self.getUser(req,res);
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
  getUsers : async function(req,res){
    let self = this;
    try{
      let user = self.returnUser();
      let resData = await user.getUsers({});
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
  getUser : async function(req,res){
    let self = this;
    try{
      let user = self.returnUser();
      user = await user.getUser({
        id : req.params.id
      });
      return user;
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  addUser : function(req,res){

  },
  updateUser : function(req,res){

  },
  deleteUser : function(req,res){

  }
})