var helpers = require('../helpers/archive-helpers');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

archive.readListOfUrls(archive.downloadUrls);