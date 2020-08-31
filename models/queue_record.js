'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('QueueRecord', {
    table_key: DataTypes.STRING,
    queue_id : DataTypes.INTEGER,
    job_id: DataTypes.STRING,
    description : DataTypes.TEXT,
    limit : DataTypes.INTEGER,
    delay : DataTypes.INTEGER,
    data : DataTypes.JSON,
    status : DataTypes.INTEGER
  }, {
    tableName: 'queue_records',
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