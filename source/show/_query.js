(function(window) {
    function _query(selector) {
        this.selector = selector;
        this.node = document.querySelectorAll(selector);
        this.nodes = Array.prototype.slice.call(this.node);
    }
    _query.prototype = {
        constructor: _query,
        html: function(htmlString) {
            if (!!htmlString) {
                this.nodes.forEach(function(e) {
                    e.innerHTML = htmlString.toString();
                });
            }
            return this.nodes[0].innerHTML;
        },
        text: function(txtString) {
            if (!!txtString) {
                this.nodes.forEach(function(e) {
                    e.textContent = txtString.toString();
                });
            } else {
                return this.nodes[0].textContent;
            }
        },
        hasClass: function(c) {
            return this.nodes.some(function(e) {
                if (e.className.split(" ").indexOf(c) >= 0) {
                    return true;
                }
            });
        },
        addClass: function(c) {
            this.nodes.forEach(function(e) {
                e.className = e.className + " " + c;
            });
            return this;
        },
        removeClass: function(c) {
            this.nodes.forEach(function(e) {
                var classList = e.className.split(" ");
                e.className = classList.filter(function(item) {
                    if (item != c) {
                        return true;
                    }
                }).join(" ");
            });
            return this;
        },
        parent: function() {
            var parent = this.nodes[0].parentNode;
            //这里没有做父元素nodeType类型判断
            this.nodes = [parent];
            return this;
        },
        validElement: function(query, ele) {
            var first = query.charAt(0);
            var name = query.slice(1);
            switch (first) {
                case "#":
                    if (ele.id == name) {
                        return true;
                    }
                    break;
                case ".":
                    if (ele.className.split(" ").indexOf(name) > -1) {
                        return true;
                    }
                default:
                    if (ele.tagName.toLowerCase() === query.toLowerCase()) {
                        return true;
                    } else {
                        return false;
                    }
            }
        },
        parents: function(select) {
            var node = this.nodes[0],
                list = [],
                i = 1;
            while (node.parentNode.tagName.toLowerCase() !== "html") {
                if (i !== 1) {
                    list.push(node);
                }
                i++;
                node = node.parentNode;
            };
            if (!!select) {
                var _this = this;
                this.nodes = list.filter(function(e) {
                    return _this.validElement(select, e);
                });
            } else {
                this.nodes = list;
            }
            return this;
        },
        children: function(select) {
            var node = this.nodes[0];
            var list = Array.prototype.slice.call(node.children);
            if (!!select) {
                var _this = this;
                this.nodes = list.filter(function(e) {
                    return _this.validElement(select, e);
                });
            } else {
                this.nodes = list
            }
            return this;
        },
        next: function() {
            this.nodes = [this.nodes[0].nextElementSibling];
            return this;
        },
        nextAll: function(select) {
            var node = this.nodes[0],
                list = [],
                next = node.nextElementSibling;
            while (!!next) {
                list.push(next);
                next = next.nextElementSibling;
            }
            if (!!select) {
                var _this = this;
                this.nodes = list.filter(function(e) {
                    return _this.validElement(select, e);
                });
            } else {
                this.nodes = list
            }
            return this;
        },
        prev: function() {
            this.nodes = [this.nodes[0].previousElementSibling];
            return this;
        },
        prevAll: function(select) {
            var node = this.nodes[0],
                list = [],
                prev = node.previousElementSibling;
            while (!!prev) {
                list.push(prev);
                prev = prev.previousElementSibling;
            }
            if (!!select) {
                var _this = this;
                this.nodes = list.filter(function(e) {
                    return _this.validElement(select, e);
                });
            } else {
                this.nodes = list
            }
            return this;
        },
        css: function(a, b) {
            if (typeof a == "string" && !b) {
                return window.getComputedStyle(this.nodes[0], null)[a];
            } else if (typeof a == "object") {
                this.nodes.forEach(function(e) {
                    for (var k in a) {
                        e.style[k] = a[k];
                    }
                });
                return this;
            } else if (typeof a == "string" && typeof b == "string") {
                this.nodes.forEach(function(e) {
                    e.style[a] = b;
                });
                return this;
            }
        }
    }

    function init(selector) {
        return new _query(selector);
    }
    window._ = init;
})(window);