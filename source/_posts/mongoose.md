---
title: node.js 操作 mongodb 以及 mongoose 使用
date: 2016-10-25 21:01:59
tags:
	 - javascript
	 - node.js
   - mongodb
category: 杂
---

## node.js 操作 mongodb

首先引入 `mongodb`，然后打开数据库xxx,之后进入mycoll 集合。

<!--more-->

```js
var mongo = require("mongodb");
var server = new mongo.Server('127.0.0.1', '27017');
var db = new mongo.Db('xxx', server);
var mycoll=db.getCollection('mycoll');
```
之后操作都会在 `mycoll` 对象上进行。

### 查找文档

在mongo shell 中主要有两个方法，其中find方法会返回一个 cursor 对象，可以使用其toArray 方法转成数组。
findOne 方法只会返回查找到的第一个元素。

```js
myColl.find({id:1},function(err,doc){

});

myColl.findOne({id:1},function(err,doc){

});
```

### 添加文档

同使用mongo shell基本相同，如下：

```js

myColl.insert({
  id:1,
  name:"zhangsan",
  age:"18"
},function(err,result){

});

```

### 删除文档

```js
myColl.remove({id:1},function(err,result){

});
```

### 保存文档

`.save()` 方法可以让操作数据库变得简单些，查找过得到后的数据修改后可以直接保存。

```js
myColl.findOne({id:1},function(err,doc){
  doc.name="lisi";
  myColl.save(doc,function(err,result){

  });
});
```

### 更新文档

```js
myColl.update({id:1},{$inc:{age:1},{$rename:{name:'namename'}}},{upsert:true,multi:true},function(err,result){

});
```
update方法接受四个参数。

* 第一个参数是一个query对象。
* 第二个参数是update，支持原子操作符。
* 第三个参数是option设置，可选 upsert（不存在时候创建）和multi（匹配到的多个都更新）

其中运算符有下列

| 运算符        |   功能                      |
|:------------:| :-------------------------:|
|$inc          | 给指定片段指定增加或者减少的值|
|$rename       | 重命名字段|
|$setOnInsert|在更新时候设置字段值|
|$set|设置已经有的文档字段值|
|$unset|从已经有的字段中删除字段|
|$|占位符|
|$addToSet|在数组中添加元素，若数组本身无此元素|
|$pop|删除数组第一个（值为-1）或者最后一个（值为1）元素|
|$pullAll|从数组中删除多个值，要删除的值以数组方式来指定|
|$pull|从数组中删除和查询条件匹配元素|
|$push|往数组中添加元素|
|$each|往数组中添加多个元素，以数组方式|
|$slice|用于限制更新后数组长度|
|$sort|排序|
|$bit|对整数进行按位与和或运算|


## 使用mongoose操作mongodb

mongoose可以操作数据库更方便点，除了官方文档，没有什么详细的中文文档，英文文档我看的太吃力了，以下总结了几个常用的操作。

### Schema

Schema 是mongoose最特别地方，可以让文档整齐。


```js
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var userSchema=new Schema({
  name:{
    type:String,
    default:'zhangsan'
  },
  age:Number,
  array:Array
});

```
mongoose Schema 支持以下类型  [mongoose 官方文档 Schema Types](http://mongoosejs.com/docs/schematypes.html)

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* Objectid
* Array

其中Type options 支持一些例如default、trim等有用的配置

* required: boolean 或者函数,当为true时候，会给其属性添加必填验证。
* default: 默认值。
* select: boolean值，设置查询时候映射 [详情](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/)
* `validate: required 设置所用
* get get钩子。tips： Object.defineProperty()
* set set钩子。
* lowercase: boolean, 小写。
* uppercase: boolean, 大写。
* trim: boolean, 使用trim方法。
* match: RegExp, 产生一个验证器。

更多可以查看官方文档。

### Model

模型可以说是Schema 的实例，用于操作数据库。

```js
var User=mongoose.model('user',userSchema);

//其第一个参数会作为集合名称。当其首字母大写收集合名为负数（-s）。

```

#### 创建文档

```js
var doc=new User({
  name:"zhangsan",
  age:18,
  array:[1,2,3]
});

doc.save(function(err,result){

});
```

#### 修改文档

这里修改文档是指对集合的更新、查找、删除操作，因为这里 User 相当于上文中 myColl 所以操作方法是相同的。

#### 给Schema添加方法

给Schema添加方法可以减少代码书写量。

```js
userSchema.methods.findName=function(callback){
  console.log("被使用");
  return this.model('user').find({name:this.name},callback);
}

var User=mongoose.model('user',userSchema);

var f=new User({name:'zhangsan'});

f.findName(function(err,results){

});

```

#### 给Schema添加静态方法。

上面给Schema添加方法需要新建个模型实例传入参数来为schema方法传入参数，而且值能通过这个实例`f`来使用自定义方法，不是很方便。
可以使用下面方法给其添加静态方法。

```js
userSchema.staticss.findName=function(name,callback){
  //console.log("被使用");
  this.find({name:name},callback);
}

var User=mongoose.model('user',userSchema);

User.findName('zhangsan',function(err,result){

});

```

__mongoose本身自带很多方法，具体可以查看官方文档__