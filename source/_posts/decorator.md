---
title: decorator 修饰符
date: 2017-06-29 15:19:45
tags: [ES7]
category: [javascript]
---

修饰器 `decorator` 是ES7的一个提案，可以用`babel`转来使用。

## 修饰类
<!--more-->
```js
//定义个修饰符
function changeClass(target){
	target.property="new property"
}
@changeClass
class testClass{}
console.log(testClass.property) //new property
```

上述代码可以看出，修饰器接受的第一个参数是“目标”，当这个目标是类时可以更改其静态属性和原型属性。

修饰器第二个参数是要修饰的属性名，第三个参数是其“描述对象”`descriptor`，这个描述对象即`Object.defineProperty({},key,descriptor)`
中的描述对象，可以更改是否可枚举、可写等