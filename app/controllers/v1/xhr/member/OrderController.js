const BaseController = require("../../../BaseController");
const OrderService = require("../../../../services/member/OrderService");
const CartService = require("../../../../services/member/CartService");

module.exports = BaseController.extend({
  returnOrderService : function(){
    return OrderService.create();
  },
  returnCartService : function(){
    return CartService.create();
  },
  getOrders : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let user = await GAuth.getAuth();
      props.user_id = user.id;
      let orderService = self.returnOrderService();
      let resData = await orderService.getOrders(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData); 
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  getOrder : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      props.id = req.params.id;
      let user = await GAuth.getAuth();
      props.user_id = user.id;
      let orderService = self.returnOrderService();
      let resData = await orderService.getOrder(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData); 
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  addOrder : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let user = await GAuth.getAuth();
      let device_id = await GAuth.getDeviceID();
      props.user_id = user.id;
      let orderService = self.returnOrderService();
      let cartService = self.returnCartService();
      let cart = await cartService.getCart({
        device_id : device_id,
      });

      let orderData = await orderService.addOrder({
        user_id : props.user_id
      });

      /* Karena productnya hanya 1 enggak perlu loop cart */
      let orderItemData = await orderService.addOrderItem({
        order_id : orderData.id,
        product_id : cart.product_id,
        qty : cart.qty
      });

      let resData = await orderService.getOrder({
        id : orderData.id,
        user_id : user.id
      });
      
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  submitOrder : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let user = await GAuth.getAuth();
      let orderService = self.returnOrderService();
      let resData = await orderService.updateOrder({
        user_id : user.id,
        id : props.id,
        status : orderService.status.PAID
      });
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){ 
      return self.responseErrorStatus(ex,res);
    }
  },
  cancelOrder : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let user = await GAuth.getAuth();
      props.user_id = user.id;
      let orderService = self.returnOrderService();
      let resData = await orderService.updateOrder({
        user_id : props.user_id,
        id : props.id,
        status : orderService.status.CANCEL
      });
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  addCart : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let cartService = self.returnCartService();
      let resData = await cartService.addCart(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  getCarts : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      props.device_id = await GAuth.getDeviceID();
      let cartService = self.returnCartService();
      let resData = await cartService.getCarts(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  getCart : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      props.id = req.params.id;
      props.device_id = await GAuth.getDeviceID();
      let cartService = self.returnCartService();
      let resData = await cartService.getCart(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  },
  deleteCart : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      props.device_id = await GAuth.getDeviceID();
      let cartService = self.returnCartService();
      let resData = await cartService.deleteCart(props);
      resData = {
        status : 'success',
        status_code : 200,
        return : resData
      }
      return res.status(resData.status_code).send(resData);
    }catch(ex){
      return self.responseErrorStatus(ex,res);
    }
  }
})