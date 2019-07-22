---
title: js模拟alert,confirm,prompt Demo
date: 2016-08-21 20:53:25
tags: 
	 - javascript
	 - 作品
category: 作品
---

## 目的

如果使用原生alert、confirm 等，若用户设置禁止弹窗会影响网页功能，所以使用模拟alert等更为合适。

## 思路

新建个构造函数，在其上加上属性方法来实现 alert、confirm、prompt功能。

## 部分代码

### css部分

css 部分不多陈述，主要就是把这几个弹出框设置成 `position:fixed` 就行了，其余样式自己解决。

### html部分

这里我对三个弹出框用了三个容器包裹，大部分样式相同。页面基础样式为了方便使用了 `flex` 布局，详细flex布局可以参照我之前的文章。 [flex布局语法简介](/2016/08/20/14)

```html
<div class="alert layout">
        <div class="title">提示</div>
        <div class="close">+</div>
        <div class="content"></div>
        <div class="control">
            <a href="#" class="enter" id="alertEnter">确定</a>
        </div>
    </div>
    <div class="confirm layout">
        <div class="title">提示</div>
        <div class="close">+</div>
        <div class="content"></div>
        <div class="control">
            <a href="#" class="enter" id="confirmEnter">确定</a>
            <a href="#" class="cancel" id="confirmCancel">取消</a>
        </div>
    </div>
    <div class="prompt layout">
        <div class="title">输入内容</div>
        <div class="close">+</div>
        <input type="text" id="userInput">
        <div class="control">
            <a href="#" class="enter" id="promptEnter">确定</a>
        </div>
    </div>
    <div class="container">
        <div>alert</div>
        <button id="oAlert">原生alert</button>
        <button id="iAlert">模拟alert</button>
        <div>confirm</div>
        <button id="oConfirm">原生confirm</button>
        <button id="iConfirm">模拟confirm</button>
        <div>prompt</div>
        <button id="oPrompt">原生prompt</button>
        <button id="iPrompt">模拟prompt</button>
    </div>
```
### javascript部分

<!-- more -->

首先创建构造函数 `Layout`

```js
function Layout() {
    this._confirm = null;
    this._prompt=null;
}
```

给其加上监听属性的方法。

```js
Layout.prototype.$watch = function(obj, prop, callback) {
    if (!obj.$property) {
        obj.$property = function(prop, value) {
            if (this[prop] != value) {
                this[prop] = value;
                return callback(this);
            }
            return this;
        };
    }
}
```
在其原型上写上以下三种方法

```js
Layout.prototype.alert = function(data) {
    var _this = this;
    document.querySelector(".alert>.content").innerText = data;
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".alert>.close").onclick = function() {
        _this.close();
    }
    document.querySelector("#alertEnter").onclick = function() {
        _this.close();
    }
}
Layout.prototype.confirm = function(data) {
    var _this = this;
    document.querySelector(".confirm>.content").innerText = data;
    document.querySelector(".confirm").style.display = "block";
    document.querySelector(".confirm>.close").onclick = function() {
        _this.close();
    }
    document.querySelector("#confirmEnter").onclick = function() {
        _this.$property('_confirm', true);
        _this.close();
    }
    document.querySelector("#confirmCancel").onclick = function() {
        _this.$property('_confirm', false);
        _this.close();
    }
}
Layout.prototype.prompt=function(data){
	var _this = this;
    document.querySelector(".prompt>.title").innerText = data;
    document.getElementById("userInput").value="";
    document.querySelector(".prompt").style.display = "block";
    document.querySelector(".prompt>.close").onclick = function() {
        _this.close();
    }
    document.querySelector("#promptEnter").onclick = function() {
    	var value=document.getElementById("userInput").value;
        _this.$property('_prompt', value);
        _this.close();
    }
}
//关闭弹窗方法。
Layout.prototype.close = function() {
    var layout = document.querySelectorAll(".layout");
    Array.prototype.slice.apply(layout).forEach(function(e) {
        e.style.display = "none";
    });
}
```
基础操作DOM方法及`Layout` 方法使用方式

```js
document.getElementById("oAlert").onclick = function() {
    alert("这是原生alert");
}
document.getElementById("iAlert").onclick = function() {
    var a = new Layout();
    a.alert("这是模拟alert");
}
document.getElementById("oConfirm").onclick = function() {
    var c = confirm("这是原生confirm");
    if (c) {
        alert("刚点击了确认");
    } else {
        alert("刚点击了取消");
    }
}
document.getElementById("iConfirm").onclick = function() {
    var a = new Layout();
    a.confirm("这是模拟confirm");
    a.$watch(a, '_confirm', function(obj) {
        if(a._confirm){
        	a.alert("刚点击了确认");
        }else{
        	a.alert("刚点击了取消");
        }
    });
}
document.getElementById("oPrompt").onclick=function(){
	var p=prompt("这是原生prompt","")
	if(p){
		alert("刚刚输入的是:"+p);
	}
}
document.getElementById("iPrompt").onclick=function(){
	var a=new Layout();
	a.prompt("这是模拟prompt");
	a.$watch(a, '_prompt', function(obj) {
        if(a._prompt){
        	a.alert("刚刚输入的是:"+obj._prompt);
        }else{
        	a.alert("刚刚输入的是:"+obj+_prompt);
        }
    });
}
```

## Demo

### <a href="/show/alert.html" target="_blank">新窗口打开</a>

{% iframe /show/alert.html 300px 400px %}