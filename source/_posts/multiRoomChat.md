---
title: 多房间聊天室
date: 2017-07-26 14:39:07
tags: 
     - javascript
     - websocket
category: 作品
---

## 演示

<a href="/show/multiRoomChat.html" target="_blank">新窗口打开</a>

## 源码 

[github](https://github.com/GaryChangCN/multi-room-chat)

## Doc

[中文](#多房间聊天室) [English](#chat-room)

## 多房间聊天室

多房间聊天室，首次进入需要创建个昵称（关闭浏览器会清除昵称），之后可以选择创建一个房间，或者加入一个房间，
加入房间需要输入房间号。

### 使用工具

* socket.io
* react及周边

## 使用

启动服务器

```
cd server && yarn start
```
websocket 服务端口在 3333

启动客户端（开发版本）

```
cd client && yarn run dev
```
客户端在端口9900

构建客户端 

```
cd client && yarn run build
```
构建后的目录在 client/dist下

## chat-room

Multi-room chat room, you should enter nickname at the first time when you use this project,
and nickname will be cleared if close the browser. After enter nickname, you can choose create
a room or join a room. Room number is needed when join a room.

## Build by

* socket.io
* react,redux,react-redux,react-router

## Usage

run server 


```
cd server && yarn start
```
websocket port on 3333

run client（development version）

```
cd client && yarn run dev
```

client port on 9900

build client

```
cd client && yarn run build
```

## LICENSE

[MIT](/LICENSE)
