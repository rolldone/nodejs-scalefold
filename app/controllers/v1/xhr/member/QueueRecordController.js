const BaseController = require("../../../BaseController");
const QueueRecordService = require("../../../../services/member/QueueRecordService");

module.exports = BaseController.extend({
  returnQueueRecordService : function(){
    return QueueRecordService.create();
  },
  getQueueRecords : function(req,res){},
  getQueueRecord : function(req,res){},
  /* Update job system at the same time update record */
})