---
title: ES6 promise 对象
date: 2016-08-26 15:26:32
tags: 
	 - javascript
	 - ES6
category: javascript
---

## 含义

* 状态

  promise 对象代表一个异步操作，有三种状态：
  * Pending 进行中
  * Resolved 已完成 （又称Fulfilled）
  * Rejected 失败

* 特点
  一旦状态改变就不会在改变。

## 目的

解决回调写法的混乱以及一个统一标准。


以下文字至“用法”前来源于 [原文连接](https://segmentfault.com/a/1190000006708151)

假设有一个数据库保存操作，一次请求需要在三个表中保存三次数据。那么我们的代码就跟上面的代码相似了。这时候假设在第二个db.save出了问题怎么办？基于这个考虑，我们又需要在每一层回调中使用类似try...catch这样的逻辑。这个就是万恶的来源，也是node刚开始广为诟病的一点。

```js
db.save(data, function(data){
    // do something...
    db.save(data1, function(data){
        // do something...
        db.save(data2, function(data){
            // do something...
            done(data3); // 返回数据
        })
    });
});
```

另外一个缺点就是，假设我们的三次保存之间并没有前后依赖关系，我们仍然需要等待前面的函数执行完毕, 才能执行下一步，而无法三个保存并行，之后返回一个三个保存过后需要的结果。（或者说实现起来需要技巧）

<!-- more -->

所以解决这个问题的库如 `Q` 等就出现了，直到 ES6 统一了标准。

## 用法

```js
var promise = new Promise(function(resolve,reject){
	//....async code
	if(/* 异步成功*/){
		resolve(value);
	}else{
		reject(err);
	}
})
```

Promise 构造函数接受一个一名函数作为参数，这个函数有两个参数，分别为 `reslove` 和 `reject`。

* resolve 作用是将promise对象由未完成变为成功。
* reject 作用是将promise对象由未完成变成失败

Promise实例生成后可以使用 `then` 方法**分别**给 `Resolve` 和 `Rejected` 指定回调函数

```js
promise.then(function(value){
	//成功
},function(err){
	//失败
});
```

### 例子

```js
funtion timeout(ms){
	return new Promise(function(resolve,reject){
		setTimeout(resolve,ms);
	});
}

timeout(1000).then(function(value){
	console.log(value);
});
```

上述代码timeout函数返回一个 `Promise` 实例，表示1秒后的结果，当运行指定函数手， `Promise` 实例状态变为`resolved` 此时就会触发 `then` 方法绑定的回调函数。

> *promise*的 `then` 方法依然会返回一个`Promise`实例（不等于原来那个），所以就能再用下一个 `then` 来处理。

## Promise 数据流动

引用内容同上

第一个then中的两个回调函数决定第一个then返回的是一个什么样的Promise对象。

* 假设第一个`then`的第一个回调没有返回一个`Promise`对象，那么第二个`then`的调用者还是原来的`Promise`对象，只不过其`resolve`的值变成了第一个`then`中第一个回调函数的返回值。

* 假设第一个`then`的第一个回调函数返回了一个`Promise`对象，那么第二个`then`的调用者变成了这个新的`Promise`对象，第二个`then`等待这个新的`Promise`对象resolve或者reject之后执行回调。

```js
getJSON("/post.json").then(function(json){
	return json.post;
}).then(function(post){
	//......
});
```
上面代码使用`then`方法依次制订了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数传入第二个回调函数。
采用链式`then` 可以指定一组按照次序调用的回调函数，这时候，前一个回调函数可能返回的还是一个Promise对象（即有异步操作），而后一个回调函数就会等待该Promise对象的状态发生变化时候在被调用。如下：

```jsgetJSON("/post.json").then(function(json){
	return json.post;
}).then(function pA(post){
	//......
},function pB(err){
	//err.....
});
```
上面代码中，第一个`then`方法指定的回调函数返回的是另一个`Promise` 对象。这时候，第二个`then`方法指定的回调函数就会等待这个新的`Promise`对象状态发生变化。若变为 `resolve` 则会调用 pA 函数。若变为`rejected` 则会调用 pB 函数。

> 在这个“链条”上遇到的错误将一直向后 `reject` 。直到有处理为止。

##　Promise.prototype.catch()

此方法接受一个回调函数来处理错误。即是 `.then(null,rehection)` 的别名。

## Promise.all()

此方法将多个`Promise` 实例包装成一个新的实例。**并非 Promise.prototype.all**

> var p = Promise.all([p1,p2,p3])

上述代码中，`Promise.all` 接受一个数组作为参数，数组每项都是一个 Promise 的实例，若不是就会调用 `Promise.resolve`方法将其转为 Promise 实例。

* 只有 p1，p2，p3 状态都变成 `resolved` ，p的状态才会变成 `resolved` ，此时 p1，p2，p3 的返回值会组成一个数组传递给 p 的回调函数。
* 只要 p1，p2，p3 状态变成 `rejected` ，p的状态就会变成 `rejected` 第一个被 `rejected` 的实例返回值会传递给 p 的回调函数。

## Promise.race()

Promise.race 方法同样是将多个 Promise实例包装成一个新的 Promise 实例。

> var p = Promise.race([p1,p2,p3]);

上面代码中，只要p1，p2，p3 中任何一个实例状态改变，p 的状态就是跟着改变，最先改变的实例将会传递给 p 的回调函数。

## Promise.resolve()

将现有对象转换为 Promise 对象。

## Promise.reject()

此方法放回一个新的 `Promise` 实例，状态为 `Rejected` 。