const BaseController = require("../../../BaseController");
const JobService = require("../../../../services/member/JobService");

module.exports  = BaseController.extend({
  returnJobService : function(){
    return JobService.create();
  },
  getJobs : function(req,res){

  },
  getJob : function(req,res){

  },
  addJob : function(req,res){

  },
  updateJob : function(req,res){

  },
  deleteJob : function(req,res){
    
  }
})