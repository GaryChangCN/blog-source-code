---
title: 利用deviceorientation事件获取手机姿态
date: 2016-08-30 00:14:13
tags: javascript
category: javascript
---

## 兼容性

![兼容性](/images/gyrscope.png)

## api

首先在三位空间内正常拿着手机 x 轴方向由左向右， y 轴从下到上， z 轴垂直于手机屏幕向外。

<!-- more -->

* alpha 围绕着z轴旋转与 y 轴（往往是正北方向）角度差。
* beta 围着x轴旋转与水平线角度差。
* gamma 围着y轴旋转时改变。
* absolute 表示设备是否返回一个绝对值。
* compassCalibreated 表示设备指南针是否被校准过。

## demo

<a href="/show/gyrscope.html" tatget="_Blank">新窗口打开</a>

{% iframe /show/gyrscope.html 300px 300px %}

### demo图片

环境：安卓chrome-dev 53

![demo](/images/gyrscope.png)

## 源码

```js
window.addEventListener("deviceorientation",function(event){
			var console=document.getElementById("console");
			console.innerHTML="Z轴："+event.alpha+"</br>X轴："+event.beta+"</br>Y轴："+event.gamma;
		});
```