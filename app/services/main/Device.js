const BaseService = require('../BaseService');
const Device = require('../../Device');

module.exports = BaseService.extend({
  status : Object.freeze({
    NEW : 1,
    TO_BE_MEMBER : 2,
    BACK_AGAIN : 3,
    EXPIRED : 4,
    BLOCKED : 5,
  }),
  returnDeviceApp : function(){
    return Device.create();
  },
  getDevices : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.passes:
          let device = this.returnDeviceApp();
          let resData = await device.get({
            where : {}
          });
          return resData;
        case Validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  getDeviceByToken : async function(token){
    let self = this;
    try{
      let validator = self.returnValidator({
        token : token
      },{
        token : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          return this.getDevice({
            token : token
          })
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  getDevice : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.passes:
          let device = self.returnDeviceApp();
          let resData = await device.first({
            where : props
          });
          return resData;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  addDevice : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        token : 'required',
        ip_address : 'required',
        browser_type : 'required',
        status : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          let device = this.returnDeviceApp();
          let resData = await device.save(props);
          return resData;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  updateDevice : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required'
      });
      switch(await validator.check()){
        case validator.passes:
          let device = this.returnDeviceApp();
          let resData = await device.update(props);
          return resData;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  },
  deleteDevices : async function(ids){
    try{
      let validator = self.returnValidator({
        ids : ids
      },{
        ids : 'required'
      })
      switch(await validator.check()){
        case validator.passes:
          let device = this.returnDeviceApp();
          let resData = await device.delete({
            where : {
              id : {
                [self.op.in] : JSON.parse(ids)
              }
            }
          });
          return resData;
        case validator.fails:
          throw new Error(JSON.stringify(validator.errors.all()));
      }
    }catch(ex){
      throw ex;
    }
  }
})