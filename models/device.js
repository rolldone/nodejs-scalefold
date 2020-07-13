'use strict';
module.exports = (sequelize, DataTypes) => {
  const Devuce = sequelize.define('Device', {
    browser_type: DataTypes.TEXT,
    token: DataTypes.TEXT,
    ip_address: DataTypes.STRING,
    from_device_id : DataTypes.INTEGER,
    expired_at: DataTypes.DATE,
    status: DataTypes.INTEGER,
  }, {
    tableName: 'devices',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  Devuce.associate = function(models) {
    // associations can be defined here
  };
  return Devuce;
};