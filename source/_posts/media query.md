---
title: 使用media query 实现响应式布局
date: 2016-08-18 17:55:07
tags: 
	 - javascript
	 - css
category: css	 
---

## media query 概念

media query 即是媒介查询，可以根据浏览器的不同特性来应用不同的css样式。
例如：

```html
  <link href="css/reset.css" rel="stylesheet" type="text/css" media="screen" />
  <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
  <link href="css/print.css" rel="stylesheet" type="text/css" media="print" />
```
或者

```html
<style type="text/css" media="screen">
	*{
		padding: 0px;
	}
</style>
```

以下我只讨论使用 screen 特性

## media query screen

### 例子

例如

```html
<link rel="stylesheet" href="style.css" media="screen and (min-width:640px) and (max-width:1080px)">
```

或者

<!-- more -->

```html
<style>
	@media screen and (min-width:640px) and (max-width:1080px)"{
		*{
			padding:0px;
		}
	}
</style>
```

都意味着当屏幕大小为640px和1080px之间时候，使用style.css样式，或者此media query 内样式。
当然除了 `and` 也有 `only` 这个限制条件。

## 使用

media query 是响应式布局的核心，所以我们通过限定不同屏幕/浏览器宽度而应用不同样式，来实现响应式设计。

## Demo

<a href="/show/mediaquery.html" target="_Blank">新窗口打开</a>

这里我限定了四个宽度

* 大于1024px
* 560px和1024px之间
* 320px和560px之间
* 小于320px

分别对应的demo布局如下图

![大于1024px](/images/mq1.png)
![560px和1024px之间](/images/mq2.png)
![320px和560px之间](/images/mq3.png)
![小于320px](/images/mq4.png)

## 相关文章

<a href="http://garychang.cn/2016/08/16/8/" target="_Blank">使用rem来做页面适配</a>