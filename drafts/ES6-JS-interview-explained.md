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

https://dev.to/maxpou/typical-javascript-interview-exercises-explained

### Bài 1: 
---
> Tại sao đoạn code sau thay vì in ra "Hey Sơn Tùng MTP", lại in ra "Xin chào Tóc Tiên".

```js
function greet(person) {
  if (person == {name: 'MTP'}) {
    return 'Hey Sơn Tùng MTP';
  } else {
    return 'Xin chào Tóc Tiên';
  }
}

greet({name: 'MTP'});
```

**Trả lời**: 

Object `{name: 'MTP'}` trong `if (person == {name: 'MTP'})` trông thì giống với object {name: 'MTP'} trong `greet({name: 'MTP'});` về giá trị bên trong, nhưng thực chất chúng trỏ đến 2 objects ứng với 2 địa chỉ khác nhau trong bộ nhớ. Trong JavaScript, việc so sánh 2 objects (dù là với `==` hay với `===`), thì kết quả trả về là `true` khi và chỉ khi 2 objects cùng trỏ đến 1 object. Tham khảo thuật toán so sánh ứng với `==` ở [ECMA - The Abstract Equality Comparison Algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3).

Phương án xử lý? Thay vì so sánh object (referencey type), hãy so sánh `value`:
```js
function greet(person) {
  if (person.name === 'MTP') {
    return 'Hey Sơn Tùng MTP';
  } else {
    return 'Xin chào Tóc Tiên';
  }
}

greet({name: 'MTP'});
```

### Bài 2:
> Tại sao đoạn code sau lại in ra toàn số 4 thay vì 0, 1, 2, 3 như mong muốn. 

```js
function (var i=0; i <4; i++) {
  setTimeout(() => console.log(i),0);
}
```

### Bài 3:
> Tại sao đoạn code sau lại in ra `undefined` thay vì "Bông".

```js
let dog = {
  name: 'Bông',
  sayName() {
    console.log(this.name)
  }
}

let sayName = dog.sayName;
sayName();
```