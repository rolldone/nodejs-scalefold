const BaseService = require("../BaseService");
const Cart = require("../../Cart");

module.exports = BaseService.extend({
  returnCartApp : function(){
    return Cart.create();
  },
  getCarts : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let cart = self.returnCartApp();
      let resData = await cart.get({
        where : (function(){
          let where = {};
          if(props.device_id != null){
            where.device_id = props.device_id;
          }
          return where;
        })()
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getCart : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let cart = self.returnCartApp();
      let resData = await cart.first({
        where : (function(){
          let where = {};
          if(props.device_id != null){
            where.device_id = props.device_id;
          }
          return where;
        })()
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addCart : async function (props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        device_id : 'required',
        product_id : 'required',
        qty : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let cart = self.returnCartApp();
      let resData = await cart.save({
        device_id : props.device_id,
        product_id : props.product_id,
        qty : props.qty
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateCart : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        device_id : 'required',
        product_id : 'required',
        qty : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let cart = self.returnCartApp();
      let resData = await cart.update({
        id : props.id,
        device_id : props.device_id,
        product_id : props.product_id,
        qty : props.qty
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteCart : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        ids : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let ids = JSON.parse(props.ids);
      let cart = self.returnCartApp();
      let resData = await cart.delete({
        where : (function(){
          let where = {
            id : ids
          };
          if(props.device_id != null){
            where.device_id = props.device_id;
          }
          return where;
        })(),
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})