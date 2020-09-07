'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('OrderItem', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    tableName: 'order_items',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
      constraints: false,
    });
    Model.belongsTo(models.Product,{
      as : 'product',
      foreignKey : 'product_id',
      constraints : false
    });
  };
  return Model;
};