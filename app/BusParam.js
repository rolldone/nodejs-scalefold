const BaseApp = require("./BaseApp");
const { BussineParameter } = require('@model');
module.exports = BaseApp.extend({
  model : BussineParameter,
  /* Static Category */
  category : {
    TYPE_APP : {
      key : 'TYPE_APP',
      name : 'Type App'
    },
    ROOM_TYPE : {
      key : 'ROOM_TYPE',
      name : 'Room Type'
    },
    PACKAGE_PRICE :{
      key : 'PACKAGE_PRICE',
      name : "Package Price Category"
    }
  }
})