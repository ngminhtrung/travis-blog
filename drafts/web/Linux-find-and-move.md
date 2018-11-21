---
id: 103
title: 'Title'
date: 2017-09-27
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

Bài toán: Tìm toàn bộ các files đuôi ".JPG" giữa ngày 01.11.2017 và 20.11.2017 trong folder "*hiện tại*" rồi move sang folder khác.

### Tìm các file đuôi ".JPG" trong folder hiện tại?

```js
find . -name "*.JPG"
```
trong đó:
- Ký hiệu `"."` để chỉ folder hiện tại
- `-name "*.JPG"` để chỉ toàn bộ các file có extension là `.JPG`.

### Tìm các file đuôi ".JPG" trong folder hiện tại giữa 2 ngày cho trước

Do không thể so sánh trực tiếp với thời gian, nên ta cần phải so sánh trung gian thông qua 2 files ứng với 2 mốc thời gian ta hướng đến. 

Ví dụ muốn chặn trong khoảng 01.11.2017 và 20.11.2017, thì ta tạo ra 2 files *file00* (có Modify date là 01.11.2017) và *file01* (có Modify date là 30.11.2017) thông qua lệnh:

```js
touch -d '01 Nov 2017 00:01' file00
touch -d '30 Nov 2017 00:01' file01
```

Để kiểm tra xem file00, file01 có thông số *Modify date* đúng như ta cần hay không, sử dụng command `stat`:

```js
stat file00
stat file01
```
sẽ được output tương tự như sau:
```js
  File: 'file01'
  Size: 0         	Blocks: 0          IO Block: 4096   regular empty file
Device: 819h/2073d	Inode: 136361      Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/ngminhtrung)   Gid: ( 1000/ngminhtrung)
Access: 2017-11-30 00:01:00.000000000 +0700
Modify: 2017-11-30 00:01:00.000000000 +0700
Change: 2018-02-21 08:18:00.413734555 +0700
 Birth: -
```

Sau đó tiến hành lọc các file `.JPG` thông qua file00 và file01 như sau:

```js
find . -name "*.JPG" -newer file00 -and -not -newer file01
```
Trong đó:
- `-newer` và `-not -newer` là option của lệnh `find`.

Kết quả đúng như ta mong đợi. 

### Tìm các file đuôi ".JPG" trong folder hiện tại giữa 2 ngày cho trước rồi move các file đó vào 1 folder khác. 

Ví dụ cần move các files kia vào folder mới tên *SIEMREAP* (là folder con nằm trong folder hiện tại), thực hiện lệnh sau (nhờ Google):

```js
find . -name "*.JPG" -newer file00 -and -not -newer file01 -exec mv {} ./SIEMREAP \;
```

Kết quả: KHÔNG RA kết quả. Báo lỗi: 
``` 
mv ' ' not found
```

thử phương án khác:
```js
find . -name "*.JPG" -newer file00 -and -not -newer file01 -print0 | xargs -0 -I {} mv {} ./SIEMREAP
```

nhưng vẫn không ăn thua

### Kết luận

Đợi ngày khác phục thù hoặc có ai qua giúp đỡ chỉ giáo. 


