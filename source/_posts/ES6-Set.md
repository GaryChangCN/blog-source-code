---
title: Set数据结构
date: 2016-08-31 15:49:20
tags: 
	 - javascript
	 - ES6
category: javascript
---

## Set

### 基本用法

Set 是ES6 新的数据结构，类似于数组，但每一项都是唯一的没有重复项。

<!-- more -->

```js

var s=new Set();

[2,3,5,5,1,2].map(function(e){
	a.add(e);
});

console.log(s);
//[2,3,5,1]

```
Set 函数可以接受一个数组或者类似数组的对象作为参数，然后初始化。

向 Set 加入项时不会发生类型转换。

### Set 实例的属性和方法

* Set.prototype.constructor 返回 Set 本身。
* Set.prototype.size 返回 Set 实例成员总数。
* add() 添加一个值，返回 Set 结构本身。
* delete(value) 删除一个值，返回 boolean 值。
* clear() 清楚所有成员，无返回值。

### 遍历方法

* keys() 返回一个键名的遍历器。
* values() 返回一个键值的遍历器。
* entries() 返回一个键值对遍历器。
* forEach() 使用回调遍历没每一个成员。

## WeakSet

WeakSet 和 Set 相似都是不重复的集合，但有两个区别：

* WeakSet 成员只能是对象。
* WeakSet 成员对象都是弱引用。所以 WeakSet 不可遍历。