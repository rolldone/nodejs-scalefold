const config = require('@config');
const Auth = require('@app/helper/Auth.js');
const Util = require('@app/helper/Util.js');
module.exports = function(callback){
  /* Static Type check allowed type data */
  global.staticType = function (inVariable, typeDatas = []) {
    var isWRong = true;
    var closureCondition = function (theVariable, arrayRecordTypeOf) {
      return function (typeDataItem) {
        switch (true) {
          case typeDataItem == Array:
            return Array.isArray(theVariable);
          case typeDataItem == undefined:
          case typeDataItem == null:
            if (theVariable == typeDataItem) {
              return true;
            }
            arrayRecordTypeOf.push(typeDataItem);
            return false;
          case typeof theVariable == typeDataItem.name.toLowerCase():
            return true;
          default:
            arrayRecordTypeOf.push(typeDataItem.name);
            return false;
        }
      };
    };
    var recordTypeOf = [];
    var doCheckStaticType = closureCondition(inVariable, (recordTypeOf = []));
    for (var a = 0; a < typeDatas.length; a++) {
      if (doCheckStaticType(typeDatas[a]) == true) {
        isWRong = false;
        break;
      }
    }
    if (isWRong == true) {
      var messageError = `StaticType Validation - value "${inVariable}" is Wrong type of variable, the requirement is ${JSON.stringify(recordTypeOf)}`;
      console.error("staticType - error ", messageError);
      throw new CustomError('error.static_type_exception',messageError);
    }
  };
  global.config = config;  
  global.GAuth = Auth.create();
  global.Util = Util.create();
  global.CustomError = function(name,message){
    var err = new Error();
    err.name = name || "NotImplementedError";
    err.message = (message || "");
    return err;
  }
  global.CustomError.prototype = Error.prototype;
  
  return callback(null);
}