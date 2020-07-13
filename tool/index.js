var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);
var theConfig = {};
theConfig.AsyncJs = require("async");
theConfig.Cors = require('cors');
theConfig.Express = require("express");
theConfig.Sequelize = require("sequelize");
theConfig.BodyParser = require("body-parser");
theConfig.App = theConfig.Express();
theConfig.Lodash = require('lodash');
theConfig.Env = require('dotenv').config().parsed;
theConfig.Path = require("path");
theConfig.Cookie = require('cookie-parser');
theConfig.Server = require('http').Server(theConfig.App);
theConfig.Nunjucks = require('nunjucks');
theConfig.SerializeError = require('serialize-error');
theConfig.JsonWebToken = require('jsonwebtoken')
theConfig.Bcrypt = require('bcrypt');
theConfig.Session = require('express-session');
theConfig.Redis = require('redis');
theConfig.RedisStore = require('connect-redis')(theConfig.Session);

fs.readdirSync(__dirname).filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
}).forEach(file => {
    var config = (path.join(__dirname, file));
    let name = config;
    name = name.replace(/^.*[\\\/]/, '');
    name = (name.substr(name.lastIndexOf('/') + 1)).replace('.js', '');
    theConfig[name] = require(config);
});


module.exports = theConfig;