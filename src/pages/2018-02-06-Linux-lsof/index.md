---
title: 'Linux - Tìm và đóng ứng dụng đang chiếm cổng của mình'
date: 2018-02-06
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

Bài toán: Chạy app bị báo cổng 3000 bị chiếm, cần tìm ứng dụng nào đang chiếm cổng 3000 này để đóng nó đi. 

Thực hiện:

Chạy lệnh sau để biết ứng dụng nào đang chiếm cổng 3000

```
lsof -i tcp:3000
```
Ứng dụng này sẽ cố số PID là xXxXx chẳng hạn. Chạy lệnh tiếp theo để ngắt nó đi:
```
kill -9 xXxXx
```

Ghi chú:

### `lsof` là lệnh gì?

`lsof` viết tắt của 2 lệnh:
- **ls**, một lần nữa là viết tắt của **ls**ist.
- **of**, một lần nữa là viết tắt của **o**pen **f**iles.

Đây là lệnh giúp liệt kê thông tin về các files nào đó đang được chạy trong rất nhiều tiến trình khác nhau. Trong thế giới của linux, *mọi thứ đều là files* (pipes, sockets, thư mục, thiết bị, v.v.v). Vì vậy, khi sử dụng **lsof**, ta có thể lấy được thông tin về bất kỳ "files" nào đang được mở (chạy).

### Kết quả chạy `lsof` là gì?

Trông giống như bên dưới đây, tất nhiên là sẽ dài hơn rất nhiều. Dài bao nhiêu phụ thuộc máy ta đang có bao nhiêu tiến trình đang thực thi.
```
COMMAND   PID        USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    16274 ngminhtrung   13u  IPv6 199365      0t0  TCP *:3000 (LISTEN)
```
Các cột hiện ra bao gồm: `COMMAND`, `PID`, `USER`, `FD`, `TYPE`, `DEVICE`, `SIZE/OFF`, `NODE`, `NAME`. Trong các cột này, cột `FD` và `TYPE` cần thêm lưu ý cho các ký hiệu như:
- Với cột `FD` (**F**ile **D**escriptor):
  - `cwd` = thư mục hiện hành (**current working directory)
  - `rtd` = root directory
  - `txt` = program text (code và data)
  - `mem` = memory-mapped file
  - **1u** thực chất là mô tả về file, theo sau nó là u, r, w. **r** là quyền đọc (read), **w** là quyền viết (write), và **u** là quyền đọc và viết. 
- Với cột `TYPE` - loại của files: **DIR** (thư mục), **REG** (file thông thường), **CHR** (file ký tự đặc biệt), **FIFO** (First In First Out). 

### Xem tiến trình chạy trên 1 cổng cụ thể nào đó

```
lsof -i TCP:số_cổng
```

hoặc trên 1 dải các cổng, ví dụ từ 1 đến 1024

```
lsof -i TCP:1-1024
```

### Tham khảo sau này

- [10 cách dùng lệnh `lsof` tronng Linux](https://www.tecmint.com/10-lsof-command-examples-in-linux/)
- [10 ví dụ sử dụng chương trình lệnh `lsof` trên Linux](https://cuongquach.com/linux-huong-dan-su-dung-chuong-trinh-lenh-lsof-tren-linux.html)
