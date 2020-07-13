const config = require('@config');
const Auth = require('@app/helper/Auth.js');
const Util = require('@app/helper/Util.js');
module.exports = function(callback){
  global.config = config;  
  global.Auth = Auth.create();
  global.Util = Util.create();
  return callback(null);
}