---
id: 132
title: 'D3.js - Interpolate là gì'
date: 2018-01-29
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

Trong toán học tồn tại 1 khái niệm tên là "*nội suy (interpolation)*", và trong D3.js cũng vậy. Nội suy là gì? Để giải thích nhanh cho .... vợ thì nói thế này: 
> \- nếu anh đi ngoài đường nhìn thấy 1 cô gái, thì dù cô ý mặc kín cổng cao tường, anh vẫn có thể suy đoán ra nội ...y cô ý kích thước bao nhiêu (cup size) dựa trên các thông số hình dáng bên ngoài. 

Đây là một dạng nội suy. Dựa vào những yếu tố nhìn thấy bên ngoài để suy luận ra một quy luật nào đó, từ đấy phán đoán những thứ ẩn bên trong. Còn trong toán học, nội suy là phương pháp ước tính giá trị của các diểm dữ liệu chưa biết trong phạm vi một tập hợp rời rạc chứa một số điểm dữ liệu đã biết. 

Với D3.js, khái niệm nội suy tổng quát trên của toán học được áp dụng cho:
- số (numbers)
- màu sắc (colors)
- chuỗi (strings)
- mảng (arrays)
- objects
- và bất kỳ thứ gì nghĩ ra được thêm.

Module này D3.js có tên là `d3-interpolate`. Ví dụ với việc nội suy cho số, công thức áp dụng như sau: 
```js
var i = d3.interpolateNumber(a, b);
```
trong đó:
- *i*  là giá trị trả về của hàm `interpolateNumber`, được gọi là *interpolator*. Giá trị này không phải là số, mà lại là 1 hàm, với tham số truyền vào là *t*. Tạm gọi hàm trả về này là *i(t)*.
- *a* và *b* được gọi là 2 giá trị khởi đầu và kết thúc. 
- Tham số *t* chạy trong khoảng [0,1], với:
  - `i(0) = a`
  - `i(1) = b`

Trong trường hợp `a = 10`, `b = 20`, ta có kết quả sau:
```js
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

### Nội suy các khung hình trong D3.js

Một nhu cầu phổ biến trong D3.js là làm interaction với `SVG`, phóng to thu nhỏ các vùng trong `SVG`, đây là chỗ cần sử dụng cả `d3-transition` lẫn `d3-interpolate`. 
- `d3-transition` giúp thực hiện việc chuyển đổi mượt mà từ "*khung hình bắt đầu*" (keyframe "start") đến "*khung hình kết thúc*" (keyframe "end"). Hai khung hình này là quan trọng nhất, do người dùng truyền vào, thể hiện họ muốn việc chuyển đổi sẽ diễn ra từ đâu đến đâu. 
- `d3-transition` không giúp tính những khung hình trung gian giữa 2 khung hình, mà người dùng cũng khó có thể tự tính. Lúc này, họ cần sự trợ giúp của `d3-interpolate`. 
- Những khung hình trung gian, từ chuyên môn gọn là "*inbetweens*" hoặc "*tweens*".
- `d3-interpolate` sẽ giúp tính toán (nội suy) các khung hình trung gian giựa trên 2 khung hình chính bên trên. 
- Trong trường hợp cụ thể này (nội sung khung hình), ta dùng trực tiếp `d3.interpolateZoom` là 1 hàm trong module `d3-interpolate`
- Hàm `d3.interpolateZoom` có dạng: `d3.interpolateZoom(viewA, viewB)`, trong đó:
  - *view* là một khung hình hình vuông trong mặt phẳng 2 chiều. Mỗi *view* được biểu diễn bởi 1 array chứa 3 số: cx, cy và width. 
    - cx và cy là tọa độ tâm của view; 
    - width là độ rộng của view.
  - _view**A**_ là khung hình *bắt đầu*
  - _view**B**_ là khung hình *kết thúc*
- Hàm `d3.interpolateZoom(viewA, viewB)` sẽ trả về 1 hàm khác (tên là *interpolator*), viết là *i(t)*. 
- Bằng cách cho *t* chạy trong khoảng [0, 1], hàm *i(t)* sẽ tạo ra các khung hình từ viewA đến viewB, số lượng views tạo ra đủ mượt để người dùng có cảm giác đây là một chuyển động liên tục. Con số views/giây sẽ cần tra lại. 

### Kết luận
- Chưa có kết luận.
