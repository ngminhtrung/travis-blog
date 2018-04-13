---
title: 'Linux - Curl là gì? một vài bài Kipalog hướng dẫn dùng Curl test API'
date: 2018-02-14
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Trong lúc tìm hiểu về phần server-side programming, lệnh `curl` rất hay gặp, không thể tàng lờ nó mãi được.  Vậy `curl` là gì mà tại sao mọi người dùng nó nhiều thế?

### `curl` là lệnh gì?

Theo manual page của `curl`: 
> curl  is  a tool to transfer data from or to a server, using one of the supported protocols (DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS,  IMAP, IMAPS,  LDAP,  LDAPS,  POP3,  POP3S,  RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET and TFTP). The command is designed to work  without user interaction.

Vậy, `curl` là:
- công cụ giúp transfer dữ liệu:
  - từ server đến đâu đó
  - từ đâu đó đến server
- hỗ trợ rất nhiều giao thức, trong đó có những thứ thông dụng hay nhìn thấy như FTP, FTPS, HTTP, HTTPS, IMAP, SMTP, v.v.
- không có giao diện, chạy trên dòng lệnh. Nhanh gọn.  

### `curl` viết tắt của chữ gì?

của "**C**lient for **URL**s"

Tham khảo: https://curl.haxx.se/docs/faq.html#What_is_cURL

### Cách dùng `curl` như thế nào?

- Gọi `man curl` hoặc `curl --help` trong terminal để biết chi tiết. 

- Ví dụ muốn download 1 trang html ở đâu đó về máy, lưu nó thành 1 tên file mới tên là "testing.html" chẳng hạn:
  ```
  curl url --silent -o testing.html --progress
  ```
  thay *url* bằng 1 đường dẫn đến file html nào đó, "http://www.justpassion.net/tech/programming/bash-shell/lenh-curl-trong-linux-2.html" chẳng hạn. 

  Kiểm tra trong folder mà lệnh `curl` được thực thi sẽ tìm được "*testing.html*" với nội dung của "*lenh-curl-trong-linux-2.html*" nói trên. 

Ngoài ra trên Kipalog có nhiều bài hay. Mấy bài dưới đây trùng với quan tâm hiện tại của mình.

- [Kipalog - Trần Thành - Sử dụng curl giả lập POST request với parameter và file](https://kipalog.com/posts/Su-dung-curl-gia-lap-POST-request-voi-parameter-va-file) --> Đúng thứ đang cần tìm để giả lập request đến localhost.

- [Kipalog - Huy Trần - Dùng Vim làm REST API client](https://kipalog.com/posts/Dung-Vim-lam-REST-API-client) --> Cha nội này thấy curl chỉ dùng cho các request đơn giản, nếu nhiều parameters là phiền phức. Cho nên dùng VIM và 1 plugin của VIM để viết sẵn cấu hình sau đó mới gọi curl. 

- [Kipalog - Lơi Rệ - Tạo một script để stress test web service API](https://kipalog.com/posts/Tao-mot-script-de-stress-test-web-service-API)

- [Kipalog - Aomine Daiki - Kiểm tra url có tồn tại hay không ?](https://kipalog.com/posts/Kiem-tra-url-co-ton-tai-hay-khong-)

- Bonus [Kipalog - quocnguyen - Dùng curl để download, có resume](https://kipalog.com/posts/Dung-curl-de-download--co-resume)

### Ngoài `curl` ra còn có `Wget`

Mục này dài quá. Xem link tham khảo nếu muốn tìm hiểu thêm

### Tham khảo sau này

- [What Is Curl And Why Would You Use It?](https://www.lifewire.com/curl-definition-2184508)
