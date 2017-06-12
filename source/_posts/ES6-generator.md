---
title: ES6 Generator 函数
date: 2016-08-27 21:59:42
tags:
	 - javascript
	 - ES6
category: javascript
---

## 简介

`Genertor` 函数是ES6提供的一种异步编程解决方法，从语法上，首先从语法上可以理解成一个成一个状态机，封装了多个内部状态。

执行 `Generertor` 函数会返回一个遍历器对象。也就是说， `Generator` 函数处理是状态机，还是一个遍历器对象生成函数。返回的遍历器对象，一次遍历`Generator`函数内部每一个状态。

<!-- more -->

## 形式

```js
function* generator(){
	yield 'hello';
	yield 'world'
	return 'end';
}

var g= generator();
```

上述代码定义了一个`Generator` 函数。内部有两个 `yield` 语句（`'hello'` 和 `'world'`）和一个`return`语句（用于结束执行）。

## 使用

```js
console.log(g.next());
//{ value: 'hello', done: false }
console.log(g.next());
//{ value: 'world', done: false }
console.log(g.next());
//{ value: 'end', done: true }
console.log(g.next());
//{ value: undefined, done: true }

```
在第四次两用时候，Generator 函数已经运行完毕，`next`方法返回的对象的`value`属性为`undefined`。

#### Tips

ES6 没有对丁 function 关键字和函数名之间的星号 * 下载那个位置。

### yield 语句

* 遇到 yield 语句就暂停执行后面的操作，并将紧跟在 yield 后端表达式的值作为返回的对象的 value 属性值。
* 下一次调用 next 方法时在继续往下执行，直到遇到下一个 yield 为止。
* 如果没有遇到 yield 语句,就会一直运行到函数结束。直到遇到 return 语句，并将紧跟在 return 后端表达式的值作为返回的对象的 value 属性值。
* 如果该函数没有 return 语句，则返回的对象的 value 值为 undefined。

**只有当调用 next 方法，yield 语句后面的表达式才会执行，因此等于为 JavaScript 提供了 `懒惰求值 Lazy Evaluation` 的语法功能**

Generator 函数可以不用 yield 语句，此时就变成了一个单纯的**暂缓执行**函数。

```js

function * f(){
	console.log("执行了");
}


var g=f();

setTimeout(function(){
	g.next();
},2000);

```

上面代码中，如果 f 是普通函数，则在为 generator 复制的时候就会执行。但是函数 f 是个 Generator 函数，于是就会在调用 next 方法时再回执行。

#### Tips

yield 语句不能用在普通函数中，会报错。

## next 方法的参数

yield 语句本身没有返回值，或者说总是返回 undefined 。next 方法可以带一个参数，该参数会被当作上一条 yield 语句的返回值。

```js

function * f(){
	for(var i=0;true;i++){
		var reset =yield i;
		if(reset){
			i=-1;
		}
	}
}

var g=f();

g.next();
//{ value: 0, done: false }
g.next();
//{ value: 1, done: false }
g.next(true);
//{ value: 0, done: false }

```

上面的代码先定义一个可以无限运行的 Generator 函数 f ，如果 next 方法没有参数，每次运行到 yield 语句，变量 reset 的值总是 undefined 。当 next 方法带一个参数 true 时，当前的变量 reset 就被充值为这个参数（即为 true ），因而 i 会等于 -1 ，下一轮循环就从 -1 开始递增。

### 语法意义

Generator 函数从暂停状态到回复运行，其上下文状态是不变的。通过 next 方法的参数就有办法在 Generator 函数开始运行后继续想函数体内部逐日值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整这个函数行为。

## for...of 循环

for...of 循环可以自动遍历 Generator 函数，此时不用调用 next 方法。

```js

function* generator(){
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	return 6;
}

for(let v of generator()){
	console.log(v);
}
//1 2 3 4 5

```

## Generator.prototype.throw()

throw 方法可以在函数体外抛出错误然后再 Generator 函数体内捕获。

## Generator.prototype.return()

Generator 函数返回的遍历器对象还有一个 return 方法，可以返回给定的值，并且中介 Generator 函数的遍历。

```js
function * gen(){
	yield 1;
	yield 2;
	yield 3;
}

var g= gen()

g.next();
//{value:1,done:false}
g.return("foo");
//{value:"foo",done:true};
g.next();
//{value:undefinded,done:true}

```

上述代码中，遍历器对象 g 调用 return 方法后，返回值的 value 属性就是 return 方法的参数 foo 。同时，Generator 函数便利种植，返回值的 done 属性变为 true ，以后再调用 next 方法， done 属性总是返回 true。

## 作为对象属性的 Generator 函数

如果一个对象属性是 Generator 函数，那么可以简写成下面形式。

```

let obj={
	* gen(){

	}
};

//等于

let obj={
	gen:function *(){

	}
};

```

## Generator 函数的 this

Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，他继承了 Generator 函数的 Prototype 对象上的方法。
意思是 在 generator 函数体内用 this 绑定属性是没用的。例如：

```
function *g(){
	this.a=123;
}

var q=g();
q.a//undefinded

```
