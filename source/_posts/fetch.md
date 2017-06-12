---
title: 使用fetch来取代Ajax
date: 2016-08-26 22:38:28
tags: javascript 
category: javascript
---

## 为什么要使用Fetch

传统`ajax` or `XMLHttpRequest()`往往非常复杂的，而且并不好记忆。例如手写一个`ajax` ：

```js
var xhr = new XMLHttpRequest();
//不考虑浏览器兼容性
xhr.open("get","garychang.cn",true);
xhr.onreadystatechange=function(){
	if(xhr.readyState==4){
		if(xhr.status>=200&&xhr.status<300||xhr.status==304){
			console.log(xhr.responseText);
		}
	}
}
//或者 onload方法稍稍简单点。
xhr.onerror=function(err){
	//error......
}
xhr.send(null);
```

<!-- more -->

如果是 `post` 方式还要加上头。

```js
xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
```

当然你可以自己封装成函数来使用（例如我之前封装的[_Ajax](/2016/04/17/Ajax封装)）或者 `jQuery`的`$.ajax`。

但是使用 `fetch` 就简洁的多。

```js
fetch("garychang.cn").then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log(e);
});
```
使用 *箭头函数* 后会更加简洁：

```
fetch("garychang.cn").then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log(e))
```

## 什么是 Fetch

根据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 描述：

Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象通用的定义。它之后能够被使用到很多场景中：service workers、Cache API、其他处理请求和响应的方式，甚至任何需要生成自己的响应的方式。

## 兼容性

![fetch兼容性](/images/fetch.png)

## 使用

fetch 使用了**ES6** `Promise` 来实现。其实不懂`Promise`也可以看懂。

如最顶部 `fetch` 例子，使用fetch进行网络请求非常简单的。相比较于`ajax`，`fetch`可以提供更多的功能：

```js
var opt={
	headers: {
        'Cache-Control': 'no-cache',
        'Accept':'application/json'
    },
    method:'GET',
    body: 'a=1&b=2'
    //当类型为post时候 body可以用 FormData()
}
fetch("garychang.cn", opt).then(function(response){
   // do something...
})
```

上述代码中,`opt`对象可以指定请求头，请求类型作为`fetch`方法的第二个函数。

### 引入接口

* Headers
  ```js
  var header = new Headers();
  header.append("Content-Type", "text/plain"
  header.append("Content-Length", content.length.toString());
  ```

* Request
  request是http请求对象（类似于`Node.js` 的 `httpIncomingMessage` 对象）
  ```js
  var req=new Request('garychang.cn',{
  	headers: {
        'Cache-Control': 'no-cache',
        'Accept':'application/json'
    },
    method:'GET',
    body:'a=1&b=2',
    mod:cors //cors跨域相关
  });
  ```
* Response
  http响应对象，存在于`fetch`的回调。

### response对象

对于返回值（response）`fetch` 也有更多可玩性。

* `response.status` 显示HTTP状态码。

* `response.ststusText` HTTP 状态码说明。

* `response.ok` 说明是否正确返回

### body

无论是请求还是相迎都有 **body** `fecth`也提供了方法来操作`body`。

#### body类型

* ArrayBuffer

* ArrayBufferView （arraybuffer视图）

* Blob/File （图片等）

* String （字符串）

* URLSearchParams （url查询字符串）

* FormData （表单数据）

#### 对应处理方法

* arrayBuffer()

* 同上

* blob()

* json()

* text()

* formData()
