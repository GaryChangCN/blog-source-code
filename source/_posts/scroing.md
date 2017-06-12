---
title: 作业上传+学生互评打分系统
date: 2016-07-08 17:37:41
tags: 
	 - javascript
category: [作品,项目]
---

#### 安装
```
npm install
```

<!-- more -->
## 启动
```
mongod --dbpath xxx
node app.js
```

#### 简介

本项目采用 *javascript* + *node.js* + *mongodb* 开发完成。学生端采用了谷歌chrome应用商店配色以及我自己封装的 [_Ajax库](https://github.com/GaryChangCN/_Ajax) 。教师端使用了Jquery库和 **Flex** 布局\以及采用了百度*Echart*。后端使用了node.js采用mongodb作为数据库。
#### 界面预览
---
[Github地址](https://github.com/GaryChangCN/Homework-scoring)
--- 


* 学生端
** 学生端上传作业，支持三种格式，可多选上传 ![预览](http://7xw4hd.com1.z0.glb.clouddn.com/1.png)
** 学生端预览+打分页面 ![预览](http://7xw4hd.com1.z0.glb.clouddn.com/2.png)
* 教师端
** 查看学生打分、评论、每组平均分、去除n个最大和n个最小后平均分、输入老师打分 ![预览](http://7xw4hd.com1.z0.glb.clouddn.com/3.png)
** 查看学生作业上传情况以及下载学生作业 ![预览](http://7xw4hd.com1.z0.glb.clouddn.com/4.png)