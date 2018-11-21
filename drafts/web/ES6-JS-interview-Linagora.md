---
id: 103
title: 'ES6 - var let const - và chuyện thằng sau chửi thằng đi trước'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

### Question 02
---

**Question**: 
```js
function test() {
    console.log(a);
    console.log(foo());
    var a=1;
    function foo(){
		return a;
    }
}

test()
```

**Answer**:

To explain this question, we need to refer to the **hoisting** mechanism of JavaScript:
1. Variable and function declarations are "moved" from where they appear in the flow of the code to the top of the code. 
2. Only the declarations themselves are hoisted, while any assignments or other executable logic are left in place
3. Hoisting is per-scope
4. Functions are hoisted first, and then variables.

From the theory above, we could see that, within the scope of `test()`:
- The *execution* part is:
  ```js
  console.log(a);
  console.log(foo());
  ```
- The *variable declaration & assignment* (`var a = 1`) will be splited into:
  - *variable declacration*: 
    ```js
    var a;
    ```
  - *variable assignment*:
    ```js
    a = 1;
    ``` 
- The *function declaration* is:
  ```js
  function foo(){
		return a;
    }
  ```
- So the actual order of code:
  ```js
  function test() {
      var a; // undefined
      function foo(){
      return a;
      }
      console.log(a); // undefined
      console.log(foo()); // undefined
      a = 1;
  }

  test()
  ```
- With the order above, the `test()` will print output:
  ```js
  undefined
  undefined
  ```

**Reference**:
- You Don't Know JS: Scope & Closures - Chapter 4: Hoisting. Author: Kyle Simpson.

### Question 03:
---

**Question**: Define a repeatify function on the String object. 

**Answers**: To do this task, we need to:
- declare and add method named "repeatify" into String.prototype.
- make use of `String.prototype.repeate()` method. 

```js
String.prototype.repeatify = function (number) {

return this.repeat(number);
};

"helloLinagoraVietnam".repeatify(2);
// output: "helloLinagoraVietnamhelloLinagoraVietnam"
```
function printing() {
    console.log(1);
    setTimeout(function() {console.log(2);},1000);
    setTimeout(function() {console.log(3);},0);
    console.log(4);
};