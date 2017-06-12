---
title: nodejs的EventEmitter
date: 2016-12-15 11:59:44
tags: node.js
category: javascript
---

## EventEmitter 

这里我观看了 @Richard Gong 的<a href="https://www.youtube.com/watch?v=zgnKk7jZ6Y0">node.js高级编程03：events对象</a>以及查阅书籍做出的简单模仿（ES6写法）。

## 构造

首先新建个名字为 EventEmitter 的 class 。
之后给其添加属性以及原型方法。

<!--more-->
```js

class EventEmitter {
    constructor() {
        this._events = {

        }
    }
    emit(type) {
        var funL = this._events[type];
        var args = Array.from(arguments).slice(1);
        funL.forEach(function(e) {
            e(...args);
        })
    }
    addListener(type, func) {
        this._events = this._events || {};
        if (!this._events[type]) {
            this._events[type] = [];
        }
        this._events[type].push(func);
    }
    removeListener(type,func){
        this._events[type].splice(this._events[type].indexOf(func),1);
    }
    on(type, func){
        this.addListener(type, func)
    }
}

```
上述代码中。`on` 和 `addListener` 本质上是一样的；

## 使用

首先实例化 EventEmitter 然后添加监听事件以及触发事件。

```js

var emitter = new EventEmitter();
emitter.addListener('test', function(a1, a2) {
    console.log(a1+a2); 
});
emitter.on('test', function(a1, a2) {
    console.log(a2);
});
emitter.emit('test', "augument1", "argument2");
emitter.emit('test', "augument3", "argument4");
//console
// augument1argument2
// argument2
// augument3argument4
// argument4

```

## 源码

### <a href="/show/EventEmitter.js" target="_blank">源码</a>