var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);
var theConfig = {};
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