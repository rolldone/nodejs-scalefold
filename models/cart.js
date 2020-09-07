'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Cart', {
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
  }, {
    tableName: 'carts',
    timestamps: true,
    paranoid: false,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.Product,{
      as : 'product',
      foreignKey: 'product_id',
      constraints: false,
    })
  };
  return Model;
};