var actionTypes = require('../constants/actionTypes/authActionTypes');

var unauthorize = function(state) {

  //TODO not really sure what to return here
  return Object.assign({}, state, {unauthorized:true})
}

var loadUser = function(state, user) {
  return Object.assign({}, state, user)
}

var logout = function(state) {
  var newState = Object.assign({}, state);
  delete newState['user'];
  return newState;
}

var authReducer = function(state, action) {
  state = state || {};
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return loadUser(state, action.response);
    case actionTypes.LOGOUT_SUCCESS:
      return logout(state, action.user);
    case actionTypes.UNAUTHORIZE:
      return unauthorize(state);
    default:
      return state;
  }
};

module.exports = authReducer;
