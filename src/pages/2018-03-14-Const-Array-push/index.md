---
title: 'JavaScript - const array vẫn có thể push thêm dữ liệu'
date: 2018-03-14
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
  - const
  - array
---

Xưa nay vẫn hiểu `const` trong JavaScript là khai báo hằng số, bât biến, không thể thay đổi chỉnh sửa. Nên khi khai báo mảng bằng `let` và `push` thêm dữ liệu cho nó, bị ESlint băt lỗi, hỏi tại sao mày không dùng `const`, còn Prettifier tự động biến `let` thành `const`:

```js
let arr = [];
arr.push[2, 3];
// ESLint nhắc nhở đoạn trên ngay, yêu cầu đổi thành const arr = []
```

Tra lại [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) thì đúng thế thật:

##### Với `array`, một khi khai báo với `const` thì không gán bằng 1 array khác được, nhưng `push` phần tử mới thì ok:

```js
const arr = [2,3];
arr = [4,5] // báo lỗi: Assignment to constant variable;
arr.push(4,5);
console.log(arr) // trả về [2,3,4,5]
```

##### Với `object`, cũng gần như tương tự, gán bằng object khác thì không được, nhưng thay đổi giá trị của thuộc tính thì ok. 

```js
const obj = {key: 10};
obj = {key: 5} // báo lỗi: Assignment to constant variable
obj.key = 5 // ok, obj sẽ là {key: 5}
```

ngminhtrung 14-03-2018