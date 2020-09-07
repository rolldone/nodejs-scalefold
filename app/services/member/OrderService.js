const OrderService = require("../main/OrderService");

module.exports = OrderService.extend({
  getOrders : async function(props){
    let self = this;
    let _super = self._super.bind(self);
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
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
  getOrder : async function(props){
    let self = this;
    let _super = self._super.bind(self);
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
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
  submitOrder : async function(props){
    try{
      let validator = self.returnValidator(props,{
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      return self._super(props);
    }catch(ex){
      throw ex;
    }
  },
  
})