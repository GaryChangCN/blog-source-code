---
title: js排序算法
date: 2017-06-14 16:28:30
tags: 
	 - 算法
	 - javascript
category: javascript
---

## 前言

填之前的坑[几种排序算法的javascript实现](/2016/12/21/SortingAlgorithm/)
上篇文章只写了冒泡排序，插入排序和快速排序，这篇写一下其他的。

<!--more-->

## 选择排序

选择排序即是把数组中最小项移到数组第一项，然后从第二项开始到最后一项，把最小的和第二项交换........

```js
function seleSort(arr){
	let len=arr.length;
	for(let i=0;i<len;i++){
		for(let j=i;j<len;j++){
			if(arr[j]<arr[i]){
				let max=arr[i];
				arr[i]=arr[j];
				arr[j]=max;
			}
		}
	}
	return arr;
}
```

## 希尔排序

希尔排序是插入排序的优化，具体过程可以看这篇文章，讲的很清晰。[排序四 希尔排序](http://www.cnblogs.com/jingmoxukong/p/4303279.html)

```js
function shellSort(arr){
	let len = arr.length;
    for (let point = Math.floor(len / 2); point > 0; point = Math.floor(point / 2)) {
        for (let i = point; i < len; i++) {
            for (let j = i - point; j >= 0 && arr[j] > arr[point + j]; j -= point) {
                let temp = arr[j];
                arr[j] = arr[point + j];
                arr[point + j] = temp;
            }
        }
    }
	return arr;
}
```