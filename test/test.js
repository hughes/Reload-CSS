var assert = require('assert'),
    mocks = require('./_mocks'),
    CSSReloader = require('../js/reloader').CSSReloader;

describe('CSSReloader', function () {
    var reloader;

    describe('#bust_cache()', function () {
        beforeEach(function (done) {
            reloader = new CSSReloader();
            reloader.cache_token = '1234';
            done();
        });

        it('should append token when no query params are present', function () {
            var new_href = reloader.bust_cache(null, '/style.css');
            assert.equal(new_href, '/style.css?_=' + reloader.cache_token);
        });

        it('should append token when other query params are present', function () {
            var new_href = reloader.bust_cache(null, '/style.css?debug=true');
            assert.equal(new_href, '/style.css?debug=true&_=' + reloader.cache_token);
        });

        it('should replace the token when it is already present', function () {
            var new_href = reloader.bust_cache(null, '/style.css?_=1233');
            assert.equal(new_href, '/style.css?_=' + reloader.cache_token);
        });

        it('should replace the token when the token is present and not the final query param', function () {
            var new_href = reloader.bust_cache(null, '/style.css?_=1233&debug=true');
            assert.equal(new_href, '/style.css?_=' + reloader.cache_token + '&debug=true');
        });
    });
});
