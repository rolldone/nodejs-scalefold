const CartService = require("../main/CartService");

module.exports = CartService.extend({
  getCarts : async function(props){
    let self = this;
    let _super = self._super.bind(self);
    try{
      let validator = self.returnValidator(props,{
        device_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      return _super(props);
    }catch(ex){
      throw ex;
    }
  },
  getCart : async function(props){
    let self = this;
    let _super = self._super.bind(self);
    try{
      let validator = self.returnValidator(props,{
        device_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      return _super(props);
    }catch(ex){
      throw ex;
    }
  },
  deleteCart : async function(props){
    let self = this;
    let _super = self._super.bind(self);
    try{
      let validator = self.returnValidator(props,{
        device_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      return _super(props);
    }catch(ex){
      throw ex;
    }
  }
})