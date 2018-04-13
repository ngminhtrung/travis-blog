---
id: 131
title: 'Linux - Chụp ảnh màn hình trong chế độ TTY'
date: 2018-01-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - linux
  - fbcat
  - image
  - screenshot
---

How to Take a Screenshot of the Terminal Output in Text Mode (TTY) - Ubuntu/Linux Mint
http://www.upubuntu.com/2013/01/how-to-take-screenshot-of-terminal.html

Nếu viết bài về Linux, chắc chắn có lúc ta muốn chụp lại màn hình dòng lệnh từ chế độ **tty** (chế độ này có thể được gọi ra thông qua tổ hợp phím `Ctrl + Alt + Fi`, trong đó `Fi` là một trong các phím từ `F1` đến `F6`). Vụ chụp màn hình này cũng đơn giản thôi, chủ yếu thông qua công cụ **fbcat** có sẵn từ repo chính thức của Ubuntu. 

### Bước 1: Cài đặt fbcat để chụp ảnh đuôi .ppm

Mở terminal và gõ câu lệnh sau:

```
sudo apt-get install fbcat
```

Và giờ, bên trong chế độ *tty*, để chụp màn hình ta gõ lệnh:

```
sudo fbcat > image.ppm
```

### Bước 2: Cài đặt imagemagick để convert ra đuôi .png

Do **fbcat** chỉ hỗ trợ định dạng **ppm**, để chuyển sang định dạng **png** hoặc **jpg** phổ thông, ta cần cài thêm **ImageMagick** thông qua:

```
sudo apt-get install imagemagick
```

Rồi gõ dòng lệnh sau để convert ảnh:

```
convert image.ppm output.png
```