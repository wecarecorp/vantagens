/*!
 * SEARCH FORM
 */
! function(a) {
    "use strict";
    var b = function(b, c) {
        a.fn.typeahead.defaults;
        c.scrollBar && (c.items = 100, c.menu = '<ul class="typeahead dropdown-menu" style="max-height:220px;overflow:auto;"></ul>');
        var e = this;
        if (e.$element = a(b), e.options = a.extend({}, a.fn.typeahead.defaults, c), e.$menu = a(e.options.menu).insertAfter(e.$element), e.eventSupported = e.options.eventSupported || e.eventSupported, e.grepper = e.options.grepper || e.grepper, e.highlighter = e.options.highlighter || e.highlighter, e.lookup = e.options.lookup || e.lookup, e.matcher = e.options.matcher || e.matcher, e.render = e.options.render || e.render, e.onSelect = e.options.onSelect || null, e.sorter = e.options.sorter || e.sorter, e.source = e.options.source || e.source, e.displayField = e.options.displayField || e.displayField, e.valueField = e.options.valueField || e.valueField, e.autoSelect = e.options.autoSelect || e.autoSelect, e.options.ajax) {
            var f = e.options.ajax;
            "string" == typeof f ? e.ajax = a.extend({}, a.fn.typeahead.defaults.ajax, {
                url: f
            }) : ("string" == typeof f.displayField && (e.displayField = e.options.displayField = f.displayField), "string" == typeof f.valueField && (e.valueField = e.options.valueField = f.valueField), e.ajax = a.extend({}, a.fn.typeahead.defaults.ajax, f)), e.ajax.url || (e.ajax = null), e.query = ""
        } else e.source = e.options.source, e.ajax = null;
        e.shown = !1, e.listen()
    };
    b.prototype = {
        constructor: b,
        eventSupported: function(a) {
            var b = a in this.$element;
            return b || (this.$element.setAttribute(a, "return;"), b = "function" == typeof this.$element[a]), b
        },
        select: function() {
            var a = this.$menu.find(".active");
            if (a.length) {
                var b = a.attr("data-value"),
                    c = this.$menu.find(".active a").text();
                this.options.onSelect && this.options.onSelect({
                    value: b,
                    text: c
                }), this.$element.val(this.updater(c)).change()
            }
            return this.hide()
        },
        updater: function(a) {
            return a
        },
        show: function() {
            var b = a.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            if (this.$menu.css({
                    top: b.top + b.height,
                    left: b.left
                }), this.options.alignWidth) {
                var c = a(this.$element[0]).outerWidth();
                this.$menu.css({
                    width: c
                })
            }
            return this.$menu.show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        ajaxLookup: function() {
            function c() {
                this.ajaxToggleLoadClass(!0), this.ajax.xhr && this.ajax.xhr.abort();
                var c = this.ajax.preDispatch ? this.ajax.preDispatch(b) : {
                    query: b
                };
                this.ajax.xhr = a.ajax({
                    url: this.ajax.url,
                    data: c,
                    success: a.proxy(this.ajaxSource, this),
                    type: this.ajax.method || "get",
                    dataType: "json"
                }), this.ajax.timerId = null
            }
            var b = a.trim(this.$element.val());
            return b === this.query ? this : (this.query = b, this.ajax.timerId && (clearTimeout(this.ajax.timerId), this.ajax.timerId = null), !b || b.length < this.ajax.triggerLength ? (this.ajax.xhr && (this.ajax.xhr.abort(), this.ajax.xhr = null, this.ajaxToggleLoadClass(!1)), this.shown ? this.hide() : this) : (this.ajax.timerId = setTimeout(a.proxy(c, this), this.ajax.timeout), this))
        },
        ajaxSource: function(a) {
            this.ajaxToggleLoadClass(!1);
            var c, b = this;
            if (b.ajax.xhr) return b.ajax.preProcess && (a = b.ajax.preProcess(a)), b.ajax.data = a, c = b.grepper(b.ajax.data) || [], c.length ? (b.ajax.xhr = null, b.render(c.slice(0, b.options.items)).show()) : b.shown ? b.hide() : b
        },
        ajaxToggleLoadClass: function(a) {
            this.ajax.loadingClass && this.$element.toggleClass(this.ajax.loadingClass, a)
        },
        lookup: function(a) {
            var c, b = this;
            return b.ajax ? void b.ajaxer() : (b.query = b.$element.val(), b.query && (c = b.grepper(b.source)) ? (0 == c.length && (c[0] = {
                id: -21,
                name: "Result not Found"
            }), b.render(c.slice(0, b.options.items)).show()) : b.shown ? b.hide() : b)
        },
        matcher: function(a) {
            return ~a.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(a) {
            if (this.options.ajax) return a;
            for (var e, b = [], c = [], d = []; e = a.shift();) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? c.push(e) : d.push(e) : b.push(e);
            return b.concat(c, d)
        },
        highlighter: function(a) {
            var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return a.replace(new RegExp("(" + b + ")", "ig"), function(a, b) {
                return "<strong>" + b + "</strong>"
            })
        },
        render: function(b) {
            var d, c = this,
                e = "string" == typeof c.options.displayField;
            return b = a(b).map(function(b, f) {
                return "object" == typeof f ? (d = e ? f[c.options.displayField] : c.options.displayField(f), b = a(c.options.item).attr("data-value", f[c.options.valueField])) : (d = f, b = a(c.options.item).attr("data-value", f)), b.find("a").html(c.highlighter(d)), b[0]
            }), c.autoSelect && b.first().addClass("active"), this.$menu.html(b), this
        },
        grepper: function(b) {
            var d, e, c = this,
                f = "string" == typeof c.options.displayField;
            if (!(f && b && b.length)) return null;
            if (b[0].hasOwnProperty(c.options.displayField)) d = a.grep(b, function(a) {
                return e = f ? a[c.options.displayField] : c.options.displayField(a), c.matcher(e)
            });
            else {
                if ("string" != typeof b[0]) return null;
                d = a.grep(b, function(a) {
                    return c.matcher(a)
                })
            }
            return this.sorter(d)
        },
        next: function(b) {
            var c = this.$menu.find(".active").removeClass("active"),
                d = c.next();
            if (d.length || (d = a(this.$menu.find("li")[0])), this.options.scrollBar) {
                var e = this.$menu.children("li").index(d);
                e % 8 == 0 && this.$menu.scrollTop(26 * e)
            }
            d.addClass("active")
        },
        prev: function(a) {
            var b = this.$menu.find(".active").removeClass("active"),
                c = b.prev();
            if (c.length || (c = this.$menu.find("li").last()), this.options.scrollBar) {
                var d = this.$menu.children("li"),
                    e = d.length - 1,
                    f = d.index(c);
                (e - f) % 8 == 0 && this.$menu.scrollTop(26 * (f - 7))
            }
            c.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this)).on("mouseleave", "li", a.proxy(this.mouseleave, this))
        },
        move: function(a) {
            if (this.shown) {
                switch (a.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        a.preventDefault();
                        break;
                    case 38:
                        a.preventDefault(), this.prev();
                        break;
                    case 40:
                        a.preventDefault(), this.next()
                }
                a.stopPropagation()
            }
        },
        keydown: function(b) {
            this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [40, 38, 9, 13, 27]), this.move(b)
        },
        keypress: function(a) {
            this.suppressKeyPressRepeat || this.move(a)
        },
        keyup: function(a) {
            switch (a.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.ajax ? this.ajaxLookup() : this.lookup()
            }
            a.stopPropagation(), a.preventDefault()
        },
        focus: function(a) {
            this.focused = !0
        },
        blur: function(a) {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        },
        click: function(a) {
            a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus()
        },
        mouseenter: function(b) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active")
        },
        mouseleave: function(a) {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        },
        destroy: function() {
            this.$element.off("focus", a.proxy(this.focus, this)).off("blur", a.proxy(this.blur, this)).off("keypress", a.proxy(this.keypress, this)).off("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.off("keydown", a.proxy(this.keydown, this)), this.$menu.off("click", a.proxy(this.click, this)).off("mouseenter", "li", a.proxy(this.mouseenter, this)).off("mouseleave", "li", a.proxy(this.mouseleave, this)), this.$element.removeData("typeahead")
        }
    }, a.fn.typeahead = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("typeahead"),
                f = "object" == typeof c && c;
            e || d.data("typeahead", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.typeahead.defaults = {
        source: [],
        items: 10,
        scrollBar: !1,
        alignWidth: !0,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        valueField: "id",
        displayField: "name",
        autoSelect: !0,
        onSelect: function() {},
        ajax: {
            url: null,
            timeout: 300,
            method: "get",
            triggerLength: 1,
            loadingClass: null,
            preDispatch: null,
            preProcess: null
        }
    }, a.fn.typeahead.Constructor = b, a(function() {
        a("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(b) {
            var c = a(this);
            c.data("typeahead") || (b.preventDefault(), c.typeahead(c.data()))
        })
    })
}(window.jQuery);