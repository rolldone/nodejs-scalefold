'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Product', {
    product_name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  }, {
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.hasMany(models.ProductItem, {
      as: 'product_items',
      foreignKey: 'product_id',
      constraints: false,
    })
  };
  return Model;
};