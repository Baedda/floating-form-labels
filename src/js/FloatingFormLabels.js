(function (global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(global.jQuery);
    }
}(this, function ($) {
    'use strict';

    var pluginName = 'FloatingFormLabels',
        defaults = {
            label: '.ffl-label',
            formElements: 'input, textarea',
            floatedClass: 'ffl-floated'
        };

    function FloatingFormLabels (element, options) {
        this._name = pluginName;
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.label = this.el.find(this.options.label);
        this.input = this.el.find(this.options.formElements);
        this._init();
    }

    FloatingFormLabels.prototype = {
        _init: function () {
            var scope = this;
            this._toggleClass(this._isFloated());

            if (this._hasPlaceholder()) {
                this._toggleClass(true);
                return;
            }

            this.input.on({
                'focus.ffl': function () {
                    scope._toggleClass(true);
                },
                'blur.ffl': function () {
                    scope._toggleClass(scope._isFloated());
                }
            });
        },
        _hasPlaceholder: function () {
            if (typeof this.input.attr('placeholder') !== 'undefined') {
                return true;
            }
            return false;
        },
        _isFloated: function () {
            if (this.input.val() === '') {
                return false;
            }
            return true;
        },
        _toggleClass: function (floated) {
            if (floated) {
                this.label.addClass(this.options.floatedClass);
                return;
            }
            this.label.removeClass(this.options.floatedClass);
        },
        destroy: function () {
            this.input.off('focus.ffl, blur.ffl');
            this.label.removeClass(this.options.floatedClass);

            this.el.removeData(pluginName);
        }
    };

    $.fn[pluginName] = function (options) {
        var instance,
            args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new FloatingFormLabels(this, options));
            } else if (typeof options === 'string') {
                // call public methods with its own parameters
                instance = $.data(this, pluginName);
                instance[options].apply(instance, args);
            }
        });
    };
}));
