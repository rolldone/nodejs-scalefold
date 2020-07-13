const {SerializeError} = require('@tool');
const Proto = require('uberproto');
let fn = Proto.extend({
  isEmpty : (obj) => {
    if (typeof obj === 'undefined' || obj === null) {
      return true;
    } else if (typeof obj === 'object') {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
  },
  getAuthHeader : (req) => {
    let auth = req.header('Authorization');
    if (!auth) {
      auth = req.body.auth;
    }
    return auth;
  },
  loadConfig : function(callback, isLoad) {
    if (isLoad) {
      if (callback != null) {
        callback();
      }
    }
  },
  getKeyByValue : (obj, val) => Object.keys(obj).find(key => obj[key] === val),
  sseHeaders : (res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  },
  removePrefix : function(key, props) {
    for (var a in props) {
      if (props[key] != '') {
        let val = props[a];
        delete props[a];
        var reg = new RegExp(key, "g");
        a = a.replace(reg, '');
        props[a] = val;
      } else {
        delete props[a];
      }
    }
    return props;
  },
  getValuePrefix : function(key, props) {
    let theValue = {};
    for (var a in props) {
      if (a.includes(key) == true) {
        theValue[a] = props[a];
      }
    }
    return theValue;
  },
  parseBool : function(str) {
    // console.log(typeof str);
    // strict: JSON.parse(str)
    if (str == null) return false;
    if (typeof str === 'boolean') {
      if (str === true) return true;
      return false;
    }
    if (typeof str === 'string') {
      if (str == "") return false;
      str = str.replace(/^\s+|\s+$/g, '');
      if (str.toLowerCase() == 'true' || str.toLowerCase() == 'yes') return true;
      str = str.replace(/,/g, '.');
      str = str.replace(/^\s*\-\s*/g, '-');
    }
    // var isNum = string.match(/^[0-9]+$/) != null;
    // var isNum = /^\d+$/.test(str);
    if (!isNaN(str)) return (parseFloat(str) != 0);
    return false;
  },
  SerializeError : function(theErrorStack) {
    return SerializeError(theErrorStack);
  },
  sseSend : (res, data) => {
    res.json(data)
  }
})

module.exports = fn;