---
title: 使用websocket 的ws库构建聊天室
date: 2016-08-19 15:29:41
tags: 
     - javascript
     - websocket
category: 作品
---

## websocket

html5 新api，用于实现持久化连接，且不收跨域影响。通过HTTP 的Updrade头来升级协议。

## 使用方法

```js
//创建实例
var socket=new WebSocket("ws://localhost:xxxx");
//发送数据
socket.send("hello world");
//接受数据
socket.onmessage=function(event){
	console.log(event.data)
}
//初始化事件
socket.onopen=function(){}
//关闭事件
socket.onclose=function(){}
//关闭连接
socket.close()
```

### 服务端

服务端这篇文章我使用了 `ws` 这个库。
```js
npm install ws --save
```

---

### Demo

<a href="/show/websocket.html">新窗口打开</a>
~~服务端随时可能关闭，仅供测试。~~  **已关闭**

#### tips

这里我使用了 `vw` `vh` 来做屏幕适配，之后我的博客会有专门文章来写这个

#### Demo 问题

<!-- more -->

由于使用了 `beforeunload` 事件来从客户端结束连接，但是在移动端对 `beforeunload` 兼容性不好，会导致直接关闭浏览器/页面 连接会依然存在，这里以为朋友给我的建议是使用 *心跳检测* 之后我会有文章来单独写心跳检测。

#### Demo 思路

用户设定昵称，此时传一个json数据给服务器告知新添用户，之后会返回一个对象包括欢迎当前用户以及在线列表，之后更改客户端状态，之后客户端发布消息不会添加用户而只会 *广播* 这个消息。之后注销/退出，会再次更改客户端状态，并告知服务器当前用户退出，服务端会广播此用户退出消息，以及更新用户列表。

###　示例图以及示例代码

#### 示例图片

![输入昵称](/images/ws2.png)
![聊天室页面](/images/ws1.png)

#### 部分代码

详细代码可以在我的github查看

```html
<div class="container">
        <div id="cover">
            <input type="text" id="username" placeholder="请输入昵称">
            <input type="submit" id="ok" value="确定">
        </div>
        <ul id="ul">
            <li>聊天室</li>
        </ul>
        <ul id="user">
        </ul>
        <form action="">
            <input type="text" id="input" required="required">
            <input type="submit" value="submit" id="submit">
        </form>
    </div>
```

```js
var socket = new WebSocket("ws://new.garychang.cn:7777");
document.getElementById("ok").onclick = function() {
    var value = document.getElementById("username").value;
    var name = value ? value : "匿名";
    document.getElementById("cover").style.display = "none";
    msg.name = name;
    msg.log = 0;
    socket.send(JSON.stringify(msg));
    msg.log = 1;
}
window.addEventListener("beforeunload", function(e) {
    msg.log = 2;
    socket.send(JSON.stringify(msg));
    socket.close();
    var confirmationMessage = '确定离开此页吗？';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});
socket.onmessage = function(event) {
    var json = JSON.parse(event.data);
    ul.append(json.msg);
    var tmp = "<li>当前成员</li>";
    json.list.forEach(function(e) {
        tmp += "<li>" + e + "</li>";
    });
    document.getElementById("user").innerHTML = tmp;
}
window.onunload = function() {
    msg.log = 2;
    socket.send(JSON.stringify(msg));
    socket.close();
}
socket.onclose = function() {
    socket.close();
}
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    msg.msg = document.getElementById("input").value;
    socket.send(JSON.stringify(msg));
    document.getElementById("input").value="";
});
```

```node.js
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 7777 });
var msg = {
    list: [],
    msg: null
};
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        var json = JSON.parse(message);
        if (json.log == 0) {
            msg.list.push(json.name);
            msg.msg = "用户：" + json.name + "已加入房间";
            wss.broadcast(JSON.stringify(msg));
        } else if (json.log == 1) {
            msg.msg = json.name + "：" + json.msg;
            wss.broadcast(JSON.stringify(msg));
        } else if (json.log == 2) {
            var index = msg.list.findIndex(function(e, i, a) {
                if (e == json.name) {
                    return i;
                }
            });
            msg.list.splice(index,1);
            msg.msg="用户：" + json.name + "离开了房间";
            wss.broadcast(JSON.stringify(msg));
        }
    });
});
console.log("websocket on 7777");
```