const BaseService = require("../BaseService");
const Product = require("../../Product");
const ProductItem = require("../../ProductItem");
const BusParam = require("../../BusParam");

module.exports = BaseService.extend({
  returnBusParamApp : function(){
    return BusParam.create();
  },
  returnProductApp : function(){
    return Product.create();
  },
  returnProductItemApp : function(){
    return ProductItem.create();
  },
  getProducts : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{}); 
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let product = self.returnProductApp();
      let resData = await product.get({
        include: [{
          model: self.returnProductItemApp().model,
          as: 'product_items',
          include : [{
            model : self.returnBusParamApp().model,
            as : 'app_category'
          }]
        }],
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getProduct : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let product = self.returnProductApp();
      let resData = await product.first({
        where : {
          id : props.id
        },
        include: [{
          model: self.returnProductItemApp().model,
          as: 'product_items',
        }],
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addProduct : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        product_name : 'required',
        price : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let product = self.returnProductApp();
      let resData = await product.save({
        product_name : props.product_name,
        price : props.price
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateProduct : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        product_name : 'required',
        price : 'required',
        id : 'required'
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let product = self.returnProductApp();
      let resData = product.update({
        id : props.id,
        price : props.price,
        product_name : props.product_name
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteProduct : async function(props){
    staticType(props,[Object]);
    staticType(props.ids,[String]);
    staticType(props.force_delete,[null,Boolean]);
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
      let product = self.returnProductApp();
      let resData = product.delete({
        where : {
          id : ids
        },
        force : props.force_delete || false
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getProductItems : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let productItem = self.returnProductItemApp();
      let resData = productItem.get({
        include : [{
          model : self.returnBusParamApp().model,
          as : 'app_category'
        }]
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  getProductItem : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{});
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let productItem = self.returnProductItemApp();
      let resData = await productItem.first({
        where : {
          id : props.id
        }
      })
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  addProductItem : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        app_category_id : 'required',
        limit : 'required',
        product_id : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let productItem = self.returnProductItemApp();
      let resData = await productItem.save({
        app_category_id : props.app_category_id,
        limit : props.limit,
        product_id : props.product_id
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  updateProductItem : async function(props){
    let self = this;
    try{
      let validator = self.returnValidator(props,{
        id : 'required',
        app_category_id : 'required',
        limit : 'required',
        product_id : 'required',
      });
      switch(await validator.check()){
        case validator.fails:
          throw new CustomError('error.validation',JSON.stringify(validator.errors.all()));
      }
      let productItem = self.returnProductItemApp();
      let resData = await productItem.update(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  deleteProductItem : async function(props){
    staticType(props,[Object]);
    staticType(props.ids,[String]);
    staticType(props.force_delete,[null,Boolean]);
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
      let productItem = self.returnProductItemApp();
      let resData = productItem.delete({
        where : {
          id : ids
        },
        force : props.force_delete || false
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})