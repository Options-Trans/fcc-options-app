var Ajax = require('../../js/ajax-functions.js');
var formActionTypes = require('../constants/actionTypes/settingsFormActionTypes.js');
var settingsActionTypes = require('../constants/actionTypes/settingsActionTypes.js');
var browserHistory = require("react-router").browserHistory;

module.exports.update = function(settings) {
  return function(dispatch) {
    dispatch({
      type: formActionTypes.SETTINGS_FORM_UPDATE_REQUEST,
      settings:settings
    });
    Ajax.post('/api/settings', settings, function(err, updatedSettings) {
      if (err) {
        var message = "";
        if(err.responseJSON){
           message = err.responseJSON.msg;
        }
        dispatch({
          type: formActionTypes.SETTINGS_FORM_UPDATE_FAILURE,
          message: message
        });
      } else {
        dispatch({
          type: formActionTypes.SETTINGS_FORM_UPDATE_SUCCESS
        });
        dispatch({
          type: settingsActionTypes.SETTINGS_UPDATE,
          settings:updatedSettings
        });
      }
    });
  }
}