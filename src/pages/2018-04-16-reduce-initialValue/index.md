---
title: 'Javascript - inititalValue trong reduce() có quan trọng không?'
date: 2018-04-16
author: ngminhtrung
categories:
  - javascript
tags:
  - react
  - front-end
  - developper
  - tool
  - reduce
---

Đọc code mẫu về hàm `reduce()` trong [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), thấy hàm `reduce()` khá "đơn giản".

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer)); // output: 10

console.log(array1.reduce(reducer, 5)); // output: 15
```

Số `5` ở `console.log()` thứ 2 chính là `initialValue`, một tham số truyền vào cho `reduce()` nhưng không bắt buộc, chỉ là dạng "*optional*". 

Yeap, nó "optional", nhưng **nó có quan trọng không**? Câu trả lời là **CÓ**. Và "có lẽ" là nên tạo thói quen thêm `initialValue` cho mọi lần sử dụng `reduce()`.

Hãy xem đoạn code sau (cũng trong hướng dẫn của MDN), mục đích là để **xóa các item bị trùng trong một array**:

```javascript
var data = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
var removeDuplicate = (finalItemList, currentItem) => {
    const length = finalItemList.length;
    if (length === 0 || finalItemList[length - 1] !== currentItem) {
        finalItemList.push(currentItem);
    } 
    return finalItemList;
}
var finalResult = data.sort().reduce(removeDuplicate);
```
Nhìn qua logic có vẻ ổn, ta không đưa vào `initialValue` cho `reduce()` vì chủ quan nghĩ nó không cần thiết. Nhưng khi chạy sẽ được báo lỗi `finalItemList.push is not a function`. 

TẠI SAO? Tại nếu không truyền vào`initialValue`, thì trong vòng lặp đầu tiên,`reduce()` sẽ mặc định coi phần tử đầu tiên của array (tức là `1`), là `finalItemList`. Mà `1` là kiểu `Number`, nó đâu có method `push()` như kiểu `Array`.

Do vậy, việc truyền vào `initialValue` bằng 1 mảng rỗng `[ ]` ở đây là **bắt buộc**. Đoạn code đó phải sửa thành:
```js
var finalResult = data.sort().reduce(removeDuplicate, []);
```

Với những trường hợp khác cũng tương tự, khi ta phải làm việc lẫn lộn giữa object, array, string, number, thì nguy cơ gây lỗi kiểu trên là có. 

Vậy tốt nhất là cứ truyền vào một `initialValue` ban đầu bằng `0`, bằng `''`, bằng `[]`, hoặc `{}` tùy tình huống. Rule of thumb là cho nó cùng kiểu với kiểu dữ liệu cuối cùng muốn nhận về.

ngminhtrung 16-04-2018
