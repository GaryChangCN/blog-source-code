---
title: 前端实现图片转base64
date: 2017-01-03 16:48:38
tags: ['javascript']
category: 杂
---

## 使用canvas

<!--more-->

新建个`canvas`标签然后用css隐藏。之后获取此canvas元素，使用`toDataURL`方法转换。

```js
var canvas=document.getElementById("xxxx");
var base64=canvas.toDataURL("图片地址");
```

## 使用 FileReader

使用 `FileReader` 的 `readAsDataURL` 方法，读取图片并把base64数据保存到其result属性中。

```js
var reader=new FileReader();
var file=fileList[0];//这里fileList是通过 File API 获取的文件数组（开启multi）
reader.readAsDataURL(file);
var base64=reader.result;
```

## 用途

把图片转成base64形式用处主要是减少HTTP请求、实时预览要上传的图片。
如果通过canvas的话还能做图片的进一步加工处理。