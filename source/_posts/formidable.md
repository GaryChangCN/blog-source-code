---
title: Node.js 使用formidable上传文件及接受POST数据
date: 2016-01-01 19:39:40
tags: npm 
category: 翻译
---

## formidable 
[官方文档](https://www.npmjs.com/package/formidable)

### 安装
```js
$ npm install formidable
```
### 使用
```js
var formidable=require("formidable");
var form=formidable.IncomingForm();
```
### API
#### form的属性及方法 
- encoding 设置字符集 默认UTF-8
- uploadDir 默认文件上传缓存位置 默认为OS_TEMP位置
- type 选择接受是multipart还是urlencoded的Content-Type请求头 默认全部
    - 我之前写过一篇介绍 [HTTP头Content-Type](http://blog.csdn.net/z1233691/article/details/51558406) 的文章
- maxFieldSize 限制文件大小 默认 2mb 单位 字节
- maxDields 限制header Format长度 默认为1000 为0则不限制
- multiples 一次上传多个文件 默认为false 需要在input标签设置HTML5属性 multiple
- hash 
- bytesReceived 目前接收到的字节数。
- bytesExpected 预定总大小 字节
- parse(req,[cb])
  - req 是`HttpIncomingMeassage`对象
  - cb 为callback函数 function(err,field,files)
     - err 错误
     - field 对象 是http请求Format的键值对即application/x-www-urlencoded内容 
     - files 接收到的文件对象（当接受多个文件时为一个数组）
          - files.size 文件大小 单位是字节
          - files.path 缓存的目录及名字
          - files.name 上传时候的文件名
          - files.type 文件后缀类型 `image/gif`之类
          - files.mtime 最后修改时间
  
  ### 事件
  #### `form.on('event',function(){})`
  * progress 
      *  .on('progress',function(bytesReceived,bytesExpected){})
  * field 
      * .on('field',function(name,value){})
  * fileBegin 
      * .on('fileBegin',function(name,value){})
  * file
      * .on('file',function(name,file){})
  * error
      * .on('error'function(err){})
  * aborted
      * .on('aborted',function(){})
  * end
      * .on('end',function(){}) 

### DEMO

#### 客户端

**demo.html**

```html
  <form action="post" enctype="multipart/form-data" method="post">
	<input type="file" name="file" multiple="multiple">
	<input type="text" name="zhang">
	<input type="submit">
</form>
```

#### 服务端

**app.js**

```js
var http = require("http");
var express = require("express");
var app = express(); 
app.use(express.static('public',{"index":"demo.html"}));
var formidable = require("formidable");
app.post('/public/post', function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = __dirname + '/tmp';
    form.multiples = true;
    form.parse(req, function(err, field, files) {
        files.field = field;
        res.json(files);
        console.log(files);
    })
})  
```

#### 运行
```
  $ node app.js
```

##### 添加字段和要上传的文件即可获得返回的json数据同时控制台输出json数据

### 源码

#### [Node.js 使用formidable上传文件及接受POST数据](https://github.com/GaryChangCN/node.js-study-notes/tree/master/Node.js%20%E4%BD%BF%E7%94%A8formidable%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E5%8F%8A%E6%8E%A5%E5%8F%97POST%E6%95%B0%E6%8D%AE)

