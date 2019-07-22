---
title: angularjs 全局非阻塞消息通知
date: 2016-09-22 14:28:22
tags: 
	 - angularjs
	 - javascript
category: javascript
---

## 目的

因为我的一个`angularjs` [fruit-angular](/2016/09/22/fruit-angular/) 项目要用的关系，而我又不想用`bootstrap`或者什么消息通知库之类，所以自己写了个。

## 预览

<!-- more -->

![图片预览](/images/angularmessage.png)

## 思路

新建个`service` 数据依附在`$rootScope` 上，之后在新建个`指令` ，再把指令放在根html上。

## 代码

```js
//app.js 
var app = angular.module('xxx', []);

//service
app.factory('alertService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var alertService = {};
    $rootScope.alerts = [];
    alertService.closeAlert = function(alert) {
        alertService.closeAlertIdx($rootScope.alerts.indexOf(alert));
    };

    alertService.closeAlertIdx = function(index) {
        $rootScope.alerts.splice(index, 1);
    };

    alertService.add = function(msg) {
        var tmp = {
            msg: msg,
            close: function() { alertService.closeAlert(this) }
        }
        $rootScope.alerts.push(tmp);
        $timeout(function() {
            $rootScope.alerts.shift();
        }, 2500);
    };
    return alertService;
}]);

```
上述代码中，我给 `$rootScope` 添加了alerts属性，是一个数组，用来存储消息。
之后给 alertService 服务添加了几个方法，分别用来添加消息，关闭/删除消息，以及设定定时器，即2.5秒后自动删除第一条消息。

```js

//directive

app.directive('myAlert', function() {
    return {
        restrice: 'ECMA',
        replace: true,
        scope: {
            myData: '='
        },
        templateUrl: 'template/alert.html'
    };
});

```

上述代码，我添加个`指令`，名字为`myAlert`.

```html

//template/alert.html

<div style="position: fixed;z-index: 70;top: 0.2rem;">
    <div ng-repeat="item in myData" style="position: relative;width:6rem;min-height: 1rem;color: #0b9058;;border-radius:0 0.2rem 0.2rem 0;margin-bottom: 0.3rem;padding:0.2rem 0.6rem 0.2rem 0.2rem;background-color:rgba(252,253,253,0.7);">
        <p style="font-size: 0.4rem;">{{item.msg}}</p>
        <span  ng-click="item.close()" style="position: absolute;right: -0.1rem;top:-0.1rem;color:#fcfdfd;background-color: #0b9058;border-radius: 50%;width: 0.5rem;height: 0.5rem;text-align: center;line-height: 0.5rem;cursor: pointer;font-size: 0.3rem;">×</span>
    </div>
</div>


//index.html

<my-alert my-data="alerts"></my-alert>

```

上述代码，我添加了之前指令对应的模版文件，这里用了行内样式。之后在index.html里面引入指令。

