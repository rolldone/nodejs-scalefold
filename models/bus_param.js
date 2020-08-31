'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('BussineParameter', {
    key : DataTypes.STRING,
    value : DataTypes.STRING,
    text : DataTypes.STRING,
    description : DataTypes.STRING,
    status : DataTypes.INTEGER,
    bussinee_parameter_category_key : DataTypes.STRING,
  }, {
    tableName: 'bussine_parameters',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
  };
  return Model;
};