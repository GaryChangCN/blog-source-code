---
title: 实现一个lazyMan
date: 2017-01-28 21:53:01
tags: other
category: javascript
---

今天年初一，鸡年大吉@所有人

## 前言

之前有看到lazyMan面试题。这里我写实现一次看看。
lazyMan应该是用单例模式来实现。

<!--more-->

## 特点

* 需要一个队列来保存事件
* 保存事件到队列
* 一个next方法来进行下一个事件
* 链式调用

> 感觉仅仅是为了多个异步循环的话还是用递归或者`Promise.all()`方便

## 代码

实现效果

```javascript
LazyMan("gary"); 
//Hi this is gary!
LazyMan("gary").sleep(3).eat("dinner");
// Hi this is gary!
// Wake up after 3s!
// Eat dinner !
LazyMan("gary").sleepFirst(2).eat("dinner");
// Hi this is gary!
// Eat dinner !
// Wake up after 2s!
LazyMan("gary").sleep(2).eat("supper").sleep(1).eat("dinner")
// Hi this is gary!
// Wake up after 2s!
// Eat supper !
// Wake up after 1s!
// Eat dinner !
```

代码

```javascript
function $LazyMan(name) {
    this.tasks = [];
    var _this = this;
    var fun = (function(n) {
        var name = n;
        return function() {
            console.log(`Hi this is ${name}!`);
            _this.next();
        }
    })(name);
    this.tasks.push(fun); //把事件加入到队列中
    setTimeout(function() {
        _this.next(); //下次eventLoop 启动任务
    }, 0);
}

$LazyMan.prototype.next = function() {
    var fn = this.tasks.shift(); //获取当前队列中第一个并且删除队列中第一个
    fn && fn(); //执行
};

$LazyMan.prototype.eat = function(food) {
    var _this = this;
    var fun = (function(food) {
        return function() {
            console.log(`Eat ${food} !`);
            _this.next();
        }
    })(food);
    this.tasks.push(fun);
    return this; //链式调用
};

$LazyMan.prototype.sleep = function(time) { //单位秒
    var _this = this;
    var fun = (function(time) {
        return function() {
            setTimeout(function() {
                console.log(`Wake up after ${time}s!`);
                _this.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fun);
    return this;
};

$LazyMan.prototype.sleepFirst = function(time) {
    var _this = this;
    var fun = (function(time) {
        return function() {
            setTimeout(function() {
                console.log(`Wake up after ${time}s!`);
            }, time * 1000);
            _this.next();
        }
    })(time);
    this.tasks.unshift(fun); //推入
    return this;
};

function LazyMan(name) {  //封装
    return new $LazyMan(name);
}

LazyMan("gary"); 
//Hi this is gary!
LazyMan("gary").sleep(3).eat("dinner");
// Hi this is gary!
// Wake up after 3s!
// Eat dinner !
LazyMan("gary").sleepFirst(2).eat("dinner");
// Hi this is gary!
// Eat dinner !
// Wake up after 2s!
LazyMan("gary").sleep(2).eat("supper").sleep(1).eat("dinner")
// Hi this is gary!
// Wake up after 2s!
// Eat supper !
// Wake up after 1s!
// Eat dinner !
```

## 小结

可见这个过程还是很简单的。主要考察的就是流程控制。

## 参考资料

本文参考了文章 [如何实现一个LazyMan](http://web.jobbole.com/89626/)

