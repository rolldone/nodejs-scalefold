'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id : {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      buss_param_id : {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      name : {
        allowNull : false,
        type: Sequelize.STRING(100)
      },
      status : {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      limit : {
        allowNull : false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('client_apps');
  }
};
