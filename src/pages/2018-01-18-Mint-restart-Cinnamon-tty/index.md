---
id: 125
title: 'Mint - Làm sao để restart Cinnamon khi bị treo'
date: 2018-01-18
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - Cinnamon
  - tty
  - restart
  - this
---

Sau một thời gian dùng Mint thì tình trạng máy bị đơ (freezed, không sao làm được gì) xảy ra tương đối thường xuyên. Hồi đầu luống cuống, cứ phải *hard reset* máy bực mình vô cùng và xót máy. Mà chính cái laptop mình đang dùng bị treo thì lấy đâu ra thứ để google cách xử lý? Sau hiểu dần và biết 1 cách êm thấm hơn một chút, đó là "*khởi động lại **Cinnamon***". Nhưng *Cinnamon* là gì, tại sao và làm cách nào để khởi động lại nó, thì xin mời đọc phần ghi chú của tôi dưới đây. 

### *Cinnamon* là gì?

- *Cinnamon* ((/ˈsɪnəmən/, quế) là 1 *desktop environment* cho *X Windows System* được cài mặc định cho hệ điều hành Linux Mint. 

- Vậy *desktop enviroment* là gì? Tiếng Việt dịch là "*môi trường desktop*". Muốn tìm hiểu sâu và chính xác thì có thể tra [Wikipedia](https://en.wikipedia.org/wiki/Desktop_environment), còn mình thì tạm hiểu là đây là:
  - một nhóm các gói phần mềm cung cấp các tính năng liên quan đến giao diện đồ họa (cửa sổ, icon, thanh công cụ, hiệu ứng màn hình, v.v.), 
  - giúp con người cấu hình giao diện làm việc, gián tiếp giao tiếp với máy tính. 

- Thế *X Windows System* là gì? Theo [Wikipedia](https://vi.wikipedia.org/wiki/H%E1%BB%87_th%E1%BB%91ng_X_Window), đây là một hệ thống cửa sổ dùng để hiển thị đồ họa bitmap. Nó cung ứng một bộ các công cụ và giao thức cho phép người dùng xây dựng các giao diện đồ họa (GUI) trong hệ điều hành Unix, tựa Unix, và OpenVMS. X còn được hỗ trợ hầu hết trong các hệ điều hành hiện đại.

**Túm lại**: Cứ hiểu *Cinnamon* là lớp bên ngoài của hệ điều hành, liên quan đến giao diện, giúp người dùng tương tác với phần lõi của hệ điều hành. 

### Tại sao lại phải xử lý *Cinnamon*?

Vì hầu hết các trường hợp máy đơ là do *Cinnamon* bị chết, chứ không phải do Linux Mint. Nếu vẫn truy cập được vào "*tty*" thì có nghĩa là Linux bên trong vẫn hoạt động, chỉ có *Cinnamon* đang trục trặc.

Ơ **tty** là gì thế?
- *tty* là viết tắt và bắt nguồn từ chữ **t**ele**ty**pewriter. Có thể hiểu xa xôi ngày xưa đây là những thiết bị giúp con người giao tiếp với máy tính (bàn phím ngày xưa trông giống với máy gõ chữ). 

- **tty** gần như tương đồng về mặt sử dụng (thậm chí là nghĩa) với **terminal**. 

Túm lại, **tty** là một tầng sâu nữa nằm bên dưới **cinnamon**. Cho nên nếu vẫn còn dùng được **tty** để nói chuyện với máy tính thì tức là *tình hình vẫn chưa quá tệ*.

### Xử lý *Cinnamon* như thế nào?

Hiện thời tôi chỉ tìm được cách duy nhất là *soft restart* (khởi động mềm) lại *Cinnamon*. 

Cách làm?

1. Hãy thử  tổ hợp phím `Alt F2` trước tiên, rồi nhập chữ `r` vào cửa sổ bé xíu hiện ra giữa màn hình. Nhấn `Enter`. Voila!, bạn may mắn rồi, *Cinnamon* vẫn đang sống và có phản hồi lại tổ hợp phím kia. Nó sẽ khởi động lại, máy lại hoạt động ngon nghẻ (tất nhiên là những thứ của phiên làm việc trước ~~sẽ mất~~ vẫn còn).

2. Trong nhiều trường hợp còn lại, *Cinnamon* chết hẳn, và tổ hợp phím kia không hoạt động. Lúc này cần đi đến một tầng sâu hơn, đó là **tty** thông qua tổ hợp phím `Ctrl + Alt` và `F1` đến `F6`. Mỗi một `F` sẽ tương ứng với 1 **tty**. LƯU Ý: Trước khi tí toáy nghịch ngợm, hãy nhớ tổ hợp `Ctrl + Alt + F7` để có thể trở về màn hình đồ họa ban đầu. 

3. Trong **tty** nào đó, cần đăng nhập với *username* và *password* của máy.

4. Gõ `killall -9 cinnamon`, `Enter`. Sau đó quay lại về giao diện đồ họa bằng `Ctrl + Alt + F7`, sẽ có cửa sổ chờ sẵn hỏi có muốn restart Cinnamon hay không. Chọn *Yes*, mọi tiến trình sẽ được đóng lại, màn hình Login sẽ hiện ra. 

### Kết luận

Sẽ còn phải tìm hiểu thêm về *desktop environment* cũng như *X Windows System*, sự khác biệt giữa *console*, *terminal*, *tty* và *sheel*, cũng như những điều mình có thể làm với máy thông qua *tty*. Mục đích chỉ để vận hành chiếc máy của mình trơn tru hơn. 

### Tham khảo
- [How do I restart Cinnamon from the tty?](https://askubuntu.com/questions/143838/how-do-i-restart-cinnamon-from-the-tty)

- [No clear way to restart Cinnamon from a tty](https://github.com/linuxmint/Cinnamon/issues/4763)

- [What is the exact difference between a 'terminal', a 'shell', a 'tty' and a 'console'?](https://unix.stackexchange.com/questions/4126/what-is-the-exact-difference-between-a-terminal-a-shell-a-tty-and-a-con)

- [What does “TTY” stand for?](https://askubuntu.com/questions/481906/what-does-tty-stand-for)
