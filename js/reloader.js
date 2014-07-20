(function (exports) {
    var global;
    if (typeof GLOBAL === 'undefined') {
        global = window;
    } else {
        global = GLOBAL;
    }

    var CSSReloader = function () {
        this.options = global.chrome.storage.sync.get({
            hotkey: CSSReloader.DEFAULT_HOTKEY
        });
        this.reload_css = $.proxy(this.reload_css, this);
        this.bust_cache = $.proxy(this.bust_cache, this);
        this.cache_token = (new Date()).getTime();
    };

    CSSReloader.DEFAULT_HOTKEY = 'alt+r';

    CSSReloader.prototype.bust_cache = function(index, href) {
        if (href.indexOf('?') === -1) {
            href += '?_=' + this.cache_token;
        } else {
            if (href.indexOf('_=') === -1) {
                href += '&_=' + this.cache_token;
            } else {
                href = href.replace( /(\_\=[^&]+)/g, '_=' + this.cache_token);
            }
        }
        return href;
    };

    CSSReloader.prototype.bind_key = function() {
        $(document).on('keydown', null, this.options.hotkey, this.reload_css);
    };

    CSSReloader.prototype.unbind_key = function () {
        $(document).off('keydown', this.reload_css);
    };

    CSSReloader.prototype.reload_css = function () {
        this.cache_token = (new Date()).getTime(),
        $('link[rel=stylesheet]').attr('href', this.bust_cache);
    };

    exports.CSSReloader = CSSReloader;
})(this);