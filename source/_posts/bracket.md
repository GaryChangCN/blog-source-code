---
title: js括号匹配检验
date: 2017-02-02 11:52:13
tags:
      - javascript
      - 算法
category: [学习笔记]
---

表达式中括号都是成对出现，否则则报错，现在用js实现这个表达式括号匹配验证。

<!--more-->

## 思路

使用栈来解决，当检索到左边括号时候推入到栈顶，当检测到右边括号时候则与取出栈顶元素并进行比较，
最后计算栈的长度是否为空即可。

## 源码

```javascript
String.prototype.bracket = function() {
    var stack = [];
    var sArr = this.split("");
    sArr.forEach(function(e) {
        if (/(\(|\[|\{)/.test(e)) {
            stack.push(e);
        } else {
            switch (e) {
                case ")":
                    var top = stack.pop();
                    if (top !== "(") {
                        return false;
                    }
                    break;
                case "]":
                    var top = stack.pop();
                    if (top !== "[") {
                        return false;
                    }
                    break;
                case "}":
                    var top = stack.pop();
                    if (top !== "{") {
                        return false;
                    }
                    break;
                default:

            }
        }
    });
    return stack.length === 0;
}

console.log("{eqwe(qw}()".bracket()); //false
console.log("{gary(chang)[cn]}(c)".bracket()); //true
```
