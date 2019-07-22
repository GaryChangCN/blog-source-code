---
title: 简易仿制jQuery DOM处理
date: 2017-02-12 14:20:50
tags: [javascript]
category: [作品]
---

<!--more-->

## 前言

这个文章我将会简单实现 jQuery 的 Dom 操作方法。其中并不会做兼容性处理只是技术实现。而且是直接
操作DOM对象而非 jQuery 对象。而且我也没有实现事件委托 `delegate` 事件绑定方法 `on`，等等。

## to-do-list

* [✔] [全局变量](#全局变量)
* [✔] [html方法](#html方法)
* [✔] [text方法](#text方法)
* [✔] [操作class方法](#操作class方法)
* [✔] [遍历](#遍历)
* [✔] [操作css方法](#操作css方法)

## 全局变量

```javascript
(function(window) {
    function _query(selector) {
        this.selector = selector;
        this.node = document.querySelectorAll(selector);
        this.nodes = Array.prototype.slice.call(this.node);
    }
    _query.prototype = {
        constructor: _query
        //这里写dom方法
    }

    function init(selector) {
        return new _query(selector);
    }
    window._ = init;
})(window);
```

## html方法

```javascript
html: function(htmlString) {
    if (!!htmlString) {
        this.nodes.forEach(function(e) {
            e.innerHTML = htmlString.toString();
        });
    }
    return this.nodes[0].innerHTML;
}
```
## text方法

```javascript
text: function(txtString) {
    if (!!txtString) {
        this.nodes.forEach(function(e) {
            e.textContent = txtString.toString();
        });
    } else {
        return this.nodes[0].textContent;
    }
}
```

## 操作class方法

```javascript
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
    return this; //链式调用
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
}
```

## 遍历

包括 `parent` `parents` `prev` `prevAll` `next` `nextAll` `children` 

```javascript
parent: function() {
    var parent = this.nodes[0].parentNode;
    //这里没有做父元素nodeType类型判断
    this.nodes = [parent];
    return this;
},
validElement: function(query, ele) {
    //这个函数类似于querySelector，因为我没有找到数组转 DOMCollection的方法，就写个这个方法
    //来简单替代，用于 parents、find、nextAll、prevAll带查询参数时候。
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
    while (node.parentNode.tagName.toLowerCase() !== "html") {//一直遍历到body元素
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
    var list = Array.prototype.slice.call(node.children);//这里未使用childNodes然后做nodeType判断
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
}
```
## 操作css方法

css 方法传入的参数分别士两个参数，或者一个对象，传入对象时候意味着可以一次修改多个style样式，
若不存在第二个参数时候则使用 getComputedStyle

```javascript
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
```
## 源码及使用

<a href="/show/_query.js" download="_query.js">下载</a>

```html
<!--引入-->
<script src="_query.js"></script>
<!--使用-->
<script>
_("p").text("hello gary");
//和jquery语法相似 把$换成_
</script>
```

## 小结

一直想动手实现 jQuery 但是迟迟没有动手，事实证明有时候还是不要眼高手低为好，我只是写了几个操作DOM和
CSS 样式的方法，并且也没有考虑兼容性的问题就已经写了很多行，可见jquery还是很值得前端学习的，无论是
它自带的基础函数还是DOM\CSS的兼容性处理都非常好，而且代码简洁多了。之后我会尝试使用 `getter setter`
简单模仿 vue 实现 MVVM 框架。