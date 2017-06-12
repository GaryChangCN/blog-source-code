---
title: gulp配合BrowserSync实现实时刷新
date: 2017-01-11 12:53:40
tags: [配置]
category: [杂]
---

## BrowserSync

安装

```bash
npm install  browser-sync -g
```

<!--more-->

BrowserSync 自带了静态文件服务器并且使用websocket实现实时刷新，还可以多端进行同时操作，例如手机端和PC端同时打开一个网页，手机端滚动，PC端回跟着滚动，也可以配合gulp或者grunt使用，我对gulp熟悉一点，这里使用gulp。

## gulp

配置文件及功能注释

```js
//gulpfile.js

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload=browserSync.reload; //引入自动刷新
gulp.task('browser-sync', function() {
    browserSync.init({ //初始化 BrowserSync
        injectChanges:true, //插入更改
        files: ["*.html", "*.css", "*.js"], //监听文件类型来自动刷新
        server: {
            baseDir: "./xxx" //目录位置
        },
        ghostMode: {  //是否开启多端同步 
            click: true,  //同步点击
            scroll: true //同步滚动
        },
        logPrefix: "browserSync in gulp", //再控制台打印前缀
        browser: ["chrome"], //运行后自动打开的；浏览器
        port: 80 //使用端口
    });
    gulp.watch(['*.html', '*.css', '*.js'], {cwd: 'canvas'}, reload); //gulp监听的文件更改
});
gulp.task("default",["browser-sync"]); //使用default 控制台直接运行gulp即可

```


