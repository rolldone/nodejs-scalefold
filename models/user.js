'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    // phone_number: DataTypes.STRING,
    // type_user: DataTypes.INTEGER,
    password: DataTypes.TEXT,
    remember_token: DataTypes.TEXT,
    // is_active: DataTypes.BOOLEAN,
    // wallet_address : DataTypes.TEXT,
    // private_file : DataTypes.TEXT,
    // activation_key: DataTypes.TEXT,
    // image : DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt : "deleted_at",
    updatedAt : "updated_at",
    createdAt : "created_at"
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};