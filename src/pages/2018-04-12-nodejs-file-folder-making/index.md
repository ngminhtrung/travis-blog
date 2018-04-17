---
title: 'Nodejs để duyệt file, đổi tên file, rồi move vào folder mới vừa được tạo'
date: 2018-04-12
author: ngminhtrung
categories:
 - javascript
tags:
 - nodejs
 - front-end
---


### Bài toán: 

Khi chuyển blog từ Jekyll sang Gatsby, cần phải xử lý đống bài viết từ blog cũ:

**Format file bài viết của blog cũ (Jekyll)**: Chỉ duy nhất 01 file.

```
2018-02-22-JavScript-regexp-percentage.md
```

**Format file bài viết trên blog mới (Gatsby)**: File đặt trong 1 folder, folder được đặt theo tên file cũ, file mới đổi thành `index.md`

```
2018-02-22-JavScript-regexp-percentage
	|
    |______index.md
```

Có khoảng 50 bài viết. Không làm tay, làm tự động như thế nào?

### Giải quyết:

Sử dụng các API mục [File System](https://nodejs.org/api/fs.html) của Node.js. Tạo project luôn trong folder chứa các file bài viết `.md` cho tiện.

Thực ra là ta sẽ cần 2 thư viện:
- Thư viện `slugify` để thanh tẩy chuỗi. Xem thư viện này ở [đây](https://www.npmjs.com/package/slugify)
- Thư viện `fs-extra` để xử lý vụ copy file. Cái này `fs` cũng làm được, nhưng khi đọc trên Stackoverflow thì có người bị báo lỗi, và gợi ý dùng thư viện này.

Các bước cũng đơn giản:
- Bước 1: Dùng `fs.readdir` để đọc các file trong folder chỉ định.
- Bước 2: Chạy vòng lặp cho từng file, loại bớt ký tự đặc biệt, xóa bỏ đuôi `.md` để tạo tên folder.
- Bước 3: Copy file và đồng thời đổi tên file vào folder mới. Tên file là `index.md`, tên folder đã được gán ở bước 2. Lệnh `fs.copy` này đơn giản chỉ cần 2 thông số truyền vào: Nguồn (file hiện tại), và Đích (`./${folderName}/index.md`). Do folder đích chưa tồn tại, nên lệnh `fs.copy()` tạo luôn folder mới. Một công đôi việc.

```js
const slugify = require('slugify'); //  thư viện để thanh tẩy chuỗi, loại bỏ những ký tự đặc biệt
const fs = require('fs-extra');
const folder = './'; // gán vào folder hiện tại
const arr = [];

fs.readdir(folder, (err, files) => {

    if (err) throw err;

    files.forEach(file => {
        const regexp = /.md$/;
        let cleanedFileName = slugify(file, {remove: /[()]/g});
        const folderName = cleanFileName.replace(regexp, ""); // remove extension ".md"
        fs.copy(file, `./${folderName}/index.md`, err => {
            if (err) return console.log(err);
            console.log("success!")
        })
    })
})
```
### Kết luận

Script trên chạy ngon về tổng thể. Còn nội dung bên trong từng file phải chỉnh sửa tí chút bằng thủ công, chưa làm tự động được. 

### Tham khảo:

- [How do I move files in node.js?](https://stackoverflow.com/questions/8579055/how-do-i-move-files-in-node-js)
- [Fastest way to copy file in node.js](https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js)


ngminhtrung 13-04-2018
