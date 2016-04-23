var models = require("./models");
var modelEndpoints={}
modelEndpoints[models.STAFF] = '/api/staff/';
modelEndpoints[models.SETTINGS] = '/api/settings/';
modelEndpoints[models.VEHICLES] = '/api/vehicle/';
modelEndpoints[models.CONSUMERS] = '/api/consumer/';
modelEndpoints[models.USERS] = '/api/user/';
module.exports = modelEndpoints;
