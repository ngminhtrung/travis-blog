
### Thuật ngữ:

Các thuật ngữ sau có thể dịch được:
- an asynchronous operation: từ operation này có thể dịch là "tác vụ", hoặc "công việc". Dịch cả cụm: một tác vụ/ công việc bất đồng bộ. 

`Promise` đơn thuần là 1 object giúp ghi nhận một "công việc bất đồng bộ" nào đó (an asynchronous operation) đã hoàn thành hay thất bại.

Về cơ bản, mỗi `promise` là một object được trả về 

```js
function successCallback(result) {
    console.log("it succeeded with " + result);    
}

function failureCallback(erro) {
    console.log("It failed with " + error);
}

doSomething(successCallback, failureCallback);
```

viết kiểu mới thành:
```js 
const promise = doSomething();
promise.then(successCallback, failureCallback);
```

hoặc đơn giản là:
```js 
doSomething().then(successCallback, failureCallback);
```

Không giống như kiểu viết cũ, việc dùng `Promise` có vài điểm lợi là:
- Callback sẽ không bao giờ được gọi trước khi chu trình thực thi hiện tại của event loop của JavaScript kết thúc.
- Callback được thêm `.then` ngay cả sau khi công việc bất đồng bộ trên thành công/ thất bài thì vẫn được gọi. 
- Nhiều callback có thể được thêm vào với `.then`, để giúp nó được thực thi độc lập nhau. 

Tuy vậy, điểm lợi lớn nhất của việc dùng `Promise` là "chaining".

### Chaining

Một nhu cầu thường gặp đó là thực thi từ hai tác vụ bất đồng bộ trở lên theo thứ tự nối tiếp nhau, tức là khi tác vụ này xong thì đưa kết quả cho tác vụ tiếp theo để thực hiện. Cái này được gọi là "promise chain" (một chuỗi các promise).

Mấu chốt ở đây là hàm `then()`, giúp trả về một `promise` mới, khác `promise` cũ. Với hàm `then()`, thay vì viết như sau:

```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```

ta có thể viết gọn hơn thành:

```
const promise = doSomething().then((successCallback, failureCallback);
````

Bạn `promise` ở đoạn code thứ 2 không chỉ biểu diễn xem `doSomething()` đã hoàn thành, mà còn là đại diện cho hàm `successCallback()` và hàm `failureCallback()` truyền vào, do cũng là hàm bất đồng bộ nên cũng trả về ` promise`. Trong trường hợp này, bất kỳ callback nào thêm vào `promise2` sẽ xếp hàng phía sau promise được trả về bởi `successCallback()` hoặc `failureCallback()`.

Về cơ bản, mỗi promise đại diện cho sự kết thúc của bước bất đồng bộ khác trong chuỗi. 

Trong quá khứ, việc thực hiện một vài tác vụ bất đồng bộ liền tù tì thường dẫn đến cái gọi là "callback hell":

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

Còn bây giờ, ta viết thành:
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

Tham số truyền vào cho `then` là không bắt buộc, và `catch(failureCallback)` là cách viết tắt của `then(null, failureCallback)`. 

Nếu viết bằng hàm mũi tên, ta lại biến code thành:
```js
doSomething()
.then(result => doSomethingElse(resul))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
    console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

**Lưu ý quan trọng**: Luôn luôn trả về một kết quả, nếu không callback sẽ không nhận được kết quả của promise phía trước.

### Chaining after a catch

Ngay cả sau `catch`, tức là sau khi nhận về ` `failure`, thì ta vẫn có thể tiếp tục thêm vào các hàm `then()`, ví dụ:

```js
new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    throw new Error('Something failed');
        
    console.log('Do this');
})
.catch(() => {
    console.log('Do that');
})
.then(() => {
    console.log('Do this whatever happened before');
});
```

Đoạn code trên trả về:
```
Initial
Do that
Do this whatever happened before
```

Chú ý là đoạn text "Do this" không xuất hiện bởi lỗi "Something failed" đã khiến nó bị bỏ qua.

### Error propagation

Bạn có nhớ hàm `failureCallback` xuất hiện 3 lần trong cái callback hell, trong khi khi viết promise dạng chuỗi, nó chỉ xuất hiện 1 lần?

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);
```

Promise đã giải quyết 1 lỗi cơ bản với kim tự tháp callback (callback hell), nhờ vào việc bắt lấy toàn bộ các error, kể cả những looxi ngoại lệ (exception) cũng như các lỗi liên quan đến lập trình. This is essential for functional composition of asynchronous operations.


### Tham khảo:

- [Google Developpers - Promises](https://developers.google.com/web/fundamentals/primers/promises)
- [MDN web docs - Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
