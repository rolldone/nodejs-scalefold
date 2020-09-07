const BaseService = require("../BaseService");
const Order = require("../../Order");
const { Moment } = require('@tool');
const OrderItem = require("../../OrderItem");
module.exports = BaseService.extend({
  status : Object.freeze({
    TRIAL : 1,
    PENDING : 2,
    PAID : 3,
    CANCEL : 4
  }),
  returnOrderApp : function(){
    return Order.create();
  },
  returnOrderItemApp : function(){
    return OrderItem.create();
  },
  getOrders : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let order = self.returnOrderApp();
      let resData = await order.get({
        where : (function(){
          let where = {};
          if(props.user_id != null){
            where.user_id = props.user_id;
          }
          return where;
        })()
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getOrder : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let order = self.returnOrderApp();
      let resData = order.first({
        where : (function(){
          let where = {};
          if(props.user_id != null){
            where.user_id = props.user_id;
          }
          where.id = props.id;
          return where;
        })(),
        include : (function(){
          let include = [];
          include.push({
            model : self.returnOrderItemApp().model,
            as : 'order_items'
          });
          return include;
        })()
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addOrder : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        product_id : 'required',
        user_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let order = self.returnOrderApp();
      let resData = order.save({
        invoice : self.generateInvoice({
          date : Moment().format('YYYY-MM-DD')
        }),
        date : Moment().format('YYYY-MM-DD'),
        status : self.status.PENDING,
        user_id : props.user_id,
        product_id : props.product_id
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateOrder : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        status : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validator',JSON.stringify(validator.errors.all()));
      }
      let order = self.returnOrderApp();
      let resData = order.update({
        id : props.id,
        status : props.status
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  /*
    Function / function 
    Invoice Generator
  */
  generateInvoice : function(props) {
    let self = this;
    try{
      let order = self.returnOrderApp();
      let resData = order.first({
        where : (function(){
          let where = {};
          if(props.date != null){
            where.date = props.date;
          }
          return where;
        })(),
        order : [
          ['id','DESC']
        ]
      })
      resData = (function(){
        key = config.app.invoice_key +'-'+Moment().format('YYYY-MM-DD').replaceAll('-','');
        if(resData == null){
          return self.generateNumber(key,0,1,10);
        }
        return self.generateNumber(key,self.convertInvoiceToNumber(resData.invoice),1,10);
      })()
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  /*
    Function / function
    melakukan konversi invoice kombinasi string angka 
    menjadi angka. Contoh IV-00001000 => 1000
  */
  convertInvoiceToNumber : function(invoice) {
    invoice = invoice.substring(invoice.lastIndexOf("-") + 1);
    invoice = invoice.match(/\d/g);
    invoice = parseInt(invoice.join(""));
    // invoice = self.generateNumber(invoice, 1, 10);
    return invoice;
  },
  /*
    Function / function
    Invoice generator untuk mencetak angka
    menjadi invoice dengan patokan data terakhir dari table
  */
  generateNumber : function(key,start, count, digits) {
    let result = [];
    for (let n = start + 1; n < parseInt(start) + parseInt(count) + 1; n++) {
      result = str_pad(n, digits, "0", 'STR_PAD_LEFT');
    }
    return key+ '-' + result;
  },
  getOrderItems : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        order_id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let orderItem = self.returnOrderItemApp();
      let resData = await orderItem.get({
        where : {
          order_id : props.order_id
        },
        include : (function(){
          let include = [];
          include.push({
            model : self.returnOrderApp().model,
            as : 'order'
          })
          return include;
        })()
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getOrderItem : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        order_id : 'required',
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let orderItem = self.returnOrderItemApp();
      let resData = await orderItem.first({
        where : {
          order_id : props.order_id,
          id : props.id
        },
        include : (function(){
          let include = [];
          include.push({
            model : self.returnOrderApp().model,
            as : 'order'
          })
          return include;
        })()
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addOrderItem : async function(props){
    try{
      let validator = self.returnValidator(props,{
        order_id : 'required',
        product_id : 'required',
        qty : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let orderItem = self.returnOrderItemApp();
      let resData = await orderItem.save(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})