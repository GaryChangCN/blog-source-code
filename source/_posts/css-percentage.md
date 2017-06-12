---
title: CSS中百分比基准
date: 2016-12-16 13:26:00
tags: css
category: css
---

## width

相对于父元素的宽度，注意这里以及以下父元素是指css中其父元素。而不是一般的DOM结构中父元素。

## height

一般是相对于父元素的高度，但是当父元素高度没有指定时候其值会变成 auto。 <!--more-->

## margin

相对于父元素宽度。

## padding

同上

## border-radius

这个稍微复杂，根据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) 解释。
水平半轴相对于合模型（自身）的宽度，垂直半轴相对于自身高度。

## background-position

根据其所在的元素的尺寸来的，默认是0% 0%。由[此文](http://acgtofe.com/posts/2014/06/percentage-in-css)得知：
>background-position的百分比值，取的参照是一个减法计算值，由放置背景图的区域尺寸，减去背景图的尺寸得到，可以为负值。对照上面的示例，思考一下，应该可以感受到，以这个减法计算值为参照的话，正好可以符合我们感官上对背景图位置的理解。

## font-size

基于父元素的字体大小。

## line-height

基于自身的字体大小，这里`line-height`原理是`line-height`值减去字体大小值后平分放置在字体上下。

## vertical-align

基于自身的 `line-height` 。

## bottom top

基于其父元素的高度。

## left right

基于其父元素宽度。

## 参考资料

MDN [详述css中的百分比值](http://acgtofe.com/posts/2014/06/percentage-in-css)