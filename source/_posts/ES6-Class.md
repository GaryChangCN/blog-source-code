---
title: ES6-calss 以及理解原型链
date: 2016-12-11 21:11:30
tags:
	 - javascript
	 - ES6
category: javascript
---

## Class

在ES6中，引入了`Class`，可以很方便的来定义类。例如

```js
class A {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return this.x+this.y;
    }
}
```
事实上ES6的class只是一个语法糖。上述代码等同于：
```js
function AA(x,y){
    this.x=x;
    this.y=y;
}
AA.prototype.toString=function(){
    return this.x+this.y;
}
```
所以 在实例化后 <!-- more -->

```js
var a=new A();
var aa=new AA();

a.constructor===aa.prototype.constructor //true

```
## 继承

在ES5中，继承一般使用链继承。即新构造函数的protype等于需要继承的的构造函数的实例化，即

```js

function NEWAA(){

}
NEWAA.prototype=new AA();
```
在ES6中使用class继承会显得清楚点。

```js
class NEWA extends A{};
```
这时候使用extends方法让NEWA继承A的所有属性/方法，此时这两个类是一样的。

```js
class NEWA extends A{
    constructor(x,y,a){
        super(x,y);  //调用父类的constructor(x,y)
        this.a=a;
    }
    toString(){
        return this.a+super.toString(); //调用父类的toString()方法
    }
}
```
在这上述这个例子里 `super`可以理解成“超类”来代替父类实例，即生成一个`this`对象来指向父类。因为子类没有`this`对象，所以这个super方法是必须的。
并且只有调用super之后才能在方法中使用`this`关键字。
当子类不添加`constructor`方法时候，此时会默认添加，且会默认继承父类的所有`arguments`。

```js
constructor(...args){
    super(...args);
}
```

## 个人理解原型链

简单来说即是

```js
function A(){};
var a=new A();

a.__proto__==A.prototype  //true
a.__proto__.constructor==A //true

function B(){};
B.prototype=new A();

var b=new B();

b.__proto__==B.prototype //true
b.__proto__.constructor==B //true
b.__proto__.__proto__==A.prototype //true
b.__proto__.__proto__.constructor==A //true
```

## class 的 getter 和setter

同 ES5的一样（vue的响应式原理即使用这个） 
```js
Object.defineProperty(obj,key,{
    get:function(){

    },
    set:function(){

    }
})
```

ES6 class的getter和setter更加方便点。

```js
class A{
    constructor(x){
        this.x=x;
    }
    get a(){
        return "getter"+this.x;
    }
    set a(value){
        console.log("刚刚set："+value);
    }
}
var a=new A("tinytin");
a.a="newnewnew"  //刚刚set：newnewnew
a.a  //gettertinytin
```
这里get不能传参数！。

## class 静态方法 

在方法前加上`static`即表示此方法不能被继承。
```js
class A{
    static fun(){
        return "tinytin"
    }
}
A.fun() //tinytin

var a=new A();
a.fun() //error
```
