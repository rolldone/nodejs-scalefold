'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("orders","product_id");
    console.log('Column on orders - product_id removed!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders','product_id',{
      allowNull : true,
      type : Sequelize.INTEGER
    });
    console.log('Column on orders - product_id added!');
  }
};
