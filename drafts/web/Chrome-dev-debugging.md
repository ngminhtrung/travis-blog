---
id: 103
title: 'Title'
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

### Dừng thực thi code tại từng điểm với "breakpoint". 

Một phương pháp rất hay dùng khi debug, đó là chèn `console.log()` vào rất nhiều vị trí trong code để xem khi chương trình được thực thi, giá trị cần quan tâm tại vị trí của `console.log()` là bao nhiêu. Ví dụ : 
```js
function updateLabel() {
  var addend1 = getNumber1();
  console.log('addend1:', addend1);
  var addend2 = getNumber2();
  console.log('addend2:', addend2);
  var sum = addend1 + addend2;
  console.log('sum:', sum);
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}
```
Cách dùng `console.log()` vẫn sẽ giúp ta xong việc, nhưng breakpoint lại giúp việc kiểm tra bug này nhanh hơn. Breakpoint sẽ giúp chương trình dừng lại ở đâu đó, để kiểm tra mọi giá trị tại thời điểm đấy. Lợi thế của dùng "breakpoint" là:

| Dùng `console.log()`  | Dùng breakpoint |
|---                    |---              |
|Phải mở mã nguồn lên, tìm đến đoạn code cần kiểm tra, chèn `console.log()` vào, rồi tải lại trang xem phần dev tool in giá trị gì ra. | Dừng chương trình tại đoạn code cần kiểm tra mà không cần biết cấu trúc code như thế nào |
| Chỉ rõ chính xác những biến nào muốn theo dõi giá trị | Hiện giá trị của toàn bộ các variable tại thời điểm chạy chương trình đến đoạn code mong muốn. Đôi khi có những variable khác ảnh hưởng đến code của bạn mà không nhận ra trước đó. |

Nói chung, dùng "breakpoint" sẽ giúp **tìm và diệt** bug nhanh hơn so với dùng `console.log()`. 