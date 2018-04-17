---
id: 132
title: 'D3.js - Packs of circles to present hierarchical data'
date: 2018-01-29
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

### Nên chọn loại *database* nào? 

- Mỗi ứng dụng cần có 1 *database* để giúp việc lưu dữ liệu vào/ lấy dữ liệu ra hiệu quả. 
- Những ứng dụng sử dụng Express có thể làm việc với nhiều loại *database*.
- Có nhiều hướng tiếp cận cho 4 hoạt động cốt lõi "CRUD" - **C**reate, **R**ead, **U**pdate và **D**elete dữ liệu. 
- Có nhiều loaị *database* để lựa chọn, ví dụ như: PostgresSQL, MySQL, Redis, SQLite, và MongoDB. 
- Việc lựa chọn loại *database* cho dự án nên cân nhắc vào các yếu tố: năng suất, độ khó, hiệu năng, dễ dàng bảo trì, chi phí, hỗ trợ của cộng đồng, v.v.

### Tương tác với *database* ra sao?

- Cách chính để tương tác với *database*:
  - Cách 1: Sử dụng ngôn ngữ truy vấn SQL.
  - Cách 2: Sử dụng một Object Data Model (ODM) hoặc Object Relational Model (ORM). 
    - Một ODM/ ORM biểu diễn dữ liệu của webiste dưới dạng object trong JavaScript, sau đó đối chiếu đến nền database bên dưới. 
    - Một vài ORM gắn với với một database cụ thể nào đó, trong khi một vài ORM khác chỉ là một cầu nối chung. 

#### Ưu nhược điểm của cách 1: sử dụng ngôn ngữ truy vấn:
- Ưu điểm: Sử dụng ngôn ngữ truy vấn SQL đem lại hiệu năng cao nhất.
- Nhược điểm: Phải nhớ cụ thể cú pháp của từng ngôn ngữ. Việc này có thể khiến lập trình viên mệt mỏi khi phải nhớ nhiều cú pháp khác nhau. 

#### Ưu nhược điểm của cách 2: sử dụng ORM:
- Ưu điểm:
  - Sử dụng ODM đem lại lợi thế là lập trình viên có thể tiếp tục nghĩ về *database* như những objects trong JavaScript thay vì sử dụng cú pháp thuần túy viết riêng cho *database*. Điều trên càng đúng khi cùng một lúc phải làm việc với nhiều loại *database*. 
  - ORM còn cung cấp những tính năng để validate và check dữ liệu.
- Nhược điểm:  
  - ODM thường chậm hơn bởi nó phải sử dụng *translation code* để map giữa objects và database. Và *translation code* này thường không tối ưu khi truy vấn database. Điều này lại càng nghiêm trọng khi dùng những ODM hỗ trợ nhiều loại database. 


### Sử dụng Mongoose và MongoDb cho dự án

- MongoDB là database, Mongoose là ODM.
- Mongoose: đóng vai trò như một front-end đối với MongoDB. 
- MongoDB: 
  - là database dạng none-SQL, 
  - mã nguồn mở, 
  - sử dụng cái gọi là *document-oriented data model*. 
  - là "collections" của "documents" ,tương đương với "tables" of "rows" trong database dạng relational. 
- Việc sử dụng 1 database và 1 ODM là cách vô cùng thông dụng trong cộng đồng Nodejs, chủ yếu bởi vì mọi thứ đều giống với cách xử lý JSON, vốn quen thuộc với lập trình viên JavaScript.

### Những bước cụ thể:

1. Thiết kế database model:
  - Cần nghĩ xem sẽ cần lưu dữ liệu nào, mỗi quan hệ giữa các dữ liệu.
  - Cần tách model lớn thành nhiều model nhỏ, mỗi model biểu diễn như 1 JavaScript object.
  - Liệt kê các trường (fields) thông tin cần có trong mỗi model.
  - Vẽ diagram dạng UML để biểu diễn mối quan hệ, và thông tin chứa trong các model con.
2. 
  

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose