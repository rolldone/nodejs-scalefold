'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("devices","token");
    console.log('Column on devices - token removed!');
    await queryInterface.addColumn('devices',"device_id",{
      type: Sequelize.STRING,
      allowNull : null
    })
    console.log('Column on devices - device_id added!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('devices',"device_id");
    console.log('Column on devices - device_id removed!');
    await queryInterface.addColumn('devices','token');
    console.log('Column on devices - token added!');
  }
};
