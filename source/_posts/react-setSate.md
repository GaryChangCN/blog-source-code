---
title: setState异步问题
date: 2017-04-20 22:33:04
tags: [react]
category: [javascript]
---

## 关于setState

因为react的setState是个异步方法，所以有些时候可能会导致ui响应不及时或者不能通过state来准确的上传数据。
这里可能需要把setState转变成同步方法
<!--more-->

## 回调

[官方文档](https://facebook.github.io/react/docs/react-component.html#setstate)上面描述

```js
setState(updater, [callback])
```

其第二个参数是回调函数，可以通过回调来调用函数。
并且第一个参数也可以数函数形式，这个函数会返回“预修改”后的值。

```js
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

## async await

首先写个方法来封装`setState`成`Promise`

```js
function promiseSetState (state){
	var _this=this;
	return new Promise((resolve,reject)=>{
		_this.setState(state,()=>{
			resolve();
		});
	});
}
```
之后用`async`函数调用

```js
async function(){
	await promiseSetState({value:null});
}
``` 

