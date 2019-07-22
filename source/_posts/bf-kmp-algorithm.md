---
title: 字符串匹配模式算法
date: 2017-02-04 15:20:45
tags:
      - 算法
category: [学习笔记]
---

## 目录

* [BF算法](#BF算法)
* [KMP算法](#KMP算法)

<!--more-->
## BF算法

BF算法，又称为蛮力算法，思路是从主串第一个字符开始和模式串中第一个字符开始比较，若相等则继续比较
后续自负，否则从主串中的第二个字符开始与模式串中第一个字符比较。按照这个方式，继续下去。如果模式串
和主串中某一段连续子串相等，则匹配成功，返回模式串第一个字符在主串中的位置，否则返回 -1 。


### 源码

```javascript
String.prototype.$indexOf = function(child) {
    var i = 0;
    var j = 0;
    var sLen = this.length;
    var tLen = child.length;
    while (i < sLen && j < tLen) {
        if (this[i] == child[j]) {
            i++;
            j++;
        } else {
            j = 0;
            i = i + 1 - j;
        }
    }
    if (j >= tLen) {
        return i - tLen;
    } else {
        return -1;
    }
};

//test
var s = "ababcacabcabbab";
var t = "abcab";
var t2 = "abcadw";

console.log(s.$indexOf(t))//7
console.log(s.$indexOf(t2))//-1
```

### 时间复杂度

主串长度 n , 模式串长度 m 。 最好情况下是 `O(m)` 此时主串前 m 个字符刚好是模式串。
最欢情况是 `O(m*n)` 。

## KMP算法

BF算法算法之所以被称为蛮力算法是因为每次主串指针都会回溯，KMP算法则弥补这点，所以其
时间复杂度为 `O(m+n)` 。 

### 原理

这个算法我确实看了很久，从看书到搜索资料也没有对我来说讲的能让我听懂的，但是最后我还是
理解了，这里我不会说的很详细，毕竟这个博文也是给自己看的。

`部分匹配数组` 

 部分匹配数组是KMP算法最重要的一环。

 例如 

 ```
"ABCDABD"
//部分匹配数组
[0,0,0,0,1,2,0]
 ```
其计算方式是前缀数组与后缀数组的共有元素里长度最长的共有元素的长度。
前缀即出最后一个元素以外，后缀即除了第一个元素以外。

|元素|前缀数组|后缀数组|结果|
|:--:|:----:|:------:|:--:|
|A|NULL|NULL|0|
|AB|[A]|[B]|0|
|ABC|[A,AB]|[BC,C]|0|
|ABCD|[A,AB,ABC]|[BCD,CD,D]|0|
|ABCDA|[A,AB,ABC,ABCD]|[BCDA,CDA,DA,A]|1|
|ABCDAB|[A,AB,ABC,ABCD,ABCDA]|[BCDAB,CDAB,DAB,AB,B]|2|
|ABCDABD|[ABCDAB,ABCDA,ABCD,ABC,AB,A]|[BCDABD,CDABD,DABD,ABD,BD,D]|0|
|||||

之后和BF算法相似，知识在移动模式字符串时候其指针移动不同。

### 源码&&注释

```javascript
var s = "abcdgaryabcdabdchang";
var t = "abcdabd";
String.prototype.$indexOf = function(child) {
    var next = [];  //定义部分匹配数组
    //求匹配数组算法
    var childLength = child.length;
    var i;
    for (i = 1; i <= childLength; i++) {
        var now = child.slice(0, i);
        if (i == 1) {
            next.push(0);
        } else {
            var prefix, suffix;
            var dis = function(str, isSuf) {
                var len = str.length;
                var i, tmp = [];
                if (isSuf) {
                    for (i = 1; i <= len; i++) {
                        tmp.push(str.slice(-i));
                    }
                } else {
                    for (i = 1; i <= len; i++) {
                        tmp.push(str.slice(0, i));
                    }
                }
                return tmp;
            }
            prefix = dis(now.slice(0, -1), false);
            suffix = dis(now.slice(1), true);
            var equal = 0;
            prefix.forEach(function(e, index) {
                if (e === suffix[index]) {
                    equal = e.length;
                }
            });
            next.push(equal);
        }
    }
    //求匹配数组算法结束
    return (function(s) {
        var i = 0;
        var j = 0;
        var sLen = s.length;
        var tLen = child.length;
        while (i < sLen && j < tLen) {
            if (s[i] == child[j] || j == -1) {
                i++;
                j++;
            } else {
                j = next[j] - 1; //根据匹配数组更改其指针
            }
        }
        if (j >= tLen) {
            return i - tLen;
        } else {
            return -1;
        }
    }(this));
};
console.log("123456".$indexOf("69")); //-1
console.log(s.$indexOf(t)); //8

``` 

### 时间复杂度

`O(m+n)`

### 参考资料

* [图解KMP算法](http://blog.jobbole.com/76611/)
* 《数据结构与经典算法》————清华大学出版社


