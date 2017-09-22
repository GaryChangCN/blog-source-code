---
title: 两个template
date: 2017-05-13 21:34:52
tags: [template,react]
category: [react]
---

## 前言

为了日常及工作使用，我写了两个构建工具模板 [react-webpack-typescript-template](https://github.com/GaryChangCN/react-webpack-typescript-template)
和[react-redux-template](https://github.com/GaryChangCN/react-redux-template)

<!--more-->

## 使用redux

```
git clone git@github.com:GaryChangCN/react-redux-template.git
yarn install
yarn run dev //开发环境
yarn run build //生产环境
```
开发环境不压缩代码，开启react的调试模式，只把.jsx编辑成ES5。 生产环节压缩代码，开启react生产环境模式，编译成es5。

## 使用typescript

```
git clone git@github.com:GaryChangCN/react-webpack-typescript-template.git
yarn install
yarn run dev //开发环境
yarn run build //生产环境
```
开发环境不压缩代码，开启react的调试模式，只把.tsx编辑成ES6。 生产环节压缩代码，开启react生产环境模式，编译成es5。

## 关于bebel
昨天我阅读了babel以及周边库的用处，感觉前端现阶段已经很难离开babel了，有机会会记录下来。