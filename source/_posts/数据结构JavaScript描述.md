---
title: 数据结构JavaScript描述——列表（一）
date: 2016-05-11 18:25:22
tags: javascript
category: 学习笔记
---

## 列表

### 定义

列表是一组有序的数据。每个列表中的数据称为 **元素** 。在JavaScript中，列表中的元素可以使任何数据类型，同时没有显示能保存多少元素

### 列表抽象数据类型定义

#### 属性和方法

* listSize         列表的元素个数
* pos               列表的当前元素
* length()       返回列表元素个数
* clear()          清空列表所有元素
* toString()   返回列表字符串形式
* getElement()返回当前位置元素
* insert() 在现有元素后插入新元素
* append() 在列表末尾添加新元素
* remove()从列表中删除元素
* front()将列表的当前位置移动到第一个元素
* end() 将列表当前位置移动到最后一个元素
* prev()将当前位置后移一位
* next()将当前元素前移一位
* currPos()返回列表的当前位置
* moveTo()将当前位置移动到指定位置

### 实现列表类

<!-- more -->

```js
function List(){
this.listSize=0;
this.pos=0;
this.dataStore=[];//初始化一个空数组来保存列表元素
this.clear=clear;
this.find=find;
this.toString=toString;
this.insert=insert;
this.append=append;
this.remo=remove;
this.front=front;
this.end=end;
this.prev=prev;
this.next=next;
this.length=length;
this.currPos=currPos;
this.moveTo=moveTo;
this.getElement=getElement;
this.length=length;
this.contains=contains;
}
```
#### append 给列表添加元素

```js
function append(element){
this.dataStore[this.listSize++]=element;
}
```

#### find在列表查找某一元素

```js
function find(element){
for(var i=0;i<this.dataStore.length;i++){
if(this.dataStore[i]==element{
 return i;
 }
}
return -1;
}
#### remove从列表删除元素
function remove(element){
var foundAt=this.find(element);
if(foundAt-1{
 this.dataStore.splice(foundAt,1)
 --this.listsize;
 return false;
 }
}
```