const Proto = require('uberproto');
const { JsonWebToken, Bcrypt } = require('@tool'); 
const config = require('@config');
const { Lodash } = require('../../tool');
const saltRounds = 10;

module.exports = Proto.extend({
  expiredConst : config.app.expired_token || (1 * 24 * 60 * 60 * 1000),
  expiredRefreshToken : config.app.expired_refresh_token || (7 * 24 * 60 * 60 * 1000),
  timestampToDatetime : function(unix_timestamp) {
    return new Promise(function(resolve, rejected) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      // Will display time in 10:30:23 format
      var formattedTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      resolve(formattedTime);
    });
  },
  generatePassword : function(val) {
    return new Promise(function(resolve,reject) {
      Bcrypt.hash(val, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        resolve(hash);
      }).catch(function(err) {
        reject(err);
      });
    })
  },
  checkPassword : function(val, val2) {
    return new Promise(function(resolve) {
      Bcrypt.compare(val, val2).then(function(res) {
        if (res == true) {
          return resolve(true);
        }
        resolve(false);
      });
    });
  },
  getCurrentGuest : function(props) {
    return new Promise(function(resolve) {}.bind(this))
  },
  // ------------------------------------
  // Fungsi ini digunakan untuk remove
  // string Barrier nya terlelbih dahulu
  // Jika menggunakan header autorization barrier
  // --------------------------------------------
  splitToken : function(token) {
    if (Lodash.includes(token, 'Bearer')) {
      var header = token.split(' ');
      token = header[1];
    }
    return token;
  },
  checkToken : function(token) {
    let self = this;
    return new Promise(function(resolve,reject) {
      token = self.splitToken(token);
      if (token == null) {
        return reject('Token is required!');
      }

      // ----------------------------
      // Decrypte tokennya terlebih dahulu
      // --------------------------------------
      JsonWebToken.verify(token, config.app.app_secret, function(err, decoded) {
        if (err!=null) {
          return reject(new CustomError("error.token_invalid",err.message));
        }
        resolve(decoded);
      });
    });
  },
  generateFastToken : async function(data) {
    try{
      let now = new Date();
      let newExpired = 14400000;
      let newDateTime = (await self.timestampToDatetime(newExpired)) + "";
      //Object.assign({}, data)
      //TODO: masukan data yang benar ke JsonWebToken sign dan cek token yang dibuat pada saat registrasi
      let token = JsonWebToken.sign(data, config.app.app_secret, {
        expiresIn: (newExpired / 1000) + "s"
      });
      return token;
    }catch(ex){
      throw ex;
    }
  },
  generateToken : function(data) {
    let self = this;
    return new Promise(async function(resolve,reject) {
      let now = new Date();
      let newExpired = now.getTime() + self.expiredConst;
      let newDateTime = (await self.timestampToDatetime(newExpired)) + "";
      // Object.assign({}, data)
      //TODO: masukan data yang benar ke JWT sign dan cek token yang dibuat pada saat registrasi
      let token = JsonWebToken.sign(data, config.app.app_secret, {
        expiresIn: (self.expiredConst / 1000) + "s"
      });
      let encrypteToken = await self.generatePassword(token,function(err){
        if(err != null) return reject(err);
      })
      // console.log('expiredConst',encrypteToken);
      let refresh_token = JsonWebToken.sign({
        token : token,
      }, config.app.app_secret, {
        expiresIn: (self.expiredRefreshToken / 1000) + "s"
      })
      resolve({
        encrypteToken : encrypteToken,
        token: token,
        refresh_token: refresh_token,
        expired_at: newDateTime
      });
    })
  },
  reGenerateTokenWithoutLogin : function(props){
    return new Promise(async function(resolve,reject){
      let decodeRefreshTOken = await self.checkToken(props.refresh_token);
      if(decodeRefreshTOken.status == 'rejected'){
        return resolve(decodeRefreshTOken);
      }
      let valid = await self.checkPassword(props.token,decodeRefreshTOken.token)
      if(valid){
        let decodeToken = await self.checkToken(props.token);
        return resolve(decodeToken)
      }
      reject('You cant renew the token');
    })
  },
  /* Authentication like laravel  */
  _auth : Object.freeze(config.auth),
  _select_auth : null,
  getSelectAuth : async function(authName,req){
    let self = this;
    try{
      let user = await self._getGuard(authName,req);
      return user;
    }catch(ex){
      throw ex;
    }
  },
  setDefaultGuard : function(guardName,req){
    this._select_auth = guardName;
    this._req = req;
  },
  getAuth : async function(){
    let self = this;
    try{
      if(self._select_auth == null) {
        throw new CustomError("error.select_auth_exception",'Please set default auth first');
      }
      let user = await self._getGuard(self._select_auth,self._req);
      return user;
    }catch(ex){
      throw ex;
    }
  },
  _getGuard : async function(guardName,req){
    try{
      let self = this;
      let guard = self._auth.guard[guardName];
      let provider = null;
      if(guard == null){
        throw new CustomError('error.guard_not_found_exception','This guard '+guardName+' is not defined!');
      }
      switch(guard.driver){
        case 'session':
          provider = await self._getProvider(guard.provider);
          break;
        case 'jwt':
          let token = await self.checkToken(req.headers.authorization);
          provider = await self._getProvider(guard.provider,{
            id : token.id,
            email : token.email
          });
          return provider;
        case 'token':
          provider = await self._getProvider(guard.provider);
          break;
      }
    }catch(ex){
      throw ex;
    }
  },
  _getProvider : async function(providerName,props){
    try{
      staticType(props,[Object]);
      let self = this;
      let provider = self._auth.provider[providerName];
      let user = null;
      if(provider == null){
        throw new CustomError('error.provider_not_found_exception','This provider '+providerName+' is not defined')
      }
      switch(provider.driver){
        case 'sequelize':
          staticType(props.id,[Number]);
          staticType(props.email,[String]);
          user = provider.model;
          user = user.create();
          user = await user.first({
            where : { id : props.id, email : props.email }
          })
          return user;
        case 'mongodb':
          break;
        default:
          break;
      }
    }catch(ex){
      throw ex;
    }
  }
})