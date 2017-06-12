---
title: 利用手机姿态使用websocket控制客户端css长方体姿态
date: 2016-08-30 16:17:52
tags: 
	 - javascript
	 - css
	 - websocket
category: 作品
---

## 前言

我之前有篇文章写了[利用deviceorientation事件获取手机姿态](http://garychang.cn/2016/08/30/gyrscope/)。既然可以获取手机在三位空间内的与坐标轴角度，也就可以通过这来控制网页中css长方体的姿态。至于在两个网页/客户端传输数据，当然是用websocket最好了。这里刚好我之前做过两个小demo关于这个。

* [CSS3 3D立方体](http://garychang.cn/2016/08/12/3Dcube/)
* [使用websocket 的ws库构建聊天室](http://garychang.cn/2016/08/19/websocketlibWS/)

## 思路


这个 Demo 分为客户端，控制端和服务端。客户端是一个用`css3`写的三维的长方体，只接受`websocket`数据。
<!-- more -->
控制端使用`deviceorientation`事件来获取手机姿态并通过`websocket`发送姿态数据。服务端就是一个使用`ws`库的`websocket` 服务器，这里我监听的端口是`5656`。

### bug

这里有个问题就是Z轴在临界值会直接从180°变成-180°，Y轴会在临界值从 90°变成-90°，我想了很久也没有找到解决方法，有好的解决方法可以提[issues](https://github.com/GaryChangCN/gyrscope-control-css-cube/issues)

## 使用

源码地址 [gyrscope-control-css-cube](https://github.com/GaryChangCN/gyrscope-control-css-cube)

```
git clone https://github.com/GaryChangCN/gyrscope-control-css-cube.git
npm install
npm start
//之后修改客户端和控制端 websocket 协议的地址为你服务端所在的局域网地址

```

## 示例

![示例图片](/images/gyrscopeDemo.gif)

<video src="http://7xw4hd.com1.z0.glb.clouddn.com/gyrscope.mp4" controls="controls" width="300px"></video>

[演示视频](http://7xw4hd.com1.z0.glb.clouddn.com/gyrscope.mp4)