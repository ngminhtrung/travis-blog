---
title: 'JavaScript - RegExp - Kiểm tra input nhập vào có phải là percentage'
date: 2018-02-22
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
  - regular-expression
  - regexp
  - percentage
---

**Bài toán**: Kiểm tra xem input nhập vào có phải là dạng "percentage" hay không? input này là khách hàng tự nhập toàn bộ vào 1 file JSON, không phải ở submit form.

**Kết quả**: Tìm được 1 regular expression để kiểm tra ở bài [này trên StackOverflow](https://stackoverflow.com/questions/31508009/javascript-check-if-input-is-a-percentage).

```js
if (/^\d+(\.\d+)?%$/.test(string_cần_test)) {
    // pass
} else {
    // fail
}
```
trong đó:
- `.test()` là một method của `RegExp`, nhận vào 1 string, trả về `true` nếu string kia chứa kết quả trùng với regular expression.
- Regular Expression:
  - được bọc trong 2 gạch chéo `/   /`(ngoài cùng và cuối cùng)
  - ký tự `^` ứng với đầu chuỗi
  - ký tự `\d` trùng với các chữ số từ 0 đến 9
  - ký tự `+` ứng với số lần xuất hiện (bằng 1 trở lên) của item đứng ngay trước nó, trong trường hợp này là `\d`.
  - ký tự `$` ứng với "*cuối của string*".
  - ký tự `?` ứng với số lần xuất hiện (bằng 0, hoặc từ 1 trở lên) của item đứng ngay trước nó. Item đứng ngay trước nó trong trường hợp này là toàn bộ cụm `(\.\d+)`
  - Cụm `(\.\d+)` được bao bởi ngoặc kép `(  )`, báo hiệu là phải xử lý nó như là 1 cụm không tách rời các phần tử bên trong:
    - ký tự `\.` ứng với dấu chấm thập phân "`.`"

Nhìn vào sơ đồ có thể thuyết minh rằng, *regular expression* trên sẽ kiểm tra xem string có:
- bắt đầu bằng một hoặc nhiều chữ số hay không
- nối tiếp bằng một dấu chấm, và một hoặc nhiều chữ số hay không. Toàn bộ cụm này có thể có hoặc không. 
- sau đó có kết thúc bằng ký tự `%` hay không

Nếu đúng, trả về `true`, sai trả về `false`.

Thử test RegExp này xem sau:
```js
// khai báo hàm isPercentage
const isPercentage = string => {
    return /^\d+(\.\d+)?%$/.test(string);
    };
```
```js
// kiểm tra một vài trường hợp
isPercentage("50%")
// output: true
isPercentage(".50%")
// output: false
isPercentage("0.50%")
// output: true
isPercentage("5.%")
// output: false
isPercentage("5aa.99%")
// output: false
isPercentage("5.99aa%")
// output: false
isPercentage("5.55")
// output: false
```

Vậy là RegExp trên không kiểm tra được với các trường hợp như `".50%"` và `"5.%"`. 

### Kết luận

Tạm chấp nhận RegExp trên. Nếu muốn chặt chẽ hơn, tìm hiểu thêm tại:
http://regexlib.com/Search.aspx?k=percent