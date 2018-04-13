---
title: 'React - truyền dữ liệu từ component con đến cha thông qua callback'
date: 2018-03-14
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - javascriptissexy
  - const
  - array
---

**Bài toán**: Với 1 React app có tổ chức component như dưới đây, làm sao để mỗi lần có thay đổi ở component `VideoListItem`, thì component `VideoDetail` cũng thay đổi theo.

```
App
|
|
+---SearchBar
|
+---VideoList
|     |
|     +---VideoListItem
|
+---VideoDetail
```

**Giải quyết**: Case này lấy từ tutorial của Stephen Grider, course "Moden React with Redux" trên Udemy. Tác giả không đặt bài toán như trên, mà đi thẳng vào code như sau:

- Bước 1: Từ component `App`, truyền 1 callback function vào component `VideoList` dưới dạng props. Code như sau:

  ```js
  // bên trong component App

  <VideoList onVideoSelect={value => this.setState(value)} />

  <VideoDetail video={this.state.value} />
  ```
  Callback function ở đây chính là đoạn `value => this.setState(value)` (viết dưới dạng hàm mũi tên)

  Chưa dám nói đến vụ callback, chỉ riêng function này (tạm gọi tên là *videoSelect*) có tác dụng nhận vào 1 value (1 object), truyền sang cho hàm `setState()`. Một khi hàm `setState()` được gọi (ở đâu đó), nó sẽ thay đổi state của `App`, mà state này liên quan đến `VideoDetail`, khiến cho React render lại `VideoDetail`. 

- Bước 2: Từ component `VideoList`, truyền tiếp function *videoSelect* kia cho `VideoListItem`, cũng dưới dạng props. 

  ```js
  // bên trong VideoList

  <VideoListItem
    onVideoSelect = {props.onVideoSelect}
  />
  ```

- Bước 3: Bên trong component `VideoListItem`,  tạm lấy ví dụ là truyền function kia vào event handler `onClick` của 1 element `<li>` nào đó:

  ```js
  // bên trong VideoListItem

  <li onClick={() => onVideoSelect(value)}>
  // ...
  </li>
  ```

  Mỗi khi bạn `<li>` này bị click, thì function *videoSelect* sẽ được gọi. Event handler `onClick` của `<li>` sẽ truyền value cho *videoSelect*. Vậy là function đã có đủ mọi thứ để thực thi, và nó sẽ chạy đúng với mục đích ban đầu đặt ra ở bước 1. 

**Nhận xét**: Function *videoSelect* đã du lịch qua 2 cấp, từ App -> VideoList, rồi VideoList -> VideoListItem. Đến tận *VideoListItem* nó mới được truyền tham số để chạy, đáng nhẽ nó phải chạy trong không gian của *VideoListItem*, vậy mà dường như nó chạy trong không gian của *App*, kích động phản ứng ở trong *App*.



