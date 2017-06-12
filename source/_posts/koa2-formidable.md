---
title: koa2-formidable
date: 2017-03-29 23:47:45
tags: [npm]
category: [杂]
---

## 介绍

简单封装的`formidable`在`koa2`的中间件。
因为今天我把我的毕设后台从koa1升级到koa2了，全面使用`async`函数，所以之前用的
`koa-formidable`就不合适了，索性就自己封装下。

<!--more-->

## 使用

```bash
npm install koa-formidable --save
```

```js
var formidable=require('koa2-formidable')
var Koa = require('koa')
var app =new Koa()
app.use(formidable(opt));
```

其中`opt`即是 `formidable`的`options`

## 源码

[koa2-formidable](https://github.com/GaryChangCN/koa2-formidable)

```js
var formidable = require('formidable')
module.exports=function (opt) {
    return async function(ctx,next){
        var form=new formidable.IncomingForm();
        for(let key in opt){
            form[key]=opt;
        }
        await new Promise((reslove,reject)=>{
            form.parse(ctx.req,(err,fields,files)=>{
                if(err){
                    reject(err);
                }else{
                    ctx.request.body=fields;
                    ctx.request.files=files;
                    reslove();
                }
            });
        });
        await next();
    }
}
```