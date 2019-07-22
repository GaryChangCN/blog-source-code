---
title: npm body-parser 中文api
date: 2016-05-28 19:54:55
tags: npm
category: 翻译
---

#body-parser
#### node.js body parsing 中间件
### 安装
```
$ npm install body-parser
```
### API
```
var bodyPaeser =require('body-parser')
```
#### 可以通过`body-parser` 对象创建中间件，当接收到客户端请求时所有的中间件都会给`req.body` 添加属性，请求体为空，则解析为空`{}` （或者出现错误）。

### bodyParser.json(options)
#### 中间件只会解析 `json`  ，允许请求提任意Unicode编码支持 `gzip` 和 `deflate` 编码。
### options
#### 一个对象，有以下属性
#### inflate
##### 默认为false，true->压缩的请求体会被解压，false->压缩的请求提不被解压。
#### limit
##### 控制请求体最大大小，默认为100kb，当为数字时会转换为bytes，当为字符串时，value值会通过 `bytes`库 转换为字节大小。
#### reviver
##### 此选项会通过JSON.parse直接传给其第二个参数。
#### strict
##### 默认为true，当为true时只接受数组和对象，当为false时会接受任何`JSON.parse` 能接受的。
#### type
#####  `type` 选项用来决定中间件要解析媒体类型。选项可以是一个函数或者是字符串。当为字符串时，可以直接通过`type-is` 库直接传递给选项，字符串也可以为一个扩展名（例如json）、`mime` 类型（application/json、*/* 、*/json）。当为函数时：默认为application/json。
#### verify
##### verify选项，若缺失则为一个函数function（req,res,buf,encoding）,buf为一个Buffer。
### bodyParse.raw(option)
#### 将请求体内容作为Buffer来处理，并返回。支持`gzip` `deflate` 压缩。
#### inflate
#### limit
#### type
#### verify
### bodyParser.text(option)
#### 将请求提内容作为字符串来处理，并返回。支持`gzip` `deflate` 压缩。
#### defaultCharset
#### 若请求头未设置Content-Type则默认为utf8
#### inflate
#### type 
#### verify
### bodyParser.urlencoded(option)
#### 中间件只解析`urlencoded` 请求体，并返回，只支持UTF-8编号文本，支持`gzip` `deflate` 压缩。
#### extend
#### ture->使用queryString库（默认）  false->使用qs库。
#### limit
#### parameterlimit 
##### 指定parameters最长长度，默认1000
#### type
#### verify
