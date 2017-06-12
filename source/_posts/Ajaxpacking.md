---
title: JavaScript Ajax封装 类似jQuery Ajax
date: 2016-04-17 14:12:22
tags: javascript
category: javascript
---

# _Ajax

## 简介

简单封装的ajax库
支持post和get方法 兼容IE7及以上浏览器
和jQuery Ajax格式相似

## 源码

[源码](https://github.com/GaryChangCN/_Ajax)

## 更新

### 已更新jsonp跨域支持

## api

### option

```js
  _Ajax({
                "url":"",
                "method":"",//默认get
                "async":true,//默认为false
                "data":{
                },
                "header":{                    
                },
                "cache":true,//默认为false
                "dataType":"",//"text"  "json"  "xml"  "jsonp"默认为text
                success:function(){
                },
                beforeSend:function(){
                }
            })
```
### libs: 

通过 `<script>标签引入<script src="lib/_Ajax.min.js" type="text/javascript" charset="utf-8"></script>`
       通过CDN获取`http://ajax-10030624.file.myqcloud.com/_Ajax.js` `http://ajax-10030624.file.myqcloud.com/_Ajax.min.js`

### example

```html
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8" />
        <title>_Ajax_Demo</title>
        <script src= " lib/_Ajax.min.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
        <script type="text/javascript">
            _Ajax({
                "url":"server.php",
                "method":"post",//默认get
                "async":true,//默认为false
                "data":{
                    "key":"value",
                    "key2":"value2"
                },
                "header":{
                    "h":"c",
                    "h2":"c2"                    
                },
                "cache":true,//默认为false
                "dataType":"json",//"text"  "json"  "xml"  默认为text
                success:function(data){
                },
                beforeSend:function(){
                }
            })
        </script>
    </body>
  </html>
```