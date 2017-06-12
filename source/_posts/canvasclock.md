---
title: 使用canvas制作的的钟
date: 2017-01-07 17:30:17
tags: [canvas,作品,javascript]
category: [作品]
---

## 效果

<a href="/show/canvasclock.html" target="_blank">新窗口打开</a>
<!--more-->

{% iframe /show/canvasclock.html 290px 350px %}


## 思路

- 绘制圆形表盘
- 绘制标线
    - 绘制小时标线
    - 绘制分钟、秒标线
- 绘制指针
    - 时针
    - 分针
    - 秒针
- 绘制指针交汇点白色点
- 动起来

## 源码下载

<a href="/show/canvasclock.html" download="canvasclockbygarychang.html">下载</a>

## 源码以及注释讲解

```js
    function go() {
        var date=new Date();//每个更新重新获取时间
        var hours = date.getHours();
        hours = hours > 12 ? hours - 12 : hours; //24小时制转为12小时制
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliSeconds=date.getMilliseconds();//这里获得毫秒是为了让秒针“顺滑”旋转

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,400,400); //清空画布

        ctx.save();  //这里绘制时针
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.translate(200, 200); //移动中间点
        ctx.rotate(Math.PI / 6 * (hours+minutes/60));
        //因为根据分钟走的百分比以及当前小时判断时针应该在的角度。以下同理
        ctx.moveTo(0, 20); //设定20目的是让时针有个短边，以下同理
        ctx.lineTo(0, -80);
        ctx.stroke();
        ctx.restore();

        ctx.save(); //绘制分针
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.translate(200, 200);
        ctx.rotate(Math.PI / 30 * (minutes+seconds/60));
        ctx.moveTo(0, 25);
        ctx.lineTo(0, -100);
        ctx.stroke();
        ctx.restore();

        ctx.save(); //绘制秒针
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.translate(200, 200);
        ctx.rotate(Math.PI / 30 * (seconds+milliSeconds/1000));
        //这里为了表现出平滑旋转效果采用毫秒的百分比计算角度，如果喜欢秒针“跳跃效果”可以把 milliSeconds/1000 删除
        ctx.moveTo(0, 30);
        ctx.lineTo(0, -120);
        ctx.stroke();
        ctx.restore();

        //绘制表盘
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = "4";
        ctx.arc(200, 200, 150, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.restore();
        //这里是绘制小时标线
        for (var i = 1; i <= 12; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.translate(200, 200);
            ctx.rotate(Math.PI / 6 * i);
            ctx.moveTo(0, -135);
            ctx.lineTo(0, -150);
            ctx.stroke();
            ctx.restore();
        }
        //这里绘制分和秒的标线
        for (var j = 1; j <= 60; j++) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.translate(200, 200);
            ctx.rotate(Math.PI / 30 * j);
            ctx.moveTo(0, -140);
            ctx.lineTo(0, -150);
            ctx.stroke();
            ctx.restore();
        }
        //绘制指针重合的白点
        ctx.save();
        ctx.arc(200, 200, 1, 0, Math.PI * 2, false);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.restore();
        //递归调用requestAnimationFrame
        requestAnimationFrame(go);
    }
    //使用requestAnimationFrame做动画效果
    requestAnimationFrame(go);

</html>

```