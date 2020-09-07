'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice : {
        allowNull : true,
        type : Sequelize.STRING
      },
      date : {
        allowNull : true,
        type: Sequelize.DATE
      },
      status : {
        allowNull : true,
        type : Sequelize.TINYINT(1)
      },
      expired_at : {
        allowNull : true,
        type : Sequelize.DATE
      },
      user_id : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      product_id : {
        allowNull : true,
        type : Sequelize.INTEGER
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
