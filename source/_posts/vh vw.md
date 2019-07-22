---
title: 使用vh vw来做页面适配
date: 2016-08-21 10:14:24
tags: css
category: css
---

## vw vh 概念

*vw* 即`viewport width` 的简写，意思是屏幕的宽度。`100vw`等于屏幕宽度。
*vh* 即`viewport height` 的简写，意思是屏幕的高度。`100vh`等于屏幕高度。

### vmax vmin

*vmax* 即 `vw` 和 `vh` 中比较大的那个。
*vmmin* 即 `vw` 和 `vh` 中比较小的那个。

## 浏览器兼容性

![浏览器兼容性](/images/vwvh1.png)

## 页面适配思路

同 `rem` 做页面适配相似。这里 `10vw` 等于十分之一屏幕宽度，和这篇文章中[使用rem来做页面适配](/2016/08/16/8) `1rem` 等于 `10vw`。
剩下的不变，而且不需要js判断来更改根元素的字体大小。
