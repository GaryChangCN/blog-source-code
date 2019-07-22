---
title: 2016年阿里秋季校招前端题
date: 2016-09-08 22:18:03
tags: javascript
category: javascript
---

## 吐槽

首先这个博文不是内容*不是*全部的前端题目，而只是我考的其中一道题，每个人的题目也不一样，写这个文章是*自我安慰*下昨天答错的题，尽管也没什么用了。

不过不得不说，阿里题目出的比京东强多了，但是编程题不能离开浏览器用本地编辑器也是很不爽的，但是我还是切出来用编辑器了。从今年秋季内推面试挂了到昨天笔试不理想，我想我的校招阿里之路也再见了。

## 题目

题目是大概这样的：
定义个查找方法和排序方法来查找数据，没有规定 `.orderBy()` 或者 `where()` 是不是可选的。

```js

var data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' }
];

var find = function(origin){
    //your code are here...
}

//查找data中，符合条件的数据，并进行排序
var result = find(data).where({"title": /\d$/}).orderBy('userId', 'desc');
console.log(result);        
// 返回值
// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];

```

## 解答

方法很简单，在 `find` 函数中定义个构造函数并返回其实例。给这个构造函数添加方法就行。没有用到原型链什么的，当时想多了 :-( 

```js

var find = function(data) {
    function A(data) {
        this.$data = [];
        var $this=this;
        this.where = function(where) {
            data.forEach(function(e) {
                for (var key in where) {
                    if (where[key] instanceof RegExp) {
                        if (where[key].test(e[key])) {
                            $this.$data.push(e);
                        }
                    } else if (where[key] == e[key]) {
                        $this.$data.push(e);
                    }
                }
            });
            return this;
        };
        this.orderBy=function(id,order){
            this.$data.sort(function(a,b){
                if(order="desc"){
                    return b[id]-a[id];
                }
            });
            return this.$data;
        }
    };
    return new A(data);
}
var result = find(data).where({ "title": /\d$/ }).orderBy('userId', 'desc');
console.log(result);
//[ { userId: 19, title: 'title2' },
// { userId: 8, title: 'title1' } ]

```