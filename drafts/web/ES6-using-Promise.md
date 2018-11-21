---
id: 103
title: 'ES6 - sử dụng Promise'
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


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

- `Promise` là một object. 
- Object này dùng để chứa thông tin xem 1 công việc (dạng bất đồng bộ) nào dó đã:
  - hoàn thành
  - hay thất bại giữa chừng.
- Do hầu hết chúng ta đều sử dụng những promise đã tạo sẵn, vì vậy tốt nhất là nên nói về cách chúng ta sử dụng promise trước khi giải thích làm sao tạo ra nó. 

- Về căn bản, nếu ta gọi hàm callback ở đâu đó, thì promise là một object trả về đúng nơi đấy, thay vì truyền callback vào 1 hàm. Tức là:
  - Phong cách truyền thông: 
    ```js
    function successCallback(result) {
      console.log("Thành công rồi. Kết quả là: " + result);
    }

    function failureCallback(error) {
      console.log("Gặp lỗi như sau: " + error);
    }

    doSomething(successCallback, failureCallback);
    ```
  - Phong cách mới: 
    ```js
    let promise = doSomething(); 
    promise.then(successCallback, failureCallback);
    ```
    hoặc đơn giản chỉ là:
    ```
    doSomething().then(successCallback, failureCallback);
    ```

### Làm phong cách mới có gì hay?

Không giống như phong cách cũ, cách gọi promise đem lại vài đảm bảo sau:

- Hàm callback sẽ không bao giờ được gọi trước khi hàm chứa nó kết thúc. 
- Hàm callback phía sau `.then` sẽ được gọi sau khi hàm chứa nó kết thúc, cho dù kết quả có ok hay không.
- Có thể thêm nhiều hàm callback phía sau `.then` để chạy độc lập theo đúng thứ tự từ trên xuống dưới. 

Chính việc chèn nhiều hàm callback phía sau `.then` mà ta có lợi ích lớn nhất khi dùng promise, đó là khả năng xâu chuỗi các hàm. 

### Xâu chuỗi các hàm

Một nhu cầu rất phổ biến đấy là chạy 1 chuỗi các hàm A, B, C chẳng hạn, trong đó:
- Hàm B phải chạy sau khi A kết thúc. Hàm C phải chạy sau khi B kết thúc.
- Đầu ra của A là đầu vào của B. Đầu ra của B là đầu vào của C.

Với tính xâu chuỗi của promise, ta có thể làm được điều này một cách dễ dàng do hàm `then` trả về 1 promise mới khác với promise ban đầu.
```js
let promise = doSomething();
let promise2 = promise.then(successCallback, failureCallback);
```
hoặc:
```js
let promise2 = doSomething().then(successCallback, failureCallback);
```
Promise thứ 2 không chỉ điểm báo hiệu rằng `doSomething()` đã kết thúc, , but also of the successCallback or failureCallback you passed in, which can be other asynchronous functions returning a promise. When that's the case, any callbacks added to promise2 get queued behind the promise returned by either successCallback or failureCallback.

Phong cách truyền thống:
```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

Tham số của `then` là tùy ý, và hàm `catch(failureCallback)` là cách viết ngắn gọn thay cho `then(null, failureCallback)`. 

Cách viết trên khi chuyển sang hàm mũi tên như sau:
```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```


[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
