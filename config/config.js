require("module-alias/register");
const { Env } = require('@tool');
module.exports = {
  username: Env.DB_USER,
  password: Env.DB_PASS,
  database: Env.DB_NAME,
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  dialect: Env.DB_DRIVER,
  timezone: "+00:00",
  logging: false,
  operatorsAliases: false
};
