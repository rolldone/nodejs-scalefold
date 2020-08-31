const User = require("../app/User");
const Client = require("../app/Client");

module.exports = {
  guard : {
    web : {
      driver : 'session',
      provider : 'users'
    },
    api : {
      driver : 'jwt',
      provider : 'users'
    },
    member_api : {
      driver : 'jwt',
      provider : 'clients'
    },
    app : {
      driver : 'jwt',
      provider : 'apps'
    }
  },
  provider : {
    users : {
      driver : 'sequelize',
      model : User
    },
    clients : {
      driver : 'sequelize',
      model : Client
    },
    apps : {
      driver : 'sequelize',
      model : null
    }
  }
}