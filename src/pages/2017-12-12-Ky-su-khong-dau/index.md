---
id: 115
title: 'Những "hiệp sĩ không đầu" trong lập trình'
date: 2017-12-12
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - headless
  - testing
  - automated
---

Thỉnh thoảng lướt bản tin [JavaScript Weekly](http://javascriptweekly.com), tôi lại thấy có những thuật ngữ khá lạ như _headless browswer_, rồi _headless mode_ cho _Chrome_, _Firefox_, v.v. Cái gì mà "trình duyệt _không đầu_"? Nhìn là liên tưởng đến nhân vật [Nick không đầu](http://harrypotter.wikia.com/wiki/Nicholas_de_Mimsy-Porpington) trong Harry Potter. Do thấy nó vừa lạ vừa không liên quan, tôi cố tránh đụng vào nó khi chưa cần thiết. Nhưng đến giờ khi đụng vào viết test cho thư viện JavaScript đang làm, nhìn cấu hình cho Karma thì cái từ khóa hài hước kia lại xuất hiện. Vậy đành làm một vài phép google nhanh để hiểu thế nào là "không đầu", nó dùng vào việc gì? Những gì phức tạp hơn sẽ dành cho 1 bài viết khác. 

![alt text][nick]{: .center-image }

## Headless browswer là gì?
---

Một **"Headless** [hed-lis] **browser"** là khi trình duyệt hoạt động không có giao diện người dùng (GUI - _graphical user interface_). Headless browsers cung cấp công cụ để lập trình viên có thể thao tác với trang web thông qua dòng lệnh hoặc điều khiển từ xa qua mạng. 

Tham khảo tại [đây](https://en.wikipedia.org/wiki/Headless_browser).

## Dùng Headless browswer vào việc gì?
---

- Tự động hóa việc test cho các ứng dụng web
- Chụp màn hình của trang web
- Chạy các test tự động cho các thư viện JavaScript
- Duyệt web để thu thập dữ liệu
- Tự động hóa quá trình tương tác với web
- Chạy trình duyệt trên server

## Có thể dùng headless browswer cho mục đích xấu nào?
---

- Tiến hành tấn công website bằng phương thức DDOS
- Làm tăng lượng truy cập ảo để nâng điểm quảng cáo
- Chạy web cho các mục đích đáng ngờ, ví dụ "_credential stuffing_"

Ghi chú: _Credential stuffing_ là một dạng tấn công mạng để ăn cắp quyền truy cập website của một thành viên của website đấy. Việc tấn công thực hiện qua việc gửi một lượng lớn các yêu cầu truy cập đến trang web. 

## Có phải tất cả các trình duyệt chạy ở bất kỳ hệ điều nào cũng có chế độ headless?
---

Không! Internet Explorer và Microsoft Edge không hỗ trợ. Và chế độ này còn tùy thuộc vào hệ điều hành của người dùng. Dưới đây là danh sách các trình duyệt cung cấp chế độ headless (hỗ trợ một phần hoặc 100%):
1. [_**Google Chrome**_](https://developers.google.com/web/updates/2017/04/headless-chrome) -> từ version 59 cho Linux và macOS. 
2. [_**Firefox**_](https://developer.mozilla.org/en-US/Firefox/Headless_mode) --> từ version 56 cho cả Linux, Windows và macOS.
3. [_**PhantomJS**_](http://phantomjs.org/) - một headless browswer sử dụng engine WebKit cho việc rendering trang web cũng như JavaScriptCore để chạy các kịch bản test.
4. _**HtmlUnit**_ -> một headless browser viết bằng Java, sử dụng engine Rhino. 
5. _**TrifleJS**_ -> một headless Internet Explorer scriptable browser sử dụng engine Trident. 
6. _**Spalsh**_ 

## Ngoài "headless browswer" ra, còn cái gì "headless" khác nữa không?
---

YES!!!. Có "_headless software_" được định nghĩa là những phần mềm có khả năng chạy trên thiết bị không cần giao diện đồ họa người dụng. Những phần mềm này nhận thông số đầu vào và xuất tín hiệu đầu ra thông qua các giao diện như network, cổng serial, thường được cài trên servers hoặc các thiết bị nhúng.

Ngoài ra còn có "_headless computer_" là những thiết bị không dùng màn hình, thậm chí không cả chuột và bàn phím.

Tham khảo tại [đây](https://en.wikipedia.org/wiki/Headless_software) và [đây](https://en.wikipedia.org/wiki/Headless_computer).

## Một vài lệnh cơ bản với Headless Chrome
---

Tham khảo tại [đây](https://developers.google.com/web/updates/2017/04/headless-chrome).

 1. Khởi động Headless Chrome từ cửa sổ lệnh: 
 2. Printing DOM
 3. Tạo file PDF từ trang web
 4. Chụp màn hình
 5. Chạy chế độ REPL (read-eval-print-loop)

## Kết luận & bài viết để tham khảo sau này:
---

1. [Automated testing with Headless Chrome](https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai)
2. [Introduction to Headless Browser Testing](https://blog.logrocket.com/introduction-to-headless-browser-testing-44b82310b27c)
3. [Using headless Chrome as an automated screenshot tool](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a)

[nick]: https://ngminhtrung.github.io/images/PostIMG/2017-12-12-Ky-su-khong-dau/Nearly_Headless_Nick_bust.jpg "Nick không đầu"