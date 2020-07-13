const Proto = require('uberproto');
const { Validator } = require('@tool');
let sequelize = require("sequelize");
let Op = sequelize.Op;

const BaseService = Proto.extend({
  /* Todo some code at here */
  returnValidator : function(props,rules){
    return Validator.create(props,rules);
  },
  op : Op
})

module.exports = BaseService;