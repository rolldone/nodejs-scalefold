'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('group_privilage', {
      id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      name : {
        allowNull : false,
        type : Sequelize.STRING(100)
      },
      access_type : {
        allowNull : false,
        type : Sequelize.BOOLEAN,
        defaultValue : false
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('group_privilage');
  }
};
