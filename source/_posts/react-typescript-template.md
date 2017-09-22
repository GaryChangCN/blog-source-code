---
title: react-typescript-template
date: 2017-08-30 21:30:17
tags: [cli, react, typescript]
category: typescript
---

## readme

A mouth ago. I have write two cli/templte [两个template](http://garychang.cn/2017/05/14/cli-react/).
But react-typescript-webpack-cli has a big problem, too slow to compile, so I have refactor the code.

The reason of "Why do you write this article in english?" is that I want to improve my english. 
I'll insist on writing though there will be a lot of grammatical mistakes.

<!-- more -->

## reason of slow

Because I had use `ts-loader` to compile `.tsx` files, It will waste too much time when first time to
start webpack-dev-server or build by webpack.

## how to slove

Use tsc watch `.ts` files change and compile immediately. So webpack can receive js files as entry, and
ts-loader is nolonger needed.
When build application, run `tsc` commander then use webpack to package js files. If environment is 
production, use babel compile `.es6` to `.es5` and compress it with `uglifyJsPlugin`.

## nokit

I have use [nokit](https://github.com/ysmood/nokit) as my command line tools, Use it can be very convenient 
to spawn or exec command. It was develop by my mentor.

## source code 

[react-webpack-typescript-cli](https://github.com/GaryChangCN/react-webpack-typescript-cli)

## usege

> dev

```bash
     yarn run dev
```

> production

will convert to es5 and minify

```bash
    yarn run production
```

## tree caglog

```
├── dist
│   ├── bundle.js
│   ├── index.html
│   └── src
│       ├── index.js
│       └── moduleA.js
├── nofile.js
├── package.json
├── readme.md
├── src
│   ├── moduleA.js
│   └── moduleA.tsx
├── tsconfig.json
├── tslint.json
├── webpack.config.js
└── yarn.lock
```