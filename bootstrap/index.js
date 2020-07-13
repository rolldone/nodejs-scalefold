const { AsyncJs } = require('@tool');
const task = [
  require('./Config'),
  require('./Express'),
  require('./Nunjuck')
];
module.exports = function(asyncDone){
  AsyncJs.series(task,function(err,result){
    if(err){
      return console.log(err);
    }
    console.log('Initialize Bootstrap Is Done!');
    asyncDone(null);
  })
}