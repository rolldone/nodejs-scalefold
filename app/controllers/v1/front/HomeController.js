const BaseController = require('../../BaseController');
const Ractive = require('ractive');
const { Nunjucks } = require('@tool');
module.exports = BaseController.extend({
  index : function(req,res){
    var kk = {test:"vmdkvmdfkv"}
    var code = {
      data : function(){
        return {
          test : 'bbbbbbbbbbbb'
        }
      },
      template : `
        <div id="app">
        <h1>{{test}}</h1>
        {{code}}
        </div>
        
      `,
      oncomplete : function(){
        
        setTimeout(() => {
          this.set('test','aaaaaaaaaaaaaaaaaaaaa')
          console.log('vmdkfmvfdv');
        }, 5000);
      }
    }
    var test = Ractive(code)
    console.log('test',test);
    // return res.send(test.toHTML());
    res.render('v1/test.html',{
      test : test.toHTML()
    })
    // res.send(Nunjucks.renderString(test.toHTML(),{ code : JSON.stringify(code) }));
    // res.send('Welcome to my world - '+req.session.id);
  }
})