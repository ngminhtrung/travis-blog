---
id: 132
title: 'Introduction to the server side'
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

https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction

Cùng nhìn tổng quan về lập trình *server-side*, trả lời các câu hỏi như:
- Lập trình *server-side* là gì?
- Nó khác gì so với lập trình *client-side*?
- Nó hữu ích ở điểm nào?

Hầu hết những website lớn, phục vụ nhiều khách hàng đều sử dụng server để hiển thị động các dữ liệu khác nhau khi cần, thường lôi dữ liệu được chứa trên server và gửi đến khách hàng.

Có lẽ ưu điểm lớn nhất của lập trình server-side đó là ta có thể may đo nội dung của website phù hợp với từng người dùng:
- Các *dynamic* website có thể hiển thị hoặc highlight nội dung dựa trên sở thích và thói quen của người dùng.
- Website dạng này cũng dễ dàng lưu thông tin về người dùng, ví dụ như lưu thẻ tín dụng để thực hiện các thanh toán online.
- Nó cũng có thể cho phép tương tác với người dùng thông qua các notifications, hoặc cập nhật thông qua email hoặc các kênh liên lạc khác. 
- Tất cả các việc trên giúp giảm khoảng cách đáng kể giữa người dùng và thông tin họ cần tìm trên website.


### Lập trình server-side là gì?

Tất cả các trình duyệt đều giao tiếp với web servers thông qua HyperText Transfer Protocol (HTTP). 

Bất kể khi ta:
- click vào 1 trang web
- submit một form thông tin
- tìm kiếm thứ gì đó

thì đều có 1 HTTP request gửi từ trình duyệt đến server nào đó được xác định. 

Mỗi request bao gồm:
- một URL để xác định đính đến
- một phương thức (method) giúp xác định bản chất của request (ví dụ request để lấy dữ liệu, xóa dữ liệu, hay cập nhật dữ liệu)
- có thể thêm thông tin được mã hóa trong các tham số của URL ,trong POST data (data gửi bởi HTTP phương thức POST), hoặc trong cookies.

Web servers đợi request từ phía client, xử lý các requests khi gặp, rồi gửi phản hồi về trình duyệt với 1 message gọi là HTTP response. Thông điệp phản hồi có chứa:
-  thông tin chỉ thị xem yêu cầu của client có thành không hay không (ví dụ: "HTTP/1.1 200 OK" nghĩa là thành công). 
- dữ liệu mà trình duyệt yêu cầu (trang HTML, hình ảnh, v.v.) để hiển thị trên trình duyệt

### Lập trình server-side có giống với lập trình client-side?
- Lập trình server-side còn gọi là lập trình back-end
- Lập trình client-side còn gọi là lập trình front-end
- Hai loại trên có khác nhau hay không? Có:
  - Khác nhau hoàn toàn về mục đích và mối quan tâm:
    - Client-side: chủ yếu quan tâm đến giao diện và trải nghiệm người dùng. 
    - Server-side: chủ yếu liên quan đếm việc chọn dữ liệu để trả về cho trình duyệt. Có thể làm thêm các việc như validate các dữ liệu được gửi đến, lưu dữ liệu vào, gửi dữ liệu đi khi được yêu cầu.
  - Thường sử dụng các ngôn ngữ lập trình khác nhau (trừ JavaScript, vốn được dùng cho cả lập trình server-side và client-side)
  - Chạy trên những môi trường hệ điều hành khác nhau

### Những gì có thể làm với lập trình server-side?

1. Lưu dữ liệu vào, gửi dữ liệu đi một cách hiệu quả
2. Lựa chọn dữ liệu gửi đi dựa trên thông tin người dùng
3. Kiểm soát quyền tiếp cận thông tin của người dùng.
4. Sử dụng thông tin trong session/state
5. Gửi thông báo, và giao tiếp với người dùng thonong qua email, SMS, instant messaging, video, v.v.
6. Phân tích dữ liệu




