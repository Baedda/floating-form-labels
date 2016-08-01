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
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.el = $(this.element);
        this.label = this.el.find(this.options.label);
        this.input = this.el.find(this.options.formElements);
        this.init();
    }

    FloatingFormLabels.prototype = {
        init: function () {
            var scope = this;

            this.toggleClass(this.isFloated());

            if (this.hasPlaceholder()) {
                this.toggleClass(true);
                return;
            }

            this.input.on({
                'focus.ffl': function () {
                    scope.toggleClass(true);
                },
                'blur.ffl': function () {
                    scope.toggleClass(scope.isFloated());
                }
            });
        },
        hasPlaceholder: function () {
            if (typeof this.input.attr('placeholder') !== 'undefined') {
                return true;
            }
            return false;
        },
        isFloated: function () {
            if (this.input.val() === '') {
                return false;
            }
            return true;
        },
        toggleClass: function (floated) {
            if (floated) {
                this.label.addClass(this.options.floatedClass);
                return;
            }
            this.label.removeClass(this.options.floatedClass);
        },
        destroy: function () {
            this.input.off('focus.ffl, blur.ffl');
            this.label.removeClass(this.options.floatedClass);
            delete $.fn[pluginName];
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new FloatingFormLabels(this, options));
            }
        });
        return this;
    };
}));
