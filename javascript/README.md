### js的基本数据类型有哪些
```javascript
Undefined、Null、Boolean、Number、String
```
* Object属于复杂数据类型
* javascript中typeof的结果有六个，分别是boolean,number,string,object,function,undefined
* 其中typeof null === ‘object’ 

### 什么是词法作用域，js中如何改变词法作用域

### with和eval为什么会导致性能下降

### js中有哪些内置对象
* Object是js所有对象的父对象
* 数据封装类对象：Object、Array、Boolean、Number 和 String
* 其他对象：Function、Arguments、Math、Date、RegExp、Error

### 根据存储位置的不同，js数据类型可以分为？

* 原始数据类型（ Undefined,Null,Boolean,Number,String ）
* 引用数据类型 ( 对象，包好数组，函数等)

> 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，频繁使用；
> 引用数据类型存储在堆(heap)中,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；
> 引用数据类型在栈中存储了指针，指向堆中该实体的起始地址。
> 解释器使用引用数据类型时，先检索栈中的地址，取得地址后从堆中获得实体。
> 栈内存的分配与回收由系统控制，但堆内存的分配与回收需手动控制，
> 常常将引用值指针设置为null回收内存

### 说几条写js的基本规范？
1.不要在同一行声明多个变量。
2.请使用 ===/!==来比较true/false或者数值
3.使用对象字面量替代new Array这种形式
4.不要使用全局函数。
5.switch语句必须带有default分支
6.函数不应该有时候有返回值，有时候没有返回值。
7.for循环必须使用大括号
8.if语句必须使用大括号
9.for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。

### js原型，原型链，特点
1.原型
每个函数都有一个prototype属性，如果这个函数被当做一个构造函数（或称为构造器）使用，其创建的对象有一个隐式引用（__proto__，称为对象的原型）指向构造函数的prototype，通过这个构造函数无论创建多少对象，这些对象的__proto__都指向构造函数的prototype属性。

2.原型链
原型也是一个对象，因此原型也有一个非空引用指向自己的原型（所有对象最终的原型指向Object内置对象），由此形成原型链
```javascript
arr = new Array() // 数组继承自Object
Array.prototype === arr.__proto__ // true
Object.prototype === arr.__proto__.__proto__  === Array.prototype.__proto__// true，
```
3.特点
* 对象的原型是一个引用值，创建的每一个对象并没有属于自己的原型副本，因此改变原型时，与之相关的对象也会继承该改变
* 对象属性查找时，先查找自己是否具有该属性，不存在则查找原型的属性，不存在则查找原型的原型的属性，直至内置对象Object
```
arr = new Array()
arr.hello = "I am a Array"
arr.hello // 自己的属性
arr.slice // 继承属性，继承自 arr.__proto__（Array.prototype）
arr.toString // 继承属性，继承自 arr.__proto__.proto__（Object.prototype）
arr.world // 沿着原型链查找自内置对象Object，仍没有找到，返回undefined
```

```javascript
/* 相关判断 */
//（1）instanceof 检查一个对象是否是一个构造函数的实例，原型链上的均可
var arr = new Array()
arr instanceof Object  // =>  true 
Array instanceof Object  // =>  true
//（2）in 判断对象是否存在某属性
'toString' in arr // => true，in包含继承属性
//（3）hasOwnProperty 判断对象中是否存在某本地属性，不含继承属性
arr.hasOwnProperty('toString')  // => false，toString继承自Object
//（4）isPrototypeOf 判断原型对象与实例之间的关系
Object.prototype.isPrototypeOf(arr) // => true，原型链上的均可
//（5）constructor，通过构造函数判断类型
Array.prototype.constructor === Array
arr.__proto__.constructor === Array
```

### js如何实现继承
1.构造函数的继承
```javascript
//（1）构造函数绑定
function Cat(name,color){
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
//（2）原型模式
Cat.prototype = new Animal(); //原型指向Animal，继承Animal的所有属性
Cat.prototype.constructor = Cat; //改变构造函数的指向
var cat1 = new Cat("大毛","黄色");
//（3）直接继承原型
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
//（4）空对象中介，常常封装为extend函数
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
//（5）拷贝继承
```

2.非构造函数的继承
```javascript
//（1）object方法（改变原型指向）
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
//（2）浅拷贝，缺点是拷贝的值若为引用对象，改变会有副作用
//（3）深拷贝，现在jQuery库使用的继承方法
```
参考：[阮一峰-构造函数继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)


### instanceof运算符作用，请给出其等价实现
```javascript
function instance_of(V, F) {
  var O = F.prototype;
  V = V.__proto__;
  while (true) {
    if (V === null)
      return false;
    if (O === V)
      return true;
    V = V.__proto__;
  }
}
```
参考 [stackoverflow的回答](http://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript)

### js大（小）于连续判断
```javascript
var a = 5
var b = 2
if( 4 < a < b) {
    // 和python，coffeescript不同，js无真正意义上的连续判断
    // 等价于(4 < 5) < 2 => true(1) < 2 => true
    console.log(a) // 5
} else {
    console.log(b)
}
```

