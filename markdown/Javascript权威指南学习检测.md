## Javascript权威指南学习检测

#### 1-8章

1. 语言概述  
   > ECMAScript与Javascript的联系？Javascript的宿主环境指的是？不同的宿主环境对Javascript的执行有什么影响？  

   <br><br><br>

2. 词法结构  
   > 什么情况下JS引擎会自动‘帮忙’添加分号？  
   
   <br><br>
   
3. 类型、值和变量  
   > 列举3个js中的转义字符并描述其作用  
   
   <br>
   > 列举js里的包装对象
   
   <br>
   > 下列值转换为boolean类型分别是什么？null undefined 0 1 -1
   
   <br>
   > 列举一些js中用于数字操作的api
   
   <br>
   > 描述一下函数作用域链是如何构成的
   

   下列代码的输出结果
   
   ~~~js
   // js浮点数
   console.log(0.1+0.2===0.3);
   console.log(0.2-0.1===0.1);
   
   // null & undefined
   console.log(typeof null);
   console.log(typeof undefined);
   console.log(null == undefined);
   console.log(null === undefined);
   
   // string
   var string = "name", string2 = new String(string);
   console.log(typeof string);
   console.log(typeof string2);
   console.log(string == string2, string === string2);
   
   // variable init
   var a = 10;
   function a(){}
   console.log(typeof a);
   
   // variable scope
   console.log(a);
   if("a" in window){
   		var a = 10;
   }
   console.log(a);
   ~~~
   

4. 表达式和运算符
   > instanceof 运算符的用法和作用
     
   <br>
   > == 和 === 的区别
   
   下列代码的输出结果
   
   ~~~js  
   // create object
   var a = new A();
   function A(){
     this.name = 10;
     return {name:11};
   }
   console.log(a.name);
   
   var a = new A();
   function A(){
     this.name = 10;
     return 11;
   }
   console.log(a);
   
   // operator
   console.log(1 || 2 && 3);
   console.log(0 || 1 && 2);
   console.log(-1 && 0 || 1);
   
   var a,b;
   console.log((a=1,b=2));
   
   console.log(3 in [1,2,3]);
   ~~~

5. 语句  
	
	~~~js
	// scope
   var a = 10;
	{
		function a(){}
	}
   console.log(a);
   
   // switch
   function switch(a){
   		switch (a) {
			case '10':
				console.log(10);
			case '20':
				console.log(20);
		}
   }
   switch(10);
   switch('10');
   
   // for in 
   // 下面这段代码的作用是？
   var o = {x:1,y:2,z:3};
   var a = [], i =0;
   for(a[i++] in o);
   
   // try/catch/finally
   try {
       var a = 10;
       return false;
   } catch(e){
   
   } finally {
       console.log(a);
   }
   
	~~~
	
	> 描述一下for in 语句的特点，for in语句遍历属性的顺序？
	
	<br>
	> 严格模式和非严格模式的区别

6. 对象
   
   > 没有原型的对象有？
   
   <br>
   > 什么是对象的原型？它的作用？
   
   <br>
   > 对象的属性具备哪些特性？分别说明
   
   <br>
   > 获取一个对象的属性有哪些方法？
   
   <br>
   > es5中为Object提供了哪些新的方法？

7. 数组
   > 列举数组常用的一些方法(含es5)
   
   <br>
   > 如何实现将字符串"12345" 转换为 [5,4,3,2,1]
   
   <br>
   > splice的几种用法
   
   ~~~js
   var a = [1,2,3];
   delete a[2];
   console.log(a.length, a);
   
   console.log(typeof []);
   ~~~

8. 函数
	> 描述类数组概念
	
	<br>
	>结合代码描述一下作用域链如何构成的
	
	<br>
	> js中如何实现私有变量
	
	<br>
	> 如何判断一个对象是否是数组类型，有哪些方法？
	
	~~~js
	// function closure
	function cons(){
		var funcs = [],
			i;
		for(i=0;i<10;i++){
			funcs[i] = function(){return i;}
		}
		
		return funcs;
	}
	var funcs = cons();
	console.log(funcs[2]());
	
	// Function.prototype.bind
	function A () {
    	this.name = 2;
	}
	var B = A.bind({age:10});
	var b = new B();
	console.log(b.age);
	~~~

9. DOM
	> 事件传播的三个阶段
	
	<br>
	> 常用的DOM事件(鼠标、文本、键盘等)

10. XMLHttpRequest
	> jsonp实现跨域资源请求的原理
	
	<br>
	> 简单描述一下ajax及应用场景

   