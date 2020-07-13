const { Path, App, Nunjucks } = require('@tool');
/**
----------------------------------------------
Nunjucks Configuration
------------------------------  **/
module.exports = async function(callback){
  /* Cache nya dimatikan dulu */
  // app.use('/static', express.static(path.join(__dirname,'./','public')));
  // var settingService = new SettingService();
  // var template_cache = await settingService.getSetting('is_template_cache');
  var template_cache = false;
  if(template_cache == null){
    template_cache = true
  }else{
    // template_cache = template_cache.value;
  }
  console.log('Template Cache is ',template_cache);
  var envNunjucks = Nunjucks.configure([Path.join(__dirname, "../", "resources/"), Path.join(__dirname, "../", "resources/v1/")], {
    autoescape: true,
    express: App,
    watch: true,
    async : true,
    noCache: !template_cache || true,
  });
  // envNunjucks add filter and other on it
  envNunjucks.addFilter('setAttribute', function(dictionary, key, value) {
      dictionary[key] = value;
      return dictionary;
  });
  envNunjucks.addGlobal('get_exist_element',function(theELement){
    switch(global.exist_elements[theELement]){
      case null:
      case true:
      return true;
      default:
        global.exist_elements[theELement] = true;
      return false;
    }
  })
  envNunjucks.addGlobal('hook',function(path){
    switch(global.hooks[path]){
      case null:
      case undefined:
        global.hooks[path] = path;
      return true;
      default:
      return false;
    }
  })
  envNunjucks.addGlobal('authUser',function(){
    return global.user;
  })
  
  // Uppercase custom Tag
  var UppercaseExtention = function(){
    this.tags = ["uppercase"];

    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();

      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);

      return new nodes.CallExtensionAsync(this, "run", args);
    };

    this.run = function(context, myStringArg, callback) {
      let ret = new Nunjucks.runtime.SafeString(
        myStringArg.toUpperCase()
      );
      callback(null, ret);
    };
  }
  envNunjucks.addExtension('UppercaseExtention', new UppercaseExtention());

  // Require Custom Tag
  var RequireExtention = function(){
    this.tags = ["require"];

    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      return new nodes.CallExtensionAsync(this, "run", args);
    };

    this.run = function(context, myStringArg, callback) {
      let ret = null;
      switch(global.hooks[myStringArg]){
        case null:
        case undefined:
          global.hooks[myStringArg] = myStringArg;
          ret = new Nunjucks.runtime.SafeString(envNunjucks.render(`${myStringArg}`,context.ctx));
          // ret = new Nunjucks.runtime.SafeString(envNunjucks.renderString(`{% include '${myStringArg}' %}`,context.ctx));
        break;
        default:
        break;
      }
      callback(null, ret);
    };
  }
  envNunjucks.addExtension("RequireExtention",new RequireExtention());
  return callback(null);
};