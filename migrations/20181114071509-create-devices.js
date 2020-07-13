'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      browser_type: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      token: {
        type: Sequelize.TEXT
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      from_device_id : {
        type : Sequelize.INTEGER,
        allowNull : true
      },
      expired_at: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: true
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('devices');
  }
};