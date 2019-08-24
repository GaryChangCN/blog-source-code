---
title: 用vue简单实现知乎日报
date: 2016-07-28 15:21:36
tags: 
	 - javascript
	 - 作品
	 - vue
category: 作品
---

## 前言

使用版本vue1.x。
想用vue构建知乎日报原因很简单，作为一个vue小白很需要亲手做个项目来提升提及以及更加深入了解vue，也希望这个小项目能给刚学习vue的同学一点启发。


## 准备工作

首先要找到知乎日报的api，这里感谢 @[izzyleung](https://github.com/izzyleung/ZhihuDailyPurify) 总结的知乎日报api以及说明 因为原来的api不支持跨域嘛，需要自己代理这些api并允许跨域，这里我只代理了8个接口，接口以及参见本项目github的[readme](https://github.com/GaryChangCN/zhihu-daily-byVuejs/blob/master/server/readme.md)。之后再用nginx来反向代理接口。

## 开发过程

项目参考了vue官方提供的参考项目，使用了 `vue-router` 和 `vue-resource` 这两个插件，并且使用了`vue-cli` 这个脚手架工具来搭建webpack项目。之后就可以正式开发了，UI我大致模仿了知乎日报安卓客户端的UI但是没有实现其全部功能，以后会慢慢完善。对于vue的核心，组件部分，我这里写了6个组件，分别是导航栏组件、侧边栏组件、主页组件、轮播组件、主题列表组件、文章组件，考虑到要模仿客户端UI，这里组件样式全是用sass/css写的。我这里偷懒，响应式布局只写了最外面的container在屏幕宽度大于640px时候宽度调整为640px并且水平居中，所以建议在手机或F12手机模式下浏览demo，另外由于采用了flex布局，请使用现代浏览器。之后就是规划路由啦，然后做做简单的CSS3动画效果，demo就完工了，之后把demo上传到我1M带宽的小水管服务器上，静态文件挂在七牛云上，解决。

（**Tips**：使用sublime的同学可以下载vue syntax highlight 这个插件来语法高亮.vue文件，但是，当你把 `<style>加上lang="sass "`时，emmet语法会失效，我的解决方式是sublime右下角暂时更改语法模式为html，另外格式化.vue代码用HTML-CSS-JS Prettify插件并在其配置文件中加上vue即可）。

## 图片防盗链

当我遇到知乎日报图片防盗链时候我是拒绝的，因为一直提示`403`，我不能确定是`webpack-dev-server`出问题还是`nginx`出问题或者是知乎封了我等等，后来发现如果我挂上ss，或者直接本地打开项目文件，图片是能正常打开的，然后我就意识到是防盗链问题，我的解决方式是用node来转发这些图片并更改请求`referer`头为www.zhihu.com然后问题就解决了，这里有个**花絮**：开始我把node `http.Request` 里面url对象的pathname写成了pathnnme然而我还没有发现导致返回的图片一直是本图片仅限在知乎内使用balabala的，我以为是服务器ip被封都放弃了，在上次检查时发现了这个bug然后图片就能正常显示了。

<!-- more -->

---

## 项目地址
[Demo](http://zhihu.garychang.cn) http://zhihu.garychang.cn 
[Github](https://github.com/GaryChangCN/zhihu-daily-byVuejs) https://github.com/GaryChangCN/zhihu-daily-byVuejs

---

## 部分截图