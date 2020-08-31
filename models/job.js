'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Job', {
    name: DataTypes.STRING,
    app_id: DataTypes.INTEGER,
    key: DataTypes.STRING,
    description : DataTypes.TEXT,
    status: DataTypes.INTEGER,
    limit : DataTypes.INTEGER,
    delay : DataTypes.INTEGER,
  }, {
    tableName: 'jobs',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsTo(models.client_app, {
      as: 'client_app',
      foreignKey: 'app_id',
      constraints: false,
    })
  };
  return Model;
};