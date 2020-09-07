'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Order', {
    invoice: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.TINYINT(4),
    user_id : DataTypes.INTEGER,
  }, {
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.Client, {
      as: 'client',
      foreignKey: 'user_id',
      constraints: false,
    });
    Model.hasMany(models.OrderItem,{
      as : 'order_items',
      foreignKey : 'order_id',
      constraints : false
    });
  };
  return Model;
};