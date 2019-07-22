---
title: 使用rem来做页面适配
date: 2016-08-16 22:06:26
tags: 
	 - javascript
	 - css
category: css
---

## 思路

因为rem单位的特殊性，其是根据根元素`<html>`的字体大小来作为单位的，所以只需修改根元素的字体大小即可改变整个页面大小甚至是布局。

#### 根据 mediaquery来设置

通过css `mediaquery` 来限定不同屏幕宽度而设置根元素的字体大小来实现适配。

#### 使用javascript判断

<!-- more -->

首先在头部加上

```html

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />

```

其次使用js获得浏览器窗口宽度，这里我之前有篇文章详细说明了获取屏幕宽度 <a href="/2016/08/15/10/" target="_Blank">js获得浏览器宽高、屏幕宽高</a>

其次把宽度除以10设为`<html>`的字体大小，即rem大小为十分之一浏览器窗口宽度

```js

function setRem() {
    var width = document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth;
    var rem = width / 10;
    document.querySelector("html").style.fontSize = rem + "px";
}

```
然后监听 `resize` 事件来实时改变

```js

window.addEventListener("resize", function() {
    setRem();
});

```

## Demo

#### <a href="/show/rem.html" target="_Blank">新窗口打开Demo</a>