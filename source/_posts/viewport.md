---
title: viewport详解
date: 2016-09-04 14:50:20
tags: css
category: 杂
---

## viewport概念

viewport 是一个移动专属的 `meta` 值，用于设定“视窗口”的各种行为。
因为css中的1px往往不等于移动设备中的1px，因为移动设备像素密度越来越高，所以后来就有移动设备上2px表示css中1px。例如 iphone5 的屏幕像素宽度是640px，在css中既是320px。
总之 viewport 就像一个容器把原本比较大的屏幕挤到特定大小。

## viewport 属性

viewport一般形式如下

```html

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />

```

其中`content` 内容为其属性。

<!-- more -->

* width

值往往是一个正整数或者 `device-width` ，用于定于视窗口的宽度，单位为像素。

* height

值也是一个正整数或者 `device-height` ，用于定义视窗口的高度，单位为像素。

* initial-scale

值为 [0.0-10.0] 之间，用于定义初始缩放值。

* minimum-scale

值为 [0.0-10.0] 之间，用于定义最小缩放比例，必须小于 `maximun-scale` 设置值。

* maximum-scale

值为 [0.0-10.0] 之间，用于定义最大缩放比例，必须大于 `minimum-scale` 设置值。

* user-sacleable

值为 yes/no ，用于确认用户是否能用手势缩放页面，默认为 yes 。


