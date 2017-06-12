---
title: 在koa1.0中使用mongoose的Promise
date: 2016-12-09 21:48:55
tags: [mongodb,ES6,node.js]
category: javascript
---

## 在mongoose使用Promise

mongoose的Promise使用起来还是很方便的只要在查询语句后面根成`exec()`方法即可。

例如

```js
db.User.findOne({}).exec()
```

这时候返回的即是一个Promise对象。

## 在koa中使用Promise

只需在promise前面加上 `yield` 即可获取promise reslove时候的结果，如果需要捕获promise reject结果需要把整个语句放入`try-catch`中

例如

<!--more-->

```js
try{
    var a=yield db.User.findOne({}).exec();
    this.body=a;
}catch{
    this.body="false";
}
```

当然`yield`之后的promise可以用`then()`方法再`return`一个promise对象，当然这些都是promise里面东西。

## 其他

在实际项目中有个问题当时困扰了我很久就是mongoose的`objectId()`尽管用http返回后显示的是一个字符串且值就是`_id`但是实际上他还是一个`object`，当然之后我使用`toString()`方法转成字符串后使用mongodb的
查询对象是没问题的，但是如果不变成字符串，使用mongodb操作对象例如 `$pull` `$push` `$in` 是不行的，还有就是使用`view`做渲染时候也是不行的。

