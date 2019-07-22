---
title: generator-promise
date: 2016-10-16 14:09:24
tags:
	 - javascript
	 - ES6
category: javascript
---

## generator 函数和 promise 对象的结合使用

当使用generator函数进行“流程管理”或使用`koajs`时候，往往需要使用异步操作。

<!--more -->

```js
fun asyncF(){
    return new Promise(function(resolve,reject){
        resolve('ok');
    })
}
//asyncF 函数是一个promise对象

var g=function*(){
    var F=yield asyncF();
    console.log(F);
}
//g是一个generator 函数
```

这样就可以在`generator`函数中使用`promise`了。

## 在 koajs 中使用promise

[参考链接](http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/)

```js
var koa = require('koa'),
    app = koa();
 
app.use(function *() {
 
    var city = yield geolocation.getCityAsync(this.req.ip); //geolocation.getCityAsync是一个异步操作
    var forecast = yield weather.getForecastAsync(city);//也是一个异步操作
 
    this.body = 'Today, ' + city + ' will be ' + forecast.temperature + ' degrees.';
});
 
app.listen(8080);
``` 
