'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("client_apps","product_item_id",{
      type: Sequelize.INTEGER,
      allowNull : true
    });
    console.log('Column on client_apps - product_item_id added!');
    await queryInterface.addColumn('client_apps',"order_id",{
      type: Sequelize.INTEGER,
      allowNull : null
    })
    console.log('Column on client_apps - order_id added!');
    await queryInterface.removeColumn('client_apps','limit');
    console.log('Column on client_apps - limit removed!');
    await queryInterface.removeColumn('client_apps','buss_param_id');
    console.log('Column on client_apps - bus_param_id removed!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.remove('client_apps','product_item_id');
    console.log('Column on client_apps - product_item_id removed!');
    await queryInterface.remove('client_apps','order_id');
    console.log('Column on client_apps - order_id removed!');
    await queryInterface.addColumn('client_apps','limit');
    console.log('Column on client_apps - limit added!');
    await queryInterface.addColumn('client_apps','buss_param_id');
    console.log('Column on client_apps - bus_param_id added');
  }
};
