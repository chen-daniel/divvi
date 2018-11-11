import cookie from 'react-cookies';

const $ = require('jquery');

function exec(type, url, data, success, error) {
  return $.ajax({
    type: type,
    url: url,
    beforeSend: function(request) {
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.setRequestHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      );
      request.setRequestHeader(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, X-Auth-Token'
      );
    },
    data: data,
    success: success,
    error: error
  });
}

function execAuth(type, url, data, success, error) {
  return $.ajax({
    type: type,
    url: url,
    beforeSend: function(request) {
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.setRequestHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      );
      request.setRequestHeader(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, X-Auth-Token'
      );
      request.setRequestHeader('X-Auth-Token', cookie.load('token'));
      request.setRequestHeader('X-Curr-Account', cookie.load('accountId'));
    },
    data: data,
    success: success,
    error: error
  });
}
module.exports = {
  exec: exec,
  execAuth: execAuth
};
