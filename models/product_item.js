'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('ProductItem', {
    app_category_id: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    tableName: 'product_items',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
      constraints: false,
    })
    Model.belongsTo(models.BussineParameter,{
      as: 'app_category',
      foreignKey: 'app_category_id',
      constraints: false,
    })
  };
  return Model;
};