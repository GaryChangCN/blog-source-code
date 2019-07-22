---
title: ES6-Map
date: 2016-08-31 16:26:47
tags: 
	 - javascript
	 - ES6
category: javascript
---

## ES6引入Map的目的

js 的对象本质上就是键值对集合也就是 Hash结构，但是只能用字符串作为键值，而 Map 就可以解决这个问题。

## 用法

```js

var m= new Map();
var o={
	a:1
};

m.set(o,"123");
m.get(o);  // "123"

m.has(o);  // true
m.delete(o); // true
m.has(o); // false

```

<!-- more -->
Map 可以接受一个数组作为参数，该数组成员是一个个表示键值对的数组。

```js

var map=new Map([["name","mike"],["age","21"]]);

map.size // 2
map.get("name") // "mike"

```

## 实例属性及操作方法

### size 属性

返回 Map 结构成员总数。

### 遍历方法

* keys() 返回键名的遍历器。
* values() 返回键值的遍历器。
* entries() 返回所有成员的遍历器。
* forEach() 遍历 Map 的所有成员。

## 与其他数据结构的转换

### Map 转为数组

* 使用 ES6 扩展运算符 （...）

```js

var map=new Map([["name","mike"],["age","21"]]);

[...map] // [["name","mike"],["age","21"]]

```

* 遍历器

这个不多赘述。

### 数组转为 Map 

将数组传入 Map 构造函数即可。

### Map 转为对象

如果 Map 的所有键都是字符串，则其可以转为对象。

### Map 转 JSON

当 Map 键名都是字符串时候，可以转为对象（json）。

## WeakMap

同 WeakSet 类似 WeakMap 的键名只能是**对象**。
