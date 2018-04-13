---
id: 127
title: 'CSS pointer-events'
date: 2018-01-23
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - css
  - mouse
  - event
---

Một khi đã dùng SVG với D3.js, khả năng ta gặp thuộc tính CSS `pointer-events` (events có **s**) rất cao. Thuộc tính này tác động đến hành vi của con trỏ chuột trên màn hình. Bài này giới thiệu về một vài chức năng của `pointer-events` để khi gặp có thể hiểu cụ thể nó làm gì.

Thuộc tính `pointer-events` của CSS hạn chế con trỏ chuột khỏi những thao tác:
- click chuột vào bất kỳ đối tượng nào
- không hiển thị icon mặc định (tùy thuộc vào trình duyệt)
- liên quan đến CSS hover
- không cho phép hàm JavaScript click (onlick) chạy

Các giá trị gắn với `pointer-events` là `auto`, `none`, `visiblePainted`, `visibleFill`, `visibleStroke`, `visible`, `painted`, `fill`, `stroke`, `all`. Trừ 2 cái đầu, còn lại các giá trị kia đều chỉ áp dụng cho `svg`. 

Các giá trị hay thấy:
- `auto`: element tương ứng sẽ có hành vi giống như trường hợp `pointer-events` để trống. Nếu element đó là SVG, thì sẽ có hiệu ứng giống như khi để `pointer-events: visiblePainted`
- `none`: element sẽ không chịu tác động bởi các event của chuột, ví dụ như click, hover, thay đổi trạng thái, và những thứ liên quan đến cursor icon. 

Lưu ý:
- Nếu element con nếu được cài đặt `pointer-events` thì nó vẫn có thể có hành vi khác với element cha. 
- Nếu ta thêm *click event listener* vào 1 element, thì nên bỏ đi `pointer-events`, hoặc chuyển sang `pointer-events: auto`. Nếu không *click event listener* sẽ bị bỏ qua, element sẽ tuân theo `pointer-events`.

Tham khảo:
- [David Walsh - CSS pointer-events](https://davidwalsh.name/pointer-events)
- [Moizilla MDN web docs - pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
