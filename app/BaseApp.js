const Proto = require("uberproto");

module.exports = Proto.extend({
  model : null,
  _includes : [],
  _excludes : [],
  _raw : true ,
  _nest : true,
  getRaw : function(){
    return this.raw || this._raw;
  },
  getNest : function(){
    return this.nest || this._nest;
  },
  getIncludes : function(){
    var includes = [
      ...this._includes,
      ...this.includes || []
    ]
    console.log('includes',includes);
    return includes;
  },
  getExcludes : function(){
    var excludes = [
      ...this._excludes,
      ...this.excludes || []
    ];
    console.log('excludes',excludes);
    return excludes;
  },
  save : async function(props,currentModel=null){
    let self = this;
    try{
      let resData = null;
      if(currentModel != null){
        resData = await currentModel.update(props);
      }else{
        resData = await self.model.create(props);
      }
      resData = await self.first({
        where : {
          id : resData.id
        },
      })
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
      resData = await self.save(props,resData);
    }catch(ex){
      throw ex;
    }
  },
  delete : async function(props){
    staticType(props,[Object]);
    let self = this;
    try{
      return await self.model.destroy(props);
    }catch(ex){
      throw ex;
    }
  },
  first : async function(props){
    let self = this;
    try{
      console.log('self.',self.model);
      let resData = await self.model.findOne({
        ...props,
        attributes: {exclude: self.getExcludes(), include : self.getIncludes()},
        raw : self.getRaw(),
        nest : self.getNest()
      });;
      return resData;
    }catch(ex){
      throw ex;
    }
  },
  get : async function(props){
    let self = this;
    try{
      let resData = await self.model.findAll({
        ...props,
        attributes: {exclude: self.getExcludes(), include : self.getIncludes()},
        raw : self.getRaw(),
        nest : self.getNest()
      });
      return resData;
    }catch(ex){
      throw ex;
    }
  }
})