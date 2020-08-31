const BaseController = require("../../../BaseController");
const ScheduleService = require("../../../../services/member/ScheduleService");

module.exports = BaseController.extend({
  returnScheduleService : function(){
    return ScheduleService.create();
  },
  getSchedules : function(req,res){},
  getSchedule : function(req,res){},
  addSchedule : function(req,res){},
  updateSchedule : function(req,res){},
  deleteSchedule : function(req,res){}
})