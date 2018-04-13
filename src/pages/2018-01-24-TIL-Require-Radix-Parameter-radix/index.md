---
id: 128
title: 'ESlint - parseInt phải có base'
date: 2018-01-24
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - today-i-learn
  - TIL
  - eslint
  - parseInt
  - radix
  - base
---

Hôm nay chạy 1 hàm để tách các chữ số trong 1 số nguyên, bị ESlint báo lỗi "*Require Radix Parameter (radix)*". Hàm có tên là *digitize* lấy từ "[30 seconds of code](https://30secondsofcode.org/#digitize)":

```js
const digitize = n => [...`${n}`].map(i => parseInt(i));
// eslint: Missing radix parameters
```

Hàm trên về logic nhìn chung không có vấn đề, nó đơn thuần chỉ chuyển số nguyên ban đầu thành 1 string thông qua *spread operator* của ES6 là `[...]` và *template literals* \`${expression}\`, sau đó gọi từng phần tử của chuỗi thông qua `map`, rồi convert chuỗi thành số thông qua `parseInt`. Tuy vậy, ESlint báo lỗi ở `parseInt` do thiếu *radix* nào đó nói trên. 

### ParseInt() là hàm gì?

Hóa ra vấn đề ở chỗ cách viết nguyên gốc của `parseInt()` là `parseInt(x, radix)`. Hàm `parseInt()` này dùng để chuyển đổi string (chính là "`x`") thành số nguyên ứng với *hệ cơ số* nào đó (chính là "`radix`", radix có thể là hệ cơ số 2, cơ số 10, 16, v.v.).

Trong [ECMAScript 2015 (ecma-262)](https://www.ecma-international.org/ecma-262/6.0/#sec-parseint-string-radix) ghi như sau:

> Leading white space in string is ignored. If radix is undefined or 0, it is assumed to be 10 except when the number begins with the code unit pairs 0x or 0X, in which case a radix of 16 is assumed. If radix is 16, the number may also optionally begin with the code unit pairs 0x or 0X.

Nghĩa là:
- Khoảng trắng ở đầu string `x` sẽ được bỏ qua (vì nó không có nghĩa).
- Nếu *radix* là **undefined** hoặc bằng 0, thì nó sẽ được ngầm hiểu là bằng 10. 
- Nếu string `x` bắt đầu với **0x** hoặc **0X** thì nó sẽ *radix* sẽ được ngầm hiểu là bằng 16 (nhưng ngược lại, nghĩa là nếu *radix* bằng 16, thì chưa chắc `x` đã bắt đầu với các con số kia)

Ví dụ:
```js
parseInt('10.83') // cho kết quả = 10
parseInt('.83') // cho kết quả = 0
parseInt('083') // cho kết quả = 83
parseInt('0.83', 10) // cho kết quả = 0 
parseInt('FXX123', 16) // cho kết quả = 15
```

Đọc đến đây thấy "*Ủa, mọi thứ đều chuẩn mà, mình có làm gì sai đâu?*". 

Đọc tiếp tài liệu của [ESlint - Require Radix Parameter (radix)](https://github.com/eslint/eslint/blob/master/docs/rules/radix.md) thì hiểu là ESLint đang nhắm đến những JavaScript engine tuân theo chuẩn trước cả ECMAScript ...5 (không phải 6 nhé), bởi lúc đó engine sẽ tự động coi rằng: nếu *radix* không được khai báo, và string `x` bắt đầu với số 0, thì mặc định coi người dùng muốn chuyển sang hệ cơ số 8 (*octal*). Vào thời điểm trước ES5, nếu người ta viết là `parseInt("0700")` thì sẽ nhận được kết quả là `448` (theo hệ cơ số 8), còn nếu viết rõ ràng hơn `parseInt("0700",10)` thì nó sẽ trả về `700`.

### Kết luận

Vậy có thể thấy là:
- Trong thời đại ES5 và ES6, quy tắc trên của ESLint là thừa. Mở Chrome bản mới nhất đến tháng 1 năm 2018, gõ trong console `parseInt("0700")` chắc chắn nhận về `700` chứ không phải `448`.
- ESlint cũng gợi ý nếu không thích thì tắt quy tắc trên đi :)). 

Dẫu vậy, ngồi mò thông báo lỗi một lúc cũng coi như không phí thời gian, biết thêm vụ `parseInt()` có thể chuyển đổi sang cơ số khác chứ không chỉ là cơ số 10. 

### Tham khảo

- [ESLint - Require Radix Parameter (radix)](https://github.com/eslint/eslint/blob/master/docs/rules/radix.md)
- [ESlint - Docs](https://eslint.org/docs/rules/radix)
- [ECMAScript® 2015](https://www.ecma-international.org/ecma-262/6.0/#sec-parseint-string-radix)
- [Stackoverflow - JSLint says “missing radix parameter”; what should I do?](https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter-what-should-i-do)
- [Mozilla MDN web docs - parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)


