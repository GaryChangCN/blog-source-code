---
title: HTTP头Content-Type
date: 2016-01-01 09:12:30
tags: http
category: 杂
---
## Content-Type

* application/x-www-form-urlencoded
    - 将数据编码为name->value的键值对
* multipart/formdata
   - 将数据编码为一条信息
* text/plain
 - 数据以文本形式传输
 - text
 - json
 - xml
 - html
 - zip
* image/ipeg
 - 传输图片
 - png
 - gif
* video/mp4
 - 视频
 - rmvb 

### form 的enctype
* application/x-www-form-urlencoded 默认
* miltipart/form-data
### get
#### 使用application/x-www-form-urlencoded将name->value转换为url里面的查询字符串
### post
#### 将数据封装到http 的请求体中。