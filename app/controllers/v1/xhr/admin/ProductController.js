const BaseController = require("../../../BaseController");
const ProductService = require("../../../../services/main/ProductService");
const BusParamService = require("../../../../services/main/BusParamService");

module.exports = BaseController.extend({
  returnBusParamService : function(){
    return BusParamService.create();
  },
  returnProductService : function(){
    return ProductService.create();
  },
  getProducts : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let productService = self.returnProductService();
      let resData = await productService.getProducts(props);
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
  getProduct : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let productService = self.returnProductService();
      let resData = await productService.getProduct({
        ...props,
        id : req.params.id
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
  addProduct : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.addProduct(props);
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
  updateProduct : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.updateProduct(props);
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
  deleteProduct : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.deleteProduct(props);
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
  getProductItems : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let productService = self.returnProductService();
      let resData = await productService.getProductItems(props);
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
  getProductItem : async function(req,res){
    let self = this;
    try{
      let props = req.query;
      let productService = self.returnProductService();
      let resData = await productService.getProductItem({
        ...props,
        id : req.params.id
      })
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
  addProductItem : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.addProductItem(props);
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
  updateProductItem : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.updateProductItem(props);
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
  deleteProductItem : async function(req,res){
    let self = this;
    try{
      let props = req.body;
      let productService = self.returnProductService();
      let resData = await productService.deleteProductItem(props);
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
  getAppCategories : async function(req,res){
    let self = this;
    try{
      let props = {};
      props.take = parseInt(req.query.take);
      props.page = parseInt(req.query.page) - 1;
      props.bussinee_parameter_category_key = req.query.bussinee_parameter_category_key;
      let productService = self.returnBusParamService();
      let resData = await productService.getBusParams(props);
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