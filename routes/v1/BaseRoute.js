const Proto = require('uberproto');
const {Express} = require("@tool");
var Router = require('named-routes');
module.exports = Proto.extend({
  __init : 'construct',
  construct : function(app){
    this.router.extendExpress(app);
    this.router.registerAppHelpers(app);
    this.app = app;
    /* Child route inside .use */
    this.childRouter = Express.Router();
    this.router.extendExpress(this.childRouter);
    this.onready();
  },
  router : new Router(),
  app : null,
  baseRoute : '',
  _path : null,
  _middleware : [],
  onready : function(){
    console.log('onready - Override this function');
  },
  // use : function(path,middleware=[],callbackRouter){
  //   path = this.baseRoute+path;
  //   callbackRouter(this);
  //   this.app.use(path,middleware,this.childRouter);
  // },
  use : function(path,middleware=[],callbackRouter){
    this._path = path;
    this._middleware = middleware;
    callbackRouter(this);

  },
  set : function(action,...props){
    props[0]=this.baseRoute+(this._path||'')+props[0];
    console.log('action',action);
    console.log('props',props);
    console.log('_path',this._path);
    props[2] = [
      this._middleware,
      ...props[2]
    ]
    this.app[action].call(this.app,...props);
  },
  get : function(...props){
    this.set('get',...props);
  },
  post : function(...props){
    this.set('post',...props);
  },
  displayRoute : function(req,res){
    let routesByNameAndMethod = (function(datas){
      let newKeys = [];
      for(var key in datas){
        newKeys.push(key);
      }
      return newKeys;
    })(this.router.routesByNameAndMethod);
    let callbacksByPathAndMethod = (function(datas){
      let newKeys = [];
      for(var key in datas){
        newKeys.push(key);
      }
      return newKeys;
    })(this.router.callbacksByPathAndMethod);
    let displayRoutes = {};
    for(var a=0;a<routesByNameAndMethod.length;a++){
      displayRoutes[routesByNameAndMethod[a]] = callbacksByPathAndMethod[a];
    }
    displayRoutes = {
      status : 'success',
      status_code : 200,
      return : displayRoutes
    }
    return res.status(displayRoutes.status_code).send(displayRoutes);
  }
})