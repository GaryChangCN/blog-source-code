---
title: CSS3 3D立方体
date: 2016-08-12 10:14:21 
tags:
	 - css
	 - javascript
category: css
---

## 演示

### <a href="/show/3d.html" target="_blank">新窗口打开</a>
{% iframe /show/3d.html 300px 300px %}

### 思路

首先需要给这个正方体的父容器设置 `transform-style` 属性为 `preserve-3d` 这样才能保证子元素是在一个三位空间内，再给父元素的 `position` 设置为 `relative`，然后给子元素正方体这6个面改变角度和位置使其在正确的位置并更改其 `positon` 为 `absolute` 相对于父元素定位。
改变角度和位置都使用 `transform` 属性，之后在三维坐标系通过 `rotate3d()` 改变角度，通过 `translate3d()` 改变位置。就ok了。
*tips* 微信目前无法展示此效果，请选择使用浏览器打开。

### 代码

#### html

```html
		<div class="container">
			<div class="box">
				<div id="front">front</div>
				<div id="back">back</div>
				<div id="top">top</div>
				<div id="bottom">bottom</div>
				<div id="left">left</div>
				<div id="right">right</div>
			</div>
		</div>
```

#### CSS

<!-- more -->

```css
			*{
				margin: 0;
				padding: 0;
				border:0px;
			}

			.container{
				width: 400px;
				height: 200px;
			}
			/*.box:hover{
				transform: rotateX(360deg) rotateY(360deg);
			}*/
			@keyframes gogogo{
				0%{
					transform: rotateX(0deg) rotateY(0deg);
				}
				50%{
					transform: rotateX(180deg) rotateY(180deg);
				}
				100%{
					transform: rotateX(360deg) rotateY(360deg);
				}
			}
			.box{
				transform-style: preserve-3d;
				/* 这里perspective 为景深 */
				/*perspective:400px;*/
				position: relative;
				margin-left: 100px;
				margin-top: 300px;
				transition: transform 5s;
				animation:gogogo 2s linear infinite;
			}
			.box>div{
				width: 200px;
				height: 200px;
				position: absolute;
				line-height: 200px;
				text-align: center;
				opacity: 1;
				font-size: 40px;
				opacity: 0.9;
			}
			#front{
				background-color: red;
				transform:translateZ(100px);
			}
			#back{
				background-color: green;
				transform: translateZ(-100px) rotateY(180deg);
			}
			#top{
				background-color: lightblue;
				transform: rotateX(90deg) translateZ(100px);
			}
			#bottom{
				background-color: yellow;
				transform: rotateX(-90deg) translateZ(100px);
			}
			#left{
				background-color: pink;
				transform:rotateY(-90deg) translateZ(100px);
			}
			#right{
				background-color: orange;
				transform:rotateY(90deg) translateZ(100px);
			}
```		
