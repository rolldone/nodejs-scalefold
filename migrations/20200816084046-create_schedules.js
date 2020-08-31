'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        allowNull : true,
        type :Sequelize.STRING
      },
      app_id : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      key : {
        allowNull : true,
        type : Sequelize.STRING
      },
      description : {
        allowNull : true,
        type : Sequelize.TEXT
      },
      status : {
        allowNull : true,
        type : Sequelize.INTEGER(1)
      },
      date : {
        allowNull : true,
        type : Sequelize.DATE
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
    return queryInterface.dropTable('schedules');
  }
};
