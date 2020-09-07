'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      product_id : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      qty : {
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
    console.log('table order_items created!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_items');
    console.log('drop table order_items!');
  }
};
