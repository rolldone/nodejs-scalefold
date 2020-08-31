const BaseService = require("../BaseService");
const QueueRecord = require("../../QueueRecord");

module.exports = BaseService.extend({
  returnQueueRecordApp : function(){
    return QueueRecord.create();
  }
})