---
title: 几种排序算法的javascript实现
date: 2016-12-20 23:41:43
tags: 
	 - 算法
	 - javascript
category: javascript
---

## 排序算法

之前有用php总结过几个排序算法，也用js实现过，但是demo早就消失不见，刚好有题目是用js写一种排序算法，我就吧几种算法总结下。

## 冒泡排序

冒泡排序简单来说就是把最大的冒泡出来，时间复杂度 `O(n^2)`,最简单是 `O(n)`。

<!--more -->

冒泡排序会进行两次循环，外层循环次数是数组长度减去1，内层循环是从数组第一位到上次处理后的最后一位，因为最大or最小值会冒泡上去，循环次数也是。

```js
function bubble(arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    } else {
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - i - 2; j++) {
                if (arr[j] < arr[j + 1]) {
                    var tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
        return arr;
    }
}
```
## 插入排序

这个是我最早理解的排序，简单说就像从第一张那扑克，之后每拿一张就从已经在手上的牌的第一张或最后一张，往后或往前找到他应该在的未知，然后再拿下一张牌。时间复杂度 `O(n^2)`,最简单是 `O(n)`。

```js
function insert(arr) {
    var len = arr.length;
    if (len <= 1) {
        return arr;
    } else {
        for (var i = 1; i < len; i++) {
            var tmp = arr[i];
            var j = i - 1;
            while (j >= 0 && tmp < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = tmp;
        }
        return arr;
    }
}
```

## 快速排序

这个理解起来是最简单的了，例如他先找出数组中的中间点，然后从数组中删除这个中间点，然后比较这个数组每一项与这个中间点大小对比，小的话放进左边新数组，大的话放进右边新数组，之后在递归调用定义此方法的函数（左右都要调用），之后用`concat()`连接起来数组并返回，这个方法首先应该加上判断数组以及每个子总长度，当长度只有1时候就返回，刚好快速排序也是把数组划分到最后只有一项，时间复杂度最简单 `O(log2n)` 最复杂 `O(n^2)`。

```js
function quick(arr) {
    var len=arr.length;
    if (len <= 1) {
        return arr;
    } else {
        var coordIndex = Math.floor(len / 2);
        var coord = arr[coordIndex];
        arr.splice(coordIndex, 1);
        var left = [];
        var right = [];
        var len2 = arr.length;
        for (var i = 0; i < len2; i++) {
            if (arr[i] < coord) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        var leftArr=quick(left);
        var rightArr=quick(right);
        return leftArr.concat([coord],rightArr);
    }
}
```
## 其他算法

~~待填坑。~~  [js排序算法](/2017/06/15/sort/)

## 源码

[源码]("/show/sortAlgorithm.js")