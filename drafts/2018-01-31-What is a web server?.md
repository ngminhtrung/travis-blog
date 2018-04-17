---
id: 132
title: 'What is a web server?'
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

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server

### Web server là gì?

Từ "Web server" là thuật ngữ chỉ cả *phần cứng* lẫn *phần mềm*:

- Đối với "phần cứng", *web server* là:
  - một máy tính lưu:
    - phần mềm chuyên biệt xử lý server, 
    - dữ liệu của trang web (ví dụ file HTML, hình ảnh, CSS, file JavaScript)
  - được kết nối với mạng Internet
  - cho phép trao đổi dữ liệu với các thiết bị khác cũng kết nối với mạng Internet.

- Đối với *phần mềm*, một *web server* là:
  - chương trình kiểm soát cách người dùng truy cập vào các file dữ liệu, ít nhất là đối với các HTTP server. 
  - Một HTTP server là một chương trình có khả năng xử lý các URL (địa chỉ web), và HTTP (giao thức mà trình duyệt của người dùng sử dụng để xem trang web).
  - Người dùng có thể truy cập đến web server thông qua tên miền (domain name, ví dụ mozilla.org) của website mà nó đang lưu, và nhận lại dữ liệu mà mình cần. 

Ở mức cơ bản nhất:
- mỗi khi trình duyệt cần 1 file lưu trên 1 web server, trình duyệt sẽ gửi yêu cầu xin file thông qua 1 HTTP. 
- Khi yêu cầu chứa HTTP này đi đến đúng máy tính chứa web server, thì phần mềm trên webserver (phần xử lý HTTP) sẽ chấp nhận yêu cầu này, tìm dữ liệu tương ứng:
  - Nếu không tìm thấy, trả về thông báo lỗi mã hiệu 404, 
  - Nếu thấy dữ liệu, gửi dữ liệu đó đến trình duyệt cũng thông qua giao thức HTTP. 

### Static vs. Dynamic Webserver là gì?

Để tạo 1 website, ta cần 1 webserver. Webserver này có thể là *tĩnh* (static), hoặc *động* (dynamic):
- Một web server tĩnh: bao gồm một máy tính (phần cứng) và chương trình phần mềm gọi là *HTTP server*.
  - Từ *tĩnh* ở đây nghĩa là khi có yêu cầu, server chỉ gửi nguyên các files mà nó đang chứa đến trình duyệt, không thêm bớt tẩy xóa nội dung. 

- Một web server động: bao gồm những gì web server tĩnh có bên trên, kèm thêm những phần mềm gọi là *application server* và cơ sở dữ liệu (database).
  - Từ *động* ở đây nghĩa là khi có yêu cầu, *application server* sẽ cập nhật (thay đổi) các files mà nó đang chứa trước khi gửi đến  trình duyệt thông qua HTTP server.
  - Ví dụ, để tạo ra trang web hoàn thiện mà ta nhìn thấy trên trình duyệt, *application server* có thể phải điền dữ liệu lấy từ *database* vào một HTML template rỗng. Những trang như MDN hoặc Wikipedia có hàng ngàn trang web, nhưng mỗi trang không phải là một bản HTML đầy đủ mà chỉ là một vài template HTML rỗng với một database không lồ. 
  - Việc tách bạch HTML template và database giúp cho việc cài đặt và bảo trì dễ dàng hơn, nhanh chóng hơn.

### Giao thức HTTP là gì?

Một *web server* phải hỗ trợ giao thức HTTP (viết tắt của Hypertext Transfer Protocol). Giao thức này quy định cách mà để truyền hypertext (tức là dữ liệu của trang web) giữa 2 máy tính (1 là máy web server, 2 là máy tính người dùng, hoặc 1 máy tính trung gian nào đó).

*Giao thức* là gì? là một tập các quy định khi 2 máy tính liên lạc với nhau. *HTTP* là 1 loại giao thức:
 - thông qua text 
 - không lưu trạng thái.

*Thông qua text* là gì?
- là mọi liên lạc đều là text đơn thuần, con người cũng có thể đọc được. 

*Không lưu trạng thái* là gì?
- nghĩa là bản thân mỗi liên lạc chỉ chứa thông tin của chính lần liên lạc đấy, không bao gồm thông tin của những lần trước.
- nghĩa là nếu chỉ dựa vào những gì ghi trong thông tin giao tiếp lần thứ *i*, thì cả server lẫn máy khách đều không thể biết là lần thứ *i-1* chứa nội dung gì. Mọi thứ đều chỉ là hiện thời, không liên quan đến quá khứ. 
- Muốn truy vấn ngược về quá khứ, application server phải chạy thêm 1 chương trình/ chức năng riêng.

Chi tiết sâu hơn về HTTP đọc thêm ở [đây](https://developer.mozilla.org/en-US/docs/Web/HTTP). Tạm thời cần lưu ý rằng:
- Chỉ có máy khách mới tạo được HTTP requests, và chỉ gửi được đến server. 
- Server chỉ gửi trả lời đến HTTP request của máy khách. 
- Khi yêu cầu gửi 1 file thông qua HTTP, clients phải đưa ra được URL của file. 
- Web server phải trả lời mọi HTTP request. Kể cả 1 thông báo lỗi cũng được tính là 1 câu trả lời. 

Trên 1 web server:
- chương trình *HTTP server* chịu trách nhiệm xử lý và trả lời những requests gửi đến.
- Một khi nhận được request, HTTP server sẽ:
  - kiểm tra nếu URL trong yêu cầu có tương ứng với dữ liệu sẵn có không.
  - Nếu dữ liệu có sẵn, web server gửi dữ liệu đó đi.
  - Nếu chưa có sẵn, *application server* sẽ tạo ra dữ liệu để trả lời trình duyệt.
  - Nếu chẳng trường hợp nào ở trên thực hiện được, web server sẽ trả về thông báo lỗi "404 Not Found".
