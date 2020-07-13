var moment = require('moment-timezone');
var timezoneId = "GMT-00:00";
moment.tz.setDefault('Africa/Abidjan');
moment.getLocalDate = function() {
  return moment();
}
moment.getDate = function() {
  return moment(new Date());
}
module.exports = moment;