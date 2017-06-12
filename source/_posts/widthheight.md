---
title: js获得浏览器宽高、屏幕宽高
date: 2016-08-15 21:02:59
tags: javascript
category: javascript
---
### 高度有关

```js
//浏览器窗口高度
window.outerHeight
//浏览器可视区域高（包括滚动条）
window.innerHeight
//ps：在部分版本QQ浏览器上innerHeight和outerHeight值相同
//浏览器可视区域高（不包括滚动条）
document.documentElement.clientHeight
//网页总高度
document.body.clientHeight
//显示器可视高度
window.screen.height
//显示器可用高度（例如去除底部任务栏）
window.screen.availHeight
```

### 宽度有关

```js
//浏览器窗口宽度
window.outerWidth
//浏览器可视区域宽度（包括滚动条）
window.innerWidth
//浏览器可视区域宽度（不包括滚动条）
document.documentElement.clientWidth
//网页总宽度
document.body.clientWidth
//显示器可视宽度
window.screen.width
//显示器可用宽度（例如去除侧边任务栏）
window.screen.availWidth
```
### 图片高度示意

<!-- more -->

![获取高度示意](/images/getSIze.png)