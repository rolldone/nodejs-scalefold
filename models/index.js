"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var Util = require('@app/helper/Util.js').create();
const Op = Sequelize.Op;
const operatorsAliases = {
  $gt: Op.gt,
  $gte: Op.gte,
  $eq : Op.eq,
  $lt : Op.lt,
  $lte : Op.lte,
  $or : Op.or,
  $and : Op.and,
  $not : Op.not,
  $notIn : Op.notIn,
  $between : Op.between
}
var basename = path.basename(__filename);
// var env       = // process.env.NODE_ENV || 'development';
var configSequelize = require("@config/config.js"); // require('../config/config.js')[env];// require(__dirname + '/..\config\config.json')[env];
configSequelize.operatorsAliases = 0;// operatorsAliases;
var db = {};
if (configSequelize.use_env_variable) {
    // var sequelize = new Sequelize(process.env[configSequelize.use_env_variable], configSequelize);
} else {
    var sequelize = new Sequelize(configSequelize.database, configSequelize.username, configSequelize.password, configSequelize);
}
fs.readdirSync(__dirname).filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
}).forEach(file => {
    var model = require(path.join(__dirname,file))(sequelize, Sequelize)// sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

Util.loadConfig(function(){
    db.sequelize.sync({ alter: true }).then(() => {
      console.log('database synced :)')
      console.log('disconnecting...')
    }).catch(e => {
      console.log(e)
    })
}, false);

module.exports = db;