var jsdom = require("jsdom").jsdom;
var doc = jsdom('');
GLOBAL.window = doc.createWindow();
var $ = require('../js/jquery.min.js');
GLOBAL.$ = $;
GLOBAL.chrome = {
    storage: {
        sync: {
            get: function (defaults) { return defaults; }
        }
    }
};
