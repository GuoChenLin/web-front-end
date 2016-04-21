1.js的基本数据类型有哪些
```javascript
Undefined、Null、Boolean、Number、String
Object属于复杂数据类型
javascript中typeef的结果有六个，分别是boolean,number,string,object,function,undefined
其中typeof null === ‘object’ 
```

1.js中有哪些内置对象
```javascript
Object是js所有对象的父对象
数据封装类对象：Object、Array、Boolean、Number 和 String
其他对象：Function、Arguments、Math、Date、RegExp、Error
``` 

1.根据存储位置的不同，js数据类型可以分为？
```javascript
原始数据类型（ Undefined,Null,Boolean,Number,String ）
引用数据类型 ( 对象，包好数组，函数等)

原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，频繁使用；
引用数据类型存储在堆(heap)中,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；
引用数据类型在栈中存储了指针，指向堆中该实体的起始地址。
解释器使用引用数据类型时，先检索栈中的地址，取得地址后从堆中获得实体。
栈内存的分配与回收由系统控制，但堆内存的分配与回收需手动控制，
常常将引用值指针设置为null回收内存
```

1.说几条写js的基本规范？
```javascript
1.不要在同一行声明多个变量。
2.请使用 ===/!==来比较true/false或者数值
3.使用对象字面量替代new Array这种形式
4.不要使用全局函数。
5.switch语句必须带有default分支
6.函数不应该有时候有返回值，有时候没有返回值。
7.for循环必须使用大括号
8.if语句必须使用大括号
9.for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。
```

1.js原型原型，原型链，特点
```javascript
每个对象创建时会初始化一个属性，prototype，
访问对象时，如果对象内部不存在这个属性，则会去prototype中寻找；
这个prototype又会有自己的prototype，这样一直找下去，直到Object内置对象，形成了原型链。
找不到该属性，则返回undefined
特点：原型对象是一个引用值，创建的每一个对象并没有属于自己的原型副本，因此改变原型时，
与之相关的对象也会继承该改变
相关判断
（1）instanceof 检查一个对象是否是一个构造函数的实例
new Array() instanceof Object  =>  true 
Array instanceof Object  =>  true
（2）in 判断对象是否存在某属性
'toString' in new Array() => true，in包含继承属性
（3）hasOwnProperty 判断对象中是否存在某本地属性，不含继承属性
new Array().hasOwnProperty('toString')  => false，toString继承自Object
（4）isPrototypeOf 判断原型对象与实例之间的关系
Object.prototype.isPrototypeOf(new Array()) => true，原型链上的原型均可
（5）constructor，通过构造函数判断类型
Array.prototype.constructor === Array
(new Array()).__proto__.constructor === Array
Array.prototype === new Array().__proto__
```

1.js如何实现继承
```javascript
1.构造函数的继承
（1）构造函数绑定
function Cat(name,color){
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
（2）原型模式
Cat.prototype = new Animal(); //原型指向Animal，继承Animal的所有属性
Cat.prototype.constructor = Cat; //改变构造函数的指向
var cat1 = new Cat("大毛","黄色");
（3）直接继承原型
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
（4）空对象中介，常常封装为extend函数
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
（5）拷贝继承
2.非构造函数的继承
（1）object方法（改变原型指向）
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
（2）浅拷贝，缺点是拷贝的值若为引用对象，改变会有副作用
（3）深拷贝，现在jQuery库使用的继承方法
```




















