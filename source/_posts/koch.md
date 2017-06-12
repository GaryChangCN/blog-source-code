---
title: canvas生成科赫雪花（曲线）
date: 2017-01-05 22:13:07
tags: [算法,javascript,canvas]
category: [作品]
---

## 科赫曲线

>科赫曲线是一种外形像雪花的几何曲线，所以又称为雪花曲线，它是分形曲线中的一种，具体画法如下：
>1、任意画一个正三角形，并把每一边三等分；
>2、取三等分后的一边中间一段为边向外作正三角形，并把这“中间一段”擦掉；
>3、重复上述两步，画出更小的三角形。
>4、一直重复，直到无穷，所画出的曲线叫做科赫曲线。
[来自互动百科](http://www.baike.com/wiki/%E7%A7%91%E8%B5%AB%E6%9B%B2%E7%BA%BF)

## 思路

使用js配合canvas生成科赫雪花。

<!--more-->


## 效果

<a href="/show/koch.html" target="_blank">新窗口打开</a>

{% iframe /show/koch.html 290px 350px %}

## 源码下载

<a href="/show/koch.html" download="kochbygarychang">下载</a>

## 源码及注释

```html
<html lang="en">

<head>
    <title>科赫雪花</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <input type="range" id="range" max="5" min="1" step="1" value="1">
    <canvas id="canvas" height="280" width="280"></canvas>
</body>
<script>
    var canvas = document.getElementById("canvas");
    function koch(ctx, x1, y1, x2, y2, n, m) {
        //把每一边线段视为一个独立片段（例如当层级为1时候的） 如下面图示
        //x1 x2 y1 y2 如下面图示
        //n为当前的层数
        //m为设定层级，建议不要太卡，浏览器会崩溃
        ctx.clearRect(0,0,400,400); //每次绘图前清除画板
        //以下是根据x1,x2的坐标获取 x3,x4,x5坐标。 如以下图示。
        var x3 = (x2 - x1) / 3 + x1; 
        var y3 = (y2 - y1) / 3 + y1;
        var x4 = (x2 - x1) / 3 * 2 + x1;
        var y4 = (y2 - y1) / 3 * 2 + y1;
        var x5 = x3 + ((x2 - x1) - (y2 - y1) * Math.sqrt(3)) / 6;
        var y5 = y3 + ((x2 - x1) * Math.sqrt(3) + (y2 - y1)) / 6;
        n++;
        if (n == m) { //绘图（连线） 当当前层级与设定层级一致时候停止递归
            ctx.moveTo(x1, y1);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x5, y5);
            ctx.lineTo(x4, y4);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            return false;
        }
        //递归调用绘图
        koch(ctx, x1, y1, x3, y3, n, m);
        koch(ctx, x3, y3, x5, y5, n, m);
        koch(ctx, x5, y5, x4, y4, n, m);
        koch(ctx, x4, y4, x2, y2, n, m);
    }

    function draw(deep) {
        var ctx = canvas.getContext("2d");
        ctx.strikeStyle="#000";
        ctx.beginPath();
        //以下是绘出初始的三条边的顶点位置（x1，x2）
        var y=80+Math.cos(Math.PI/6)*200;
        koch(ctx,150,y,250,80,0,deep);
        koch(ctx,250,80,50,80,0,deep);
        koch(ctx,50,80,150,y,0,deep);        
    }
    draw(1);
    var range=document.getElementById("range");
    range.onchange=function(){
        var r=~~range.value;
        draw(r)
    }
</script>
<style>
    body {
        text-align: center;
    }
    
    #canvas {
        background-color: #fff;
    }
</style>

</html>
```

## 片段图示

![图示](/images/koch.jpg)

## 参考文章

<a href="http://www.cnblogs.com/mnight/archive/2013/01/11/2856592.html" target="_blank">参考文章</a>