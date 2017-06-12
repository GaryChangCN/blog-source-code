---
title: js监听对象属性变化
date: 2016-08-25 14:25:25
tags: javascript
category: javascript
---

## 思路

监听对象属性变化有两种方法：回调函数、使用访问器属性。
首先定义一个对象
```js
var obj = {
	a:null
}
```

### 回调函数

使用回调函数思路是定义一个函数来设置对象的属性，之后在调用回调函数

#### 定义监听函数

```js
function $watch(obj, prop, callback) {
    if (!obj.$property) {
        obj.$property = function(prop, value) {
            if (this[prop] != value) {
                this[prop] = value;
                return callback(this);
            }
            return this;
        }
    }
}
```

#### 触发回调

```js
$watch(obj,'a',function(obj){
	console.log("obj的属性a的发生改变："+obj.a);
})
```

#### 更改属性值

```js
obj.$property('a','random')
```

### 访问器属性

使用访问器属性即使用`set` `get` 属性，可以通过 `Object` 的 `defineProperty` 方法访问到。*此方法有兼容性问题* ，这里我只监听属性更改，没有修改。

#### 监听

```js
Object.defineProperty(obj,"a",{
    	set:function(val){
    		console.log("obj的属性a的发生改变："+val);
    	}
    });
```

#### 更改属性值

```js
obj.a='random';
```
