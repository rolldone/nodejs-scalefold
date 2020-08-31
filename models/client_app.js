'use strict';
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('client_app', {
    user_id : DataTypes.INTEGER,
    buss_param_id : DataTypes.INTEGER,
    name : DataTypes.STRING,
    status : DataTypes.INTEGER,
    limit : DataTypes.INTEGER,
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
    model.belongsTo(models.BussineParameter, {
      as: 'bus_param',
      foreignKey: 'buss_param_id',
      constraints: false,
    })
    model.belongsTo(models.Client,{
      as : 'client',
      foreignKey : 'user_id',
      constraints : false
    })
  };
  return model;
};