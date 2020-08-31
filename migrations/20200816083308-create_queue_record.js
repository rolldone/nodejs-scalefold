'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('queue_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      table_key : {
        allowNull : true,
        type : Sequelize.STRING
      },
      queue_id : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      /* Bull job id */
      job_id : {
        allowNull : true,
        type : Sequelize.STRING
      },
      description : {
        allowNull : true,
        type : Sequelize.TEXT
      },
      limit : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      delay : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      data : {
        allowNull : true,
        type : Sequelize.JSON
      },
      status : {
        allowNull : true,
        type : Sequelize.INTEGER(1)
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
    return queryInterface.dropTable('queue_records');
  }
};
