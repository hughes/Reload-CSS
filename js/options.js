(function (exports) {
    var global;
    if (typeof GLOBAL === 'undefined') {
        global = window;
    } else {
        global = GLOBAL;
    }

    var OptionsController = function () {
        this.options = {
            hotkey: OptionsController.DEFAULT_HOTKEY
        };
        this.first_key = true;

        global.chrome.storage.sync.get('hotkey', $.proxy(function loadCallback(result) {
            this.options = $.extend(this.options, result);
            this.initialize();
        }, this));
    };

    OptionsController.prototype.initialize = function () {
        this.handle_key = $.proxy(this.handle_key, this);
        this.save = $.proxy(this.save, this);
        this.render_preview(this.options.hotkey);
        $(document).on('keydown', this.handle_key);
        $('#save').on('click', this.save);
    };

    OptionsController.prototype.save = function () {
        global.chrome.storage.sync.set(this.options, function saveCallback(result) {
            $('#result').html('Saved ' + this.str_to_glyphs(this.options.hotkey));
        }.bind(this));
    };

    OptionsController.prototype.event_to_string = function (e) {
        var key = $.hotkeys.specialKeys[e.keyCode]
            || $.hotkeys.shiftNums[e.keycode]
            || String.fromCharCode(e.which);
        var str = ''
        if (e.altKey && key !== 'alt') {
            str += 'alt';
        }
        if (e.ctrlKey && key !== 'ctrl') {
            if (!str == '') {
                str += '+';
            }
            str += 'ctrl';
        }
        if (e.shiftKey && key !== 'shift') {
            if (!str == '') {
                str += '+';
            }
            str += 'shift';
        }
        if (!str == '') {
            str += '+';
        }
        str += key;
        return str;
    };

    OptionsController.prototype.handle_key = function (e) {
        var key_str = this.event_to_string(e);
        this.options.hotkey = key_str;
        this.render_preview(key_str);
        return true;
    };

    OptionsController.prototype.str_to_glyphs = function (str) {
        return $.map(str.split('+'), function (k, i) {
            return '<kbd>' + k + '</kbd>'
        }).join('+');
    };

    OptionsController.prototype.render_preview = function (str) {
        $('#preview').html(this.str_to_glyphs(str));
    };

    OptionsController.DEFAULT_HOTKEY = 'alt+r';

    exports.OptionsController = OptionsController;
})(this);