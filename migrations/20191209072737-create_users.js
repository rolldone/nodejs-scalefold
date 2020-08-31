'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull : false,
        unique : true,
        type: Sequelize.STRING
      },
      first_name: {
        allowNull : true,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull : true,
        type: Sequelize.STRING
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull : true
      },
      password: {
        type: Sequelize.TEXT
      },
      remember_token: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('users');
  }
};
