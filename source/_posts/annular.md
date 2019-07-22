---
title: 用javascript生成回型矩阵 蛇形矩阵
date: 2016-09-04 21:45:18
tags: 
	 - 算法
	 - javascript
category: javascript
---

## 回型/蛇形矩阵形式

```html

1  2  3
8  9  4
7  6  5

```

上述这种形式即为蛇形矩阵。

<!-- more -->

## 解决思路

给定一个数字 `n`（为最终值例如上述中 `9`）
首先先判断有几行几列，这里只要求出`n` 的中间公约数。例如 9 的中间公约数为 3 ，所以为三行三列。若 `n` 为 20 则中间公约数分别是4，5.所以为四行五列。

之后在根据行列中比较小的那个来判断有几层“回字型”。例如`n=9` 时候有三层，`n=20` 时候也是三层。然后就可以写个递归来把这些数字放进一个二维数组中的合适位置上。

## javascript源码

在浏览器控制台即可调用 `Annular` 函数。

```js

function Annular(n) {
    n = parseInt(n);
    var divisor = [];
    for (var i = 1; i <= n; i++) {
        if (n % i == 0) {
            divisor.push(i);
        }
    }
    var len = divisor.length;
    if (len % 2 == 0) {
        var mid = len / 2;
        var row = divisor[mid - 1];
        var col = divisor[mid];
    } else {
        var row = divisor[Math.floor(len / 2)];
        var col = row;
    }
    //console.log("行：" + row + "  列：" + col);
    var arr = new Array(row)
    for (var j = 0; j < arr.length; j++) {
        arr[j] = new Array(col)
    }
    var quan = Math.ceil(row / 2);
    var begin = 1;
    var q = 0;
    while (q < quan) {
        var top = col - q * 2;
        for (var i = 0; i < top; i++) {
            arr[q][i + q] = begin + i;
        }
        var right = row - q * 2;
        for (var i = 0; i < right; i++) {
            arr[i + q][col - 1 - q] = begin + top - 1 + i;
        }
        var bottom = col - q * 2;
        for (var i = 0; i < bottom; i++) {
            arr[row - 1 - q][bottom - i - 1 + q] = begin + top - 1 + right - 1 + i;
        }
        var left = row - q * 2 - 1;
        for (var i = 0; i < left; i++) {
            arr[row - 1 - q - i][q] = begin + top - 1 + right - 1 + bottom - 1 + i;
        }
        var stop = begin + top + right + bottom + left - 4;
        begin = stop + 1;
        q++;
    }
    console.log(arr);
}


```

## 例子

```js

Annular(25);

//输出

[ [ 1, 2, 3, 4, 5 ],
  [ 16, 17, 18, 19, 6 ],
  [ 15, 24, 25, 20, 7 ],
  [ 14, 23, 22, 21, 8 ],
  [ 13, 12, 11, 10, 9 ] ]

Annular(25);

//输出

[ [ 1, 2, 3, 4, 5 ],
  [ 14, 15, 16, 17, 6 ],
  [ 13, 20, 19, 18, 7 ],
  [ 12, 11, 10, 9, 8 ] ]  

```