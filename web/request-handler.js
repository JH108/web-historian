var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!



var statusCode;
var actions = {
  'GET': function(request, response) {
    statusCode = 200;
    var urlPath = url.parse(request.url).pathname;
    console.log("beginning url " + urlPath[0]);
    console.log("website: " + urlPath.slice(1));
    if (urlPath === '/') {
      urlPath = '/index.html';
    }
    helpers.serveAssets(response, urlPath, function() {
      archive.isUrlInList(urlPath, function(exists) {
        if(exists) {
          helpers.sendResponse(response, '/loading.html');
        } else {
          helpers.sendResponse(response, '', 404);
        }
      });
    });
  },
  'POST': function(request, response) {

  }
};
exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    helpers.sendResponse(res, '', 404);
  }

  // res.end(archive.paths.list);
};
