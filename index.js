require('module-alias/register')
let { AsyncJs, Env, Server, App } = require('@tool');
let WebBootstrap = require('./bootstrap/index.js');
let { web, api } = require('./routes/v1');
let port = Env.PORT;
let task = [
  WebBootstrap,
  function(cb){
    // console.log('App',App);
    web.create(App);
    api.create(App);
    Server.listen(port, '0.0.0.0');
    cb(null);
  },
]
AsyncJs.series(task,function(err,result){
  console.log('index asyncjs error ',err);  
  console.log(result);
})
