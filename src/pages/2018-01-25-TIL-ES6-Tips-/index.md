---
id: 129
title: 'ES6 - mấy kiểu cú pháp chưa có cơ hội dùng'
date: 2018-01-25
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - javascriptissexy
  - ES6
---

Bài này gốc từ [Medium - 7 Hacks for ES6 Developers](https://medium.com/dailyjs/7-hacks-for-es6-developers-4e24ff425d0b). Hầu hết mấy kỹ thuật này mình vẫn chưa có dịp dùng. Ghi chú lại có dịp tìm hiểu tiếp. 

### Hack #1 — Hoán vị hai biến
Sử dụng *Array Destructuring* để hoán vị hai biến:
```js
let a = 'world', b = 'hello'
[a, b] = [b, a]
console.log(a) // -> hello
console.log(b) // -> world
```

### Hack #2 — Async/Await với Destructuring
Một lần nữa, *Array Destructuring* lại vô cùng hữu dụng. Nó kết hợp với *async/await* và *promises* để đơn giản hóa một luồng vốn phức tạp.
```js
const [user, account] = await Promise.all([
  fetch('/user'),
  fetch('/account')
])
```
### Hack #3 — Debugging
Thay vì sử dụng nhiều `console.log` cho vài biến, giờ gộp tất cả vào làm một như sau:
```js
const a = 5, b = 6, c = 7
console.log({ a, b, c })
// kết quả xuất ra gọn ghẽ:
// {
//    a: 5,
//    b: 6,
//    c: 7
// }
```
### Hack #4 — Những đoạn code chỉ 1 dòng
Cú pháp gọn gàng hơn hẳn khi thao tác với mảng.
```js
// Tìm giá trị lớn nhất trong array
const max = (arr) => Math.max(...arr);
max([123, 321, 32]) // outputs: 321
// Tính tổng của array
const sum = (arr) => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3, 4]) // output: 10
```

Ghi chú: Đoạn code tìm Max trên sử dụng [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) `...` cho phép chuyển đổi một chuỗi thành nhiều argument (khi gọi hàm), hoặc nhiều phần tử (với array). Cho nên, nếu gọi trực tiếp `Math.max([123, 321, 32])` thì sẽ trả về `NaN` do hàm `Math.max()` coi `[123, 321, 32]` là 1 argument, trong khi thêm *spread operator* vào thì nó coi đó là nhiều arguments có thể so sánh lẫn nhau.

###  Hack #5 — Ghép nhiều Array
`Spread operator` được dùng thay vì `concat`:
```js
const one = ['a', 'b', 'c']
const two = ['d', 'e', 'f']
const three = ['g', 'h', 'i']
// Cách (cũ) #1
const result = one.concat(two, three)
// Cách (cũ) #2
const result = [].concat(one, two, three)
// Cách mới
const result = [...one, ...two, ...three]
```

### Hack #6 — nhân bản array và object
Array và Object có thể dễ dàng nhân bản nhờ:
```js
const obj = { ...oldObj }
const arr = [ ...oldArr ]
```
Lưu ý: Cách này tạo ra cái gọi là *shallow clone* hoặc là *shallow copy" (nhân bản nông?)*. *Shallow* (nông) để phân biệt với *deep* (sâu). 

Vậy thế nào là *copy nông*? là nhân bản 1 object (hoặc array) nhưng object/array mới vẫn tham chiếu về object/array cũ. Ví dụ:
```js
var memberFCCHanoiOriginal = {
  name: 'Tâm', 
  age: 25, 
  profession: 'Software Engineer'
  };
// tạo 1 copy của object memberFCCHanoiOriginal nói trên
var memberFCCHanoiDuplicated = memberFCCHanoiOriginal;
```
bây giờ bất kỳ thay đổi nào của 1 trong 2 objects nói trên, đều ảnh hưởng đến object còn lại. Vụ này xảy ra do cả 2 đều trỏ về cùng 1 nơi trên bộ nhớ.
```js
// thay đổi object mới
memberFCCHanoiDuplicated.name = "Trung";
memberFCCHanoiOriginal.name // trả về "Trung" thay vì "Tâm"
// thay đổi object cũ
memberFCCHanoiOriginal.age = 33;
memberFCCHanoiDuplicated.age // trả về "33" thay vì "25"
```
Vậy đối ngược với *shallow copy* này là *deep copy* thì hẳn là cách nhân bản nhưng object/ array mới tạo ra sẽ không dây mơ rễ má gì với object/ array gốc. Muốn có vụ này thì mỗi object/ array phải trỏ về 2 nơi khác nhau trên bộ nhớ. Cách để có *deep copy* thì bàn sau. 

Ảnh minh họa dưới đây lấy từ 1 bài trên Medium với nhan đề "[Understanding Deep and Shallow Copy in Javascript](https://we-are.bookmyshow.com/understanding-deep-and-shallow-copy-in-javascript-13438bad941c)"
![alt text][image01]{: .center-image }

### Hack #7 — Tham số được đặt tên

Để giúp cho việc tạo function và gọi nó dễ dàng hơn, ta sử dụng *destructuring*.

Ví dụ, cách khai báo hàm sau vẫn hay được dùng. Trông nó đã ok lắm rồi:
```js
const sayHello = (id, force, verbose) => {
  ... một đoạn code nào đó
}

// Sau đấy, ta gọi hàm này như dưới đây, truyền vào các tham sốchỉ là giá trị
sayHello(150, true, true)
```
Cách trên có thể ok trong trường hợp code ngắn, đơn giản. Còn với code phức tạp, hàm nhiều, tham số dài dằng dặc, ngoảnh đi ngoảnh lại đọc code mình đoạn ọi hàm bỗng quen béng mất tham số này có nghĩa là gì. Lúc đấy phải kéo đến chỗ khai báo hàm, mất thêm ít thời gian, gây xao nhãng.

Còn bây giờ, ta có thể đặt tên cho tham số như sau:

```js
const sayGoodbye = ({ id, name, force, verbose }) => {
  ...một đoạn code nào đó
}

// Sau đấy, ta gọi hàm  và truyền vào các tham sốvới cả tên và giá trị
sayGoodbye({ id: 150, force: true, verbose: true })
```
Cách này có tiện không? Tùy. Đôi khi dài dòng quá cũng mệt. Nhưng chắc chắn là một thời gian sau quay lại vẫn hiểu ngày trước mình truyền tham số gì, tên nó là chi vào hàm. Cũng ok. 

[image01]: https://ngminhtrung.github.io/images/PostIMG/2017-01-25-hacks-ES6/image01.png "Khác biệt giữa shallow và deep copy""
