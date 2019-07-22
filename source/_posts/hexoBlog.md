---
title: 使用hexo+github pages 搭建个人博客
date: 2017-05-26 15:48:28
tags: [教程] 
category: [杂]
---

## 需要环境

hexo是一个静态博客生成器，包括当前这个博客，很多博客也是由此构建，类似的构建工具
还有`jekyll`这里只做`hexo`教程。
由于hexo是基于node.js构建的，所以需要nodejs的运行环境。

> 网上已经有很多教程了，但是我还是自己写一下吧

<!--more-->

## 安装node.js

### mac 安装

- 使用brew

```
brew install nodejs
```

- 官网下载

[nodejs官网](https://nodejs.org/zh-cn/)

### windows 安装

- 官网下载安装包

[nodejs官网](https://nodejs.org/zh-cn/)

安装完成后使用命令

```bash
node -v
npm -v
```
![版本号](http://dev.shouedu.cn/assets/hexoblog/nodenpm.png)
查看是否有版本号即可指导是否安装ok

> npm是nodejs的包管理软件。

## 安装hexo

hexo是用nodejs编写的静态博客生成器。具体使用教程在[官网](https://hexo.io/zh-cn/)
下面我只讲解怎么简单使用

```
npm install hexo-cli -g
```

使用命令创建博客目录(myblog)

```
hexo init myblog //这一步是初始化myblog
cd myblog //进入目录
npm install //安装依赖
hexo server //启动测试服务。默认监听在4000端口
```

此时访问 localhost:4000 即可查看到博客

## 编写文章

```
hexo new aricleName //这里是文章名
```
之后会在sorece->_posts目录下看到这个文章的源文件。采用`markdown`编写。

hexo更多api以及使用方式请查看[官方文档](https://hexo.io/zh-cn/api/)


## 配置github pages

github pages 仓库和普通仓库相同。只有名字不同。
例如
![githubpages](http://dev.shouedu.cn/assets/hexoblog/githubio.png)

仓库名为 `xxxx.github.io` 这里xxxx最好是自己的github名字，且不唯一，这里我已经用过了，
所以提示重复。

之后创建仓库即可

## 上传到静态文件到github pages

首先需要安装hexo的git deployer插件，不然手动上传很麻烦
官方文档
[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)

按着官方文档安装配置即可。下面我会简要讲述安装配置过程。
```
npm install hexo-deployer-git --save
```
打开博客根目录下的 `_config.yml` 配置文件，填写

```yml
deploy:
  type: git
  repo: git@github.com:shouDeveloper/shouDeveloper.github.io.git
  branch: master
```

这里repo应该填写刚刚创建的仓库的git地址。这里我用的ssh链接。如果没有配置ssh秘钥可以用https链接
branch填写默认的master分支

保存

### 生成静态文件

```
hexo g //generator简写
```

#### 上传到github pages

```
hexo d //deploy简写
//上述步骤简写

hexo g -d
```
更多hexo api 见[文档](https://hexo.io/zh-cn/api/)

更改博客主题 见[主题](https://hexo.io/themes/)
不同主题也有不同的配置。详情见不同主题自己的文档。

## 访问

浏览器输入刚刚仓库名 `xxx.github.io` 即可。
例如上面我的是 [garychangcn.github.io](https://garychangcn.github.io)
不过我这里用cname转到自己的域名了。