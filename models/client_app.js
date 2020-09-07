'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('client_app', {
    user_id : DataTypes.INTEGER,
    name : DataTypes.STRING,
    status : DataTypes.INTEGER,
    product_item_id : DataTypes.INTEGER,
    order_id : DataTypes.INTEGER
  }, {
    tableName: 'client_apps',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  model.associate = function(models) {
    // associations can be defined here
    model.belongsTo(models.ProductItem,{
      as : 'product_item',
      foreignKey : 'product_item_id',
      constraints : false
    })
    model.belongsTo(models.Order,{
      as : 'order',
      foreignKey : 'order_id',
      constraints : false
    })
    model.belongsTo(models.Client,{
      as : 'client',
      foreignKey : 'user_id',
      constraints : false
    })
  };
  return model;
};