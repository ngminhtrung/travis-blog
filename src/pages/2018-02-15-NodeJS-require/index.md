---
title: 'Nodesjs - Require chưa bao giờ hết thắc mắc'
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

### Tham khảo:
- [Kipalog - Lê Minh Tuấn: NodeJS - require, exports, module.exports](https://kipalog.com/posts/NodeJS---require--exports--module-exports)
- [edX - Microsoft: DEV283x: Introduction to Node.js](https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+2T2017/course/)
- [Requiring modules in Node.js: Everything you need to know](https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8)

### `Require(something)` có gì?

Tạo 2 file, `index.js` và `hello.js` trong cùng 1 folder, với nội dung như sau:

```js
// hello.js
console.log("Hello Trung!");
```
và
```js
// index.js
const hello = require('./hello');
console.log(module);
```
Chạy  `node index.js`, rồi quan sát kết quả trong terminal:
```
Hello Trung
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/backend/app-echo-server/index.js',
  loaded: false,
  children:
   [ Module {
       id: '/backend/app-echo-server/hello.js',
       exports: {},
       parent: [Circular],
       filename: '/backend/app-echo-server/hello.js',
       loaded: true,
       children: [],
       paths: [Array] } ],
  paths:
   [ '/backend/app-echo-server/node_modules',
     '/backend/node_modules',
     '/node_modules' ] }
```
Có thể thấy là:
- `"Hello Trung"` là kết quả của `const hello = require('./hello')`:
  - Bạn `require` này bản thân cũng là 1 module, nhưng là global object nên ta không phải khai báo `require('require')`. Object này không có gì đặc biệt, nó chỉ đóng vai trò nhận vào tên hoặc đường dẫn của module ta muốn nhúng vào, sau đó trả về object `module.exports`.
  - Bạn `require` này nhúng code của `hello.js` vào `index.js`, nên dòng `console.log("Hello Trung")` trong `hello.js` mới được thực thi. Nhưng không phải nhúng tay bo mà còn được gói lại trong 1 lớp code nữa. Nói sau.
- Bạn `module` cũng là 1 module (module tên "module"), là global object, không cần `require('module')`. 
  - Bạn `module` này giống như 1 ông quản gia **ngầm**, chứa hết các thông tin hầm bà làng về `id`,, `exports`, `parent`, `filename`, `loaded`, `children`, và `path` của các modules liên quan.
  - Cho dù có không gọi `module` qua `console.log()` thế kia, thì nó vẫn tồn tại ngầm phía sau.
  - Với module `index.js`:
    -  `id` bằng `'.'` (folder gốc), trỏ đường dẫn đến module `index.js`
    -  `exports` bằng `{}` (rỗng) -> `index.js` không export gì cả.
    - `children` thể hiện thông tin về module `hello.js`. Tức là Node.js coi module `hello.js` là *con* của module `index.js`. Bên trong module `hello.js` lại chứa 1 loạt các thuộc tính như `id`, `exports`, ... như trên. 
    - `path` chứa rất hiều folder -> không hiểu tại sao lại lắm folder như thế.

### Gọi `module.exports` hiện hình

Bây giờ thay đổi `hello.js` một chút, gọi bạn `module.exports` ra xem:
```js
console.log("Hello Trung");

module.exports = function salute() {
    console.log("Bonjour, Trung!");
};
```
Trong đoạn code trên, ta đã gán hàm `salute()` vào `module.exports`. Lúc này đây, khi gọi lại `node index.js`, mọi thứ xuất ra trong terminal vẫn thế, trừ phần `children`:
``` 
 children:
   [ Module {
       id: '/backend/app-echo-server/hello.js',
       exports: [Function: salute],
       parent: [Circular],
       filename: '/backend/app-echo-server/hello.js',
       loaded: true,
       children: [],
       paths: [Array] } ],
```

À, vậy là `Module.children.exports` của `hello.js` không còn là rỗng `{}` nữa, mà đã thành `[Function: salute]`.

Nghĩa là hàm `salute()` từ `hello.js` đã được nhúng thành công vào `index.js`, ta có thể sử dụng `salute()` trong `index.js` một cách tự nhiên. **Công lớn thuộc về ai**? Chắc là bạn object `module`. Cái này là thứ mà Lê Minh Tuấn trong bài [NodeJS - require, exports, module.exports](https://kipalog.com/posts/NodeJS---require--exports--module-exports) không nhắc đến.

Để làm tình hình phức tạp hơn, có thể:
- `require()` thêm nhiều module khác
- Không chỉ gán hàm vào `module.exports`, mà còn object chẳng hạn

để xem global object `module` nó hiện ra cái gì.

### Điều gì xảy ra đằng sau `require(something)`?

Để "nhúng" được các module phụ vào module chính, Node.js đã thực hiện các bước sau:

| # | Bước      | Phiên âm    | Giải thích  |
|---|---        |---          |---          |
| 1 |**Resolving**  |/rəˈzälviŋ/  | Đi tìm đường dẫn tuyệt đối của file        | 
| 2 |**Loading**    |/ˈləʊdɪŋ/   | Xác định type của file |
| 3 |**Wrapping**   |/ˈræpɪŋ/    | Bọc file lại, cho file 1 private scope. Biến object `require` và `module` thành dạng local. |
| 4 |**Evaluating** |/ɪˈvæljueɪt/| what the VM eventually does with the loaded code (không hiểu) |
| 5 |**Caching**    |/kæʃɪŋ/     | cơ chế caching, để khi require một file nào một lần nữa, thì Node.js sẽ không chạy lại file đó từ đầu.

### Tại sao lại cần bước `resolving` để đi tìm đường dẫn tuyệt đối của file chứa module?

Cần có bước này để **đảm bảo Nodejs tìm và chỉ trỏ đến 1 và chỉ 1 file ứng với 1 module** cho dù người dùng có đặt cái gì vào `something` trong `require(something)` đi chăng nữa. `something` có thể là:
- core module/ package, ví dụ `const filesystem = require('fs')`
- module/package của bên thứ ba, cài bằng npm, ví dụ: `const express = require('express')`
- file JS đơn lẻ tự nghĩ ra, ví dụ: `const server = require('./boot/server.js')`
- file JSON, ví dụ `const databaseConfigs = require('./configs/database.json')`
- thậm chí cả 1 folder `const routes = require('./routes')` (gọi tắt thay vì gọi `'./routes/index.js'`.

Vậy **tìm ở đâu**? ta chỉ nói chung chung là `require(something)` thì **resolving** sẽ tìm ở những folder nào? Nó tìm trong phần `Module.path` ở bên trên kia kìa. Theo thứ tự từ trên xuống dưới. Nếu để ý, bạn Node.js luôn chỉ tìm ở những folder "node_modules".
```
  paths:
   [ '/backend/app-echo-server/node_modules',
     '/backend/node_modules',
     '/node_modules' ] }
```
Điều đó có nghĩa là, nếu trong `index.js`, ta bỏ đường dẫn của `hello.js` đi, nghĩa là để `const hello = require('hello.js');` thay vì `const hello = require('./hello');` thì nó sẽ báo lỗi "Error: Cannot find module 'hello.js'" ngay tắp lự. Đơn giản là vì `Module.path` không chứa thư mục gốc.

Bây giờ, vẫn để `const hello = require('hello.js');` (không cho đường dẫn), rồi tạo folder "node_modules" bên trong thư mục gốc, rồi nhét vào trong đó cũng 1 file `hello.js` với nội dung:
```js
console.log("Tôi là hello.js giả mạo, đặt trong folder con 'node_modules', dưới folder chứa index.js một bậc");
```
gọi `node index.js`, ta sẽ thấy code chạy ngon lành, terminal hiện lên chữ:
```
Tôi là hello.js giả mạo, đặt trong folder con 'node_modules', dưới folder chứa index.js một bậc
```
Waaaa, như vậy đúng là một khi không để đường dẫn đến file module một cách cụ thể, thì bạn Node.js chỉ mò mẫn trong đống `paths` nhà bạn ý thôi.

Lưu ý:
1. Nếu không `require()` đến file, mà đến folder, thì Node.js sẽ gọi file `index.js` chứa trong folder được gọi. 
2. Đôi khi không muốn load file hoặc package, mà chỉ kiểm tra xem file hoặc package đó đã tồn tại (được cài hay chưa), thì có thể chỉ cần dùng `require.resolve(something)` là đủ.
3. Đường dẫn có 2 loại:
  - Tương đối (relative path): 
    - Bắt đầu với `./` --> tính từ folder hiện tại
    - Bắt đầu với `../`--> tính từ folder trên folder hiện tại 1 bậc
  - Tuyệt đối (absolute path):
    - Bắt đầu với `/`

### Về loading

Chưa rõ

### Về wrapping, tại sao lại cần wrapping (đóng gói)?

Chưa hiểu hết. Tính sau

### Về caching, tại sao lại cần caching?

Cũng chưa hiểu. Nhưng là vấn đề quan trọng. Đọc lại sau.