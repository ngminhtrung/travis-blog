---
title: 'NodeJS - globals in a global'
date: 2018-02-15
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - this
  - nodejs
  - global
  - linux
---

Nếu như khi viết JavaScript, ta gọi object `window` thì nó được coi là ông trùm của mọi object còn lại. Vậy với Node.js thì sao? Node.js không làm việc với object `window`, vậy "ai" mới là biến toàn cục ("global") khi làm với Node.js?

### Triệu hồi object `global` trong Node.js như thế nào?

Đừng đọc sách lằng nhằng, cứ lấy 1 file `app.js` hoặc `index.js` trong 1 module đơn giản nhất của bạn, thêm 1 dòng `console.log(global)` vào cuối, sau đó gọi:
```js
node app.js
// hoặc node index.js
``` 
trong terminal xem nó in ra cái gì là biết ngay thằng `global` hình thù ra sao. Sẽ gần như bên dưới đây, vô cùng trực quan.
```
global
{ console: [Getter],
  global: [Circular],
  process:
   process {
     title: 'node',
     version: 'v9.5.0',
     versions:
      { http_parser: '2.7.0',
        node: '9.5.0',
        v8: '6.2.414.46-node.18',
        uv: '1.19.1',
        zlib: '1.2.11',
        ares: '1.13.0',
        modules: '59',
        nghttp2: '1.29.0',
        napi: '2',
        openssl: '1.0.2n',
        icu: '60.1',
        unicode: '10.0',
        cldr: '32.0',
        tz: '2017c' },
     arch: 'x64',
     platform: 'linux',
     release:
      { name: 'node',
        sourceUrl: 'https://nodejs.org/download/release/v9.5.0/node-v9.5.0.tar.gz',
        headersUrl: 'https://nodejs.org/download/release/v9.5.0/node-v9.5.0-headers.tar.gz' },
     argv:
      [ '/usr/bin/node',
        '/home/ngminhtrung/Working/GitHub/freecodecamp/backend/app-echo-server/index.js' ],
     execArgv: [],
     env:
      { CINNAMON_VERSION: '3.6.7',
        CLUTTER_IM_MODULE: 'ibus',
        DBUS_SESSION_BUS_ADDRESS: 'unix:abstract=/tmp/dbus-PbKcbVgWdG,guid=a3ac93f7f5bc92019fbf5f6d5a83f989',
        DEFAULTS_PATH: '/usr/share/gconf/cinnamon.default.path',
```

### Vậy cụ thể đám con cháu của `global` gồm những ai?

Tra tài liệu của Node.js về object `global` ở [đây](https://nodejs.org/api/all.html#globals_global_objects). Hiện tại danh sách gồm:
- Class:Buffer
- __dirname
- __filename
- clearImmediate(immediateObject)
- clearTimeout(timeoutObject)
- console
- exports
- global
- module
- process
- require()
- setImmediate(callback[,..args])
- setInterval(callback, delay[, ...args])
- setTimeout(callback, delay[, ...args])

Là con cháu, nghĩa là muốn triệu tập từng đứa con/ cháu một, thì cứ `console.log(global.tên_con.tên_cháu.tên_chắt)` ra thôi. 

Tuy vậy, riêng đối với hàng "con", Node.js cho phép ta bỏ qua cụm "global" đi để tránh dài dòng. Tức là gọi `global.process` với `process` là tương  đương. 

Trong tài liệu của Node.js thì không thấy ghi, còn trong khóa học "Microsoft: DEV283x - Introduction to Node.js", họ gọi những đứa con của object `global` là "global**s**".

### Ý nghĩa của từng thằng trên như thế nào?

Tốt nhất vẫn là tham khảo tài liệu chính thức của Node.js. Còn để có cảm nhận đầu tiên, thì cứ tay làm hàm nhai, cứ`console.log` kèm tên của đối tượng cần nghiên cứu rồi quan sát kết quả thôi. 

Ví dụ:

- Với `__dirname` và `__filename, trước đọc code theo tutorial cứ hiểu ậm à ậm ừ, giờ gọi luôn `console.log(__dirname)` và `console.log(__filename)`, nhìn terminal có gì? Nhìn cái hiểu ngay.

  ```js
  //__dirname

  /home/ngminhtrung/Working/GitHub/freecodecamp/backend/app-echo-server

  //__filename

  /home/ngminhtrung/Working/GitHub/freecodecamp/backend/app-echo-server/index.js
  ```

- Với `process`, hoặc là tra tài liệu từng cái để biết tên thuộc tính của `process`, còn không trong những editor như VS Code, tự nó gợi ý mình rồi, nhìn qua là biết có thể gọi những gì. 

### Chú ý đến `global.process` (hay đơn giản là `process`)

Mỗi một chương trình Node.js khi chạy thì được tính là 1 "process" (tiến trình). Để biết tiến trình đó vuông tròn méo mó ra sao, ta gọi object `global.process` trong module đang chạy. Lưu ý:
- gọi module nào biết module đó
- `global.process` khi gọi ở module A (hoặc app A) không cho ta biết về module B (hoặc app B) cũng đang chạy. 

Những thứ thuộc về `process` cần chú ý:
- `env`: biến môi trường
- `argv`: tham số khi truyền vào lệnh `node index.js` ở command line.
- `exit()`: method để kết thúc tiến trình

Thỉnh thoảng gặp hướng dẫn gõ dòng lệnh:
```
NODE_ENV=development node -e "console.log(process.env.NODE_ENV)"
```
thì hiểu rằng lệnh trên có thể tách ra làm 2:
```
// thứ nhất
NODE_ENV=development 
// gán giá trị của thuộc tính NODE_ENV trong `process.env bằng "development"
```

và
```
// thứ hai
node -e "console.log(process.env.NODE_ENV)"
// in giá trị của process.env.NODE_ENV thông qua console.log
```

NODE_ENV đơn giản chỉ là một quy ước của lập trình viên. Giá trị của nó có thể là:
- `development` --> tương ứng với giai đoạn phát triển sản phẩm, code chứa nhiều phần để in ra thông báo lỗi.
- 'production` --> tươn gứng với giai đoạn phát hành sản phẩm, các thông báo lỗi bị ẩn đi 

### Làm sao để biết tất cả những tiến trình của Node.js đang chạy trên máy?

Gõ trong terminal lệnh sau:
```
ps aux | grep 'node'
```
hoặc 
```
ps -aef | grep 'node`
```
trong đó:
- `ps` (chắc là viết tắt của **p**roces**s**) là lệnh in ra các process (tiến trình) đang chạy:
- `ps aux` hoặc `ps -aef` để giúp in các process theo 1 format nào đó
- kết quả trả về sẽ được truyền sang cho `grep 'node'`
- `grep` là lệnh tìm dòng có thông tin trùng (hoặc không trùng với điều kiện cho trước). Ở đây `grep 'node'` là tìm những dòng có chữ 'node`. 
- Đại loại lệnh `ps` trên sẽ giúp liệt kê toàn bộ các process đang chạy, in ra theo một định dạng nào đó, rồi tống kết quả vào bộ lọc `grep`, bộ lọc này sẽ xem tiến trình nào có chữ `node` thì in ra màn hình. 

Khi đã biết ông Node nào đang chạy, có cả số chứng minh thư của ông ý (tức là số PID), thì có thể cho ông ý dừng lại bằng lệnh:
```
kill số_PID_của_tiến_trình_Nodejs
```

### Kết luận:

Khi học, tốt nhất là cứ `console.log()` để tự mình quan sát và trải nghiệm trong các ví dụ đơn giản, kết hợp cùng với tài liệu chứ đừng chỉ đọc. 

### Tham khảo thêm sau này:

- [Nodejs.org - API document - Global objects](https://nodejs.org/api/all.html#globals_global_objects)
- [What does aux mean in `ps aux`?](https://unix.stackexchange.com/questions/106847/what-does-aux-mean-in-ps-aux)
- [What is the meaning of “ps -aef | grep $(pwd)” command?](https://askubuntu.com/questions/376280/what-is-the-meaning-of-ps-aef-grep-pwd-command)
- [List running processes in terminal, filter and kill them, if required](http://tips.tutorialhorizon.com/2015/10/19/list-running-processes-in-terminal-filter-and-kill-them-if-required/)