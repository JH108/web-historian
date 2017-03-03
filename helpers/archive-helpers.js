var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};


// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  // fs.readFile(exports.paths.list, function(err, data) {
  //   if(err) {
  //     return console.log(err);
  //   }
  //   data = data.toString().split('\n');
  //   if(callback) {
  //     callback(data);
  //   }
  // });
  return new Promise(function(resolve, reject) {
    fs.readFile(exports.paths.list, function(err, data) {
      data = data.toString().split('\n');
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.isUrlInList = function(url) {
  // exports.readListOfUrls(function(sites) {
  //   var isUrl =  _.some(sites, function(site) {
  //     if (site === url) {
  //       return site;
  //     }
  //   });
  //   callback(isUrl);
  // });
  return new Promise(function(resolve, reject) {
    exports.readListOfUrls()
    .then(function(sites) {
      var isUrl = _.some(sites, function(site) {
        if (site === url) {
          return site;
        }
      });
      if (isUrl === undefined) {
        reject(isUrl);
      } else {
        resolve(isUrl);
      }
    });
  });
};

exports.addUrlToList = function(url) {
  //fs.writeFile(exports.paths.list, url + '\n', callback);
  return new Promise(function(resolve, reject) {
    fs.writeFile(exports.paths.list, url + '\n', function(err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });
};

exports.isUrlArchived = function(url) {
  var sitePath = path.join(exports.paths.archivedSites, url);
  // fs.exists(sitePath, function(exists) {
  //   callback(exists);
  // });
  return new Promise(function(resolve, reject) {
    fs.exists(sitePath, function(err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });
};

exports.downloadUrls = function(urls) {
  //iterate over urls to grab one at a time
  //add each url to exports.paths.archivedSites
  _.each(urls, function(url) {
    if (!url) {
      return null;
    }
    // takes url go to the site
      // downloads the site html
      // save downloaded file to exports.paths.archivedSites

      // request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
    request('http://' + url).pipe(
      fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
