const Proto = require("uberproto");

module.exports = Proto.extend({
  model : null,
  save : async function(props,currentModel=null){
    let self = this;
    try{
      let resData = null;
      if(currentModel != null){
        resData = await currentModel.update(props);
      }else{
        resData = await self.model.create(props);
      }
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  update : async function(props){
    let self = this;
    try{
      let resData = await self.model.findOne({
        where : {
          id : props.id
        }
      })
      let resData = await self.model.save(props,resData);
    }catch(ex){
      throw ex;
    }
  },
  delete : async function(where){
    let self = this;
    try{
      let resData = await self.model.findAll({
        where : where
      })
      return resData.destroy();
    }catch(ex){
      throw ex;
    }
  },
  first : async function(props){
    let self = this;
    try{
      console.log('self.',self.model);
      let resData = await self.model.findOne(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  get : async function(props){
    let self = this;
    try{
      let resData = await self.model.findAll(props);
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})