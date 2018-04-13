---
id: 115
title: 'Windows hay Linux cho lập trình front-end?'
date: 2017-12-13
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - javascript
  - mint
  - linux
  - macOS
---

Sau 2 tháng dùng Windows lập trình JavaScript, tôi đã quyết định từ bỏ môi trường này để chuyển sang Linux (Mint). Dưới đây note vài điểm để tham khảo & tra cứu sau này.

Đây là ảnh sau khi cài xong `Mint` cùng những công cụ thiết yếu hiện tại:
- Visual Studio Code
- Slack
- Skype
- Chrome
- Node.js

![alt text][mint]{: .center-image }

### Tại sao lại chuyển sang Linux?

- Lúc mới vào ngành lập trình, tôi sử dụng MacOS, đã quen với môi trường cài đặt của hệ Unix. 
- Khi đi làm, sử dụng Windows để lập trình Front-end với JavaScript cảm thấy không quen. Do không máy ảo macOS trong Windows chạy chậm quá, nên tốt nhất là dùng Linux vì môi trường này gần với macOS hơn về mặt lập trình nói chung. 
- Thực sự tôi tin Linux bảo mật hơn Windows. Có thể Windows 10 giờ đã tốt hơn Windows thế hệ trước rất nhiều, nhưng "danh tiếng" mà Windows xưa để lại khiến cho người dùng lúc nào cũng thấy lo ngay ngáy.
- Nhu cầu của tôi với những phần mềm như `Photoshop`, hay `Microsoft Office` giờ rất ít. Nếu cần tôi vẫn có thể dùng `GIMP`, `Google Office`, `Microsoft Office 365` bản free để thay thế. 
- Để phòng trường hợp khẩn cấp, tôi vẫn giữ Windows và cài thêm Linux, chạy song song cả hai. Nhưng Linux vẫn là môi trường làm việc chính.

### Windows có vấn đề gì?

- Sau 1 tháng dùng Windows thì hầu hết các vấn đề đều có thể giải quyết được, nhưng cảm giác không mượt, không sướng như macOS. Cảm giác cá nhân thôi nhé. Sử dụng Linux chỉ mất tầm vài giờ để cài lại toàn bộ environment (vốn dùng trên macOS), trong khi tôi mất mấy ngày để cài trên Windows giờ xong trong hơn 1 giờ (cài `vs code`, `git`, `git pull` các repositories, v.v.).
- Bài viết của anh Trịnh Minh Cường đăng trên Techmaster ([Để lập trình nên sử dụng hệ điều hành nào?](https://techmaster.vn/posts/34486/de-lap-trinh-nen-su-dung-he-dieu-hanh-nao)) càng làm tôi quyết tâm chuyển sang Linux để phục vụ các công việc rộng hơn sau này (như dùng `docker`, học `back-end`, v.v.)

### Thế giới nói gì về lập trình viên front-end chọn hệ điều hành Linux?

- [Is Linux good enough OS for a Front-End web developer or is Windows better?](https://www.quora.com/Is-Linux-good-enough-OS-for-a-Front-End-web-developer-or-is-Windows-better)
- [Which OS is better for web development Mac OS or Linux?](https://www.quora.com/Which-OS-is-better-for-web-development-Mac-OS-or-Linux)
- [Which OS is best for front end web developers?](https://www.quora.com/Which-OS-is-best-for-front-end-web-developers)
- [What percentage of front-end web developers work (i.e. code) on Mac vs. Linux vs. Windows?](https://www.quora.com/What-percentage-of-front-end-web-developers-work-i-e-code-on-Mac-vs-Linux-vs-Windows)
- [What Linux os is good for web development?](https://www.quora.com/What-Linux-os-is-good-for-web-development)
- [Which OS is better, Windows, macOS, or Linux?](https://www.quora.com/Which-OS-is-better-Windows-macOS-or-Linux)
- [Should I use Linux instead of Windows?](https://www.quora.com/Should-I-use-Linux-instead-of-Windows)

### Tại sao lại chọn Mint mà không phải Ubuntu?

Đơn giản vì `Mint` được nhận xét là _dễ dùng với người mới_, _nhẹ hơn Ubuntu_. 

### Cài Mint vào máy như thế nào?

Để cài đặt Linux Mint song song với Windows 10 tôi làm theo hướng dẫn: [How to Install Linux Mint 18 Alongside Windows 10 or 8 in Dual-Boot UEFI Mode](https://www.tecmint.com/install-linux-mint-18-alongside-windows-10-or-8-in-dual-boot-uefi-mode/). Tuy vậy bạn nên kiểm tra mấy vấn đề sau:
- Nếu Windows đang cài các phần mềm mã hóa dữ liệu thì nên tạm thời tắt đi. 
- Nên chuyển `boot` sang chế độ `legacy` thay vì `UEFI`. 
- Nên tắt `boot security` trong quá trình cài đặt rồi chuyển lại sau. 

### Kết luận?

Nói chung là chạy Linux cảm thấy vô cùng gọn nhẹ. Giống như người ăn uống lành mạnh thấy bụng dạ nhẹ nhàng thanh thoát vậy :-). Tôi sẽ còn quay lại cập nhật trải nghiệm của mình với Linux trong bài này. Còn giờ cần tìm 1 công cụ Git có giao diện đồ họa để bổ sung cho Git dòng lệnh. Lựa chọn đầu tiên sẽ là `git kraken`.

[mint]: https://ngminhtrung.github.io/images/PostIMG/2017-12-13-Migrate-to-Mint/Menu_007.png "Mint"
