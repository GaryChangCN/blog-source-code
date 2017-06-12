---
title: Go学习笔记
date: 2017-04-07 22:07:43
tags: [go]
category: [学习笔记]
---
## 包

程序运行入口是 main 包

```go
package go
```

## 导入

使用 import 导入包

<!--more-->

```go
import (
    "fmt"
    "math/rand"
)
```
可以一次导入多个包

## 导出

首字母大写是被导出的

```go
package main
import (
    "fmt"
    "math"
)
func main(){
    fmt.Println(math.Pi)
}
```

这里 PrintLn 和 Pi 首字母大写

## 函数

函数可以没有参数或者接受多个参数

```go
package main

import "fmt"

func add(x int,y int) int{
    return x+y
}

func main(){
    fmt.Println(add(1,2))
}

```

这里会做设定变量类型设定，类型在变量名之后， 在大括号前做返回类型设定

函数可以__返回多个值__，如果连续多个函数参数都是同种类型，则类型判定可以写在最后

```go
package main

import "fmt"

func swap(x,y string)(string,string){
    return y,x
}
func main(){
    a,b :=swap("hello","world")
    fmt.Println(a,b)
}
```

上面的 `a,b:=xxxx`类似解构复制

### 命名返回值

在函数大括号前的返回类型设定可以直接命名返回值，并且若返回值类型相同，类型也可以写在最后
函数体内的 return 可以没有参数，此时会返回哥哥变量的当前值，此种方法被称为**裸返回**，返回
的变量的名称应当有一定意义。

```go
package main

import "fmt"

func split(sum int)(x,y int){
    x=sum *4 /2
    y=sum-x
    return 
}
func main(){
    fmt.Println(split(20))
}
```

### 变量

使用 var 定义一个变量列表，类型在变量后面，var 可以写在包或者函数内
当定义变量时候没有初始化赋值，会赋值 `零值`

* 数值类型为 0
* 布尔类型为 false
* 字符串为 "" 空字符串

```go
package main

import "fmt"

var js, c, java bool
var golang int

func main() {
	var i int
	fmt.Println(i, js, c, java, golang)
}
// 0 false false false  0
```

## 初始化变量

定义变量时候可以包含初始值

```go
var i,j int=1,2
var c,py,java=true,false,"java8"
```

如果初始化变量时候使用表达式，则可以省略定义类型，**变量直接从初始值中获取类型**

## 短声明变量

**函数中** `:=`简介赋值语句在明确类型的地方可以代替 `var` 的定义，其不能用在函数外

```go
package main 
import "fmt"

func main(){
    var i,j=1,2
    k:=3
    c,py,java:=true,false,"java8"
    fmt.Println(i,j,k,c,py,java)
}
```
### 打包声明

同打包引入一样，变量也可以打包声明

```go
var (
    j int =1
    i =3
)
```

## 基本类型

* bool
* string
* int
    * int
    * int8 (byte)
    * int16 
    * int32 (rune)
    * int64
    * uint
    * uint8
    * uint16
    * uint32
    * uint64
    * uintptr
* float32
* float63
* complex64
* complex128

当无特别理由时候，定义整数类型时，首选 int

## 类型转换

直接使用‘基本类型方法’转换即可，例如

```go
var i int=42
var f float64 =float64(i)
```

go 需要显式转换
或者使用 `:=`

```go
i:=42
f:=float64(i)
```


```go
package main
import "fmt"

func main(){
    
}
```
## 类型推导

在下面这个例子中，使用了类型推导

`i:=42` 这里i为int类型，当为浮点数时，这个类型推导取决于赋值的常量精度。此时使用 `fmt.Printf`
会**返回变量类型**

```go
package main

import "fmt"

func main() {
	v := "232eqw4"
	fmt.Printf("type %T\n", v)
}
//type string
```
上面这个 `%T\n` 会对返回的值做一次处理，不加上的话会返回

```go
type%!(EXTRA string=232eqw4)%
```

## 常量

常量使用 `const` 定义

## for循环

go只有一种循环。for 循环

```go
package main

import "fmt"
func main(){
    sum:=0
    for i:=0;i<10;i++{
        sum+=1
    }
    fmt.Println(sum)
}
```

和js很像，只是没了 for 后面的条件语句的括号，并且
这个初始化语句和后置语句都是可选的。

```go
package main

import "fmt"
func main(){
    sum:=0
    for ;i<10;{
        sum+=1
    }
    fmt.Println(sum)
}
```

### 省略分号

当省略分号时候，for循环即变成了 “while”循环

```go
package main

import "fmt"
func main(){
    sum:=0
    for i<10{
        sum+=1
    }
    fmt.Println(sum)
}
```

## if语句

同for语句，if语句也不需要把条件用括号括起来。并且在条件语句中执行的简单语句
作用域在其花括号之内，也可以在其对应的else块中使用

## switch语句

同if语句，其执行顺序是从上到下，当匹配成功时候停止执行，当switch没有设置条件时候
等同于设置了 switch true，然后可以在case里面写判断条件，类似于 if else if else

```go
package main

import (
    "fmt"
    "time"
)

func main()
    t:=time.Now()
    switch {
        case t.Hour()<12:
            fmt.Println("good morning")
        case t.Hour<17:
            fmt.Println("good afternoon")
        default :
            fmt.Println("good eveneing")
    }
```

## defer语句

defer语句会延迟函数的执行，直到上层函数返回,
延迟调用的参数会立刻生成，但是在上层函数返回前函数都不会被调用

```go
package main

import "fmt"

func main(){
    defer fmt.Println("world")
    fmt.Println("hello")
}

// hello world
```

## defer 栈

延时调用的函数会被压入到一个栈中，当函数调用时，会按照后进先出顺序

```go
package main

import "fmt"

for i:=0;i<10;i++{
    defer fmt.Println(i)
}
fmt.Println("start")

// start
// 9876543210
```

## 指针

& 符号会生成一个作用其对象的指针， * 符号表示指针指向其底层的值

```go
package main

import "fmt"

func main(){
    i:=13
    p:=&i
    fmt.Println(*p)   //13
    *p=233
    fmt.Println(i) //233
    fmt.Println(*p) //233
}

```

## 结构体

struct 就是一个字段的集合，和js的对象相似

```go
package main

import "fmt"

type Vertex struct{
    X int
    Y int
    Z int
}
func main(){
    v:=Vertex{1,2,4}
    fmt.Println(v.X) //1    
}
```
通过 . 来读取和写入

## 结构体指针

```go
package main
import "fmt"
type Vertex struct {
    X int
    Y int
}
func main() {
    v := Vertex{1, 2}
    p := &v
    p.X = 3
    fmt.Println(v)
    fmt.Println(*p)
}
//{3,2}
//{3,2}

package main
import "fmt"
type Vertex struct {
    X int
    Y int
}
func main() {
    v := Vertex{1, 2}
    p := v
    p.X = 3
    fmt.Println(v)
    fmt.Println(p)
}
//{1,2}
//{3,2}
```
这里go和js第对象处理不同，js对象是引用传递的（默认就是传指针）

## 数组

```go
package main

import "fmt"
var a [10]int //10个整数的数组
func main(){
    var b [2]string
    b[0]="hello"
    b[1]="world"
    fmt.Println(b[0],b[1])  //hello world
}

```

## 数组slice

可以通过以下方式赋值

```go
package main

func main(){
    a:=[]int{1,2,3,4,5}
}
```

这里的slice可以理解和数组的项，数组的slice也可以为一个slice，这样就可以是多维数组

## 对slice切片

```go
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("s ==", s)
	//[,2,3,5,7,11,13]
	
	fmt.Println("s[1:4] ==", s[1:4])
    //[2,3,7]
    
	// 省略下标代表从 0 开始
	fmt.Println("s[:3] ==", s[:3])
    //[2,3,5]
    
	// 省略上标代表到 len(s) 结束
	fmt.Println("s[4:] ==", s[4:])
	//[11,13]
}

```

这里slice用法和js相同。

## 构造 slice

slice可以由函数 make 创建。会分配一个全是零值的数组并返回一个slice指向这个数组

```go
a:=make([]int,5)  //len(a)=5
```

make函数接受三个参数，
```
b:=make([]int,0,5) //len(b)=0  cap(b)=5 
```

这里cap是内建函数 容量

## nil slice

slice 的零值是 nil

一个nil 的slice的长度和容量是0

## 向slice末尾添加元素

使用内建函数 append,类似于js push

```go
package main

import "fmt"

func main(){
    var a[]int;
    printSlice("a",a); 
    a=append(a,0);
    printSlice("a",a);
    a=append(a,1);
    printSlice("a",a);
}

func printSlice(s string,x []int){
    fmt.printf("%s len=%d cap=%d %v\n",
    s,len(x),cap(x),x)
}

// a len=0 cap=0 []
// a len=1 cap=2 [0]
// a len=2 cap=2 [0,1]
```

## range

for 循环的 range 格式可以对 slice 或者 map 进行迭代循环。

当使用 for 循环遍历一个slice时，没戏迭代range将返回两个值，一个是当前slice下标，一个是该
下标对应元素的一个拷贝。

```go
package main

import "fmt"

var pow = []int{1, 2, 3, 4}

func main() {
	for i, v := range pow {
		fmt.Println(i, v)
	}
}

// 0 1
// 1 2
// 2 3
// 3 4
```

这里如果要忽略索引值可以把 i 换成 _ ，如果需要忽略value值，则把 v 和前面逗号删除即可。

## map

map 映射键到值

map在使用之前必须用make来创建；值为 nil 的 map 是空的，并且不能对其赋值。

```go
package main

import "fmt"

type Vertex struct {
	x, y int
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["index"] = Vertex{
		1, 2,
	}
	fmt.Println(m["index"])
	fmt.Println(m)
}
//{1,2}
//map[index:{1,2}]
```

map有点像对象数组

## map 语法

map语法和结构体语法类似，不过必须有键名。

```go
package main

import "fmt"

type Vertex struct {
	x, y int
}

var m = map[string]Vertex{
	"index1": Vertex{
		1, 2,
	},
	"index2": Vertex{
		3, 4,
	},
}

func main() {
	fmt.Println(m)
	fmt.Println(m["index2"])

}
// map[index1:{1,2} index2:{3,4}]
//{3,4}

```

这里看到 map 和js中的对象是非常类似的。
但是注意是每个 "键值对" 末尾都要有逗号，结构体也是

## 操作map

在 map m中插入或者修改一个元素

```go
m[key]=elem
```

获取元素

```go
elem=m[key]
```

删除元素,使用内建函数delete

```go
delete(m,key)
```

通过**双赋值**检测某个键是否存在

```go
elem,ok = m[key]
```

如果key在m中，则ok为 true，否则，ok为false，并且elem值是map这个元素类型的零值。
同样的，当从map中读取某个不存在的键是，结果是map的元素类型的零值。

## 函数的闭包

Go函数可以是一个闭包。闭包是一个函数值，他引用了函数体之外的变量。这个函数可以对这个引用的变量进行访问赋值。

