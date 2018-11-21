---
id: 103
title: 'Title'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - react
  - this
---

## history


Từ "history", và "object `history`" trong phần bên dưới đây là một, liên quan đến package `history`. Package `history` là 1 trong 2 dependencies quan trọng của thư viện React Router, nó cung cấp những cách làm khác nhau để quản lý "session history" trong JavaScript ở rất nhiều môi trường.

*Ghi chú*: 
- `history` ở đây ("có lẽ") khác với object `history` của `Window.history` (xem ở [đây](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)). Thông qua `Window.history`, ta có thể tác động đến "session history" của trình duyệt (danh sách những trang được mở trong mỗi tab hoặc frame, tính vào thời điểm trang web hiện thời đang được chạy).
- Ngoài "browswer history" (số 1), hóa ra còn có "hash history" (số 2), và "memory history" (số 3) mà người ta sẽ cần chọn để phù hợp với yêu cầu. Sau có thể tham khảo thêm bài "[A little bit of history](https://medium.com/@pshrmn/a-little-bit-of-history-f245306f48dd)" của Paul Sherman trên Medium. Cái này quan trọng.

Object `history` thường có những thuộc tính và method sau:

### `length`

- kiểu number
- đây là số entry bên trong history stack (tạm dịch là ngăn xếp history)

### `action`: 

- kiểu string 
- đây là action hiện tại (`PUSH`, `REPLACE`, hoặc `POP`)

### `location`: 
- kiểu object 
- đây là location hiện tại. 

Trong `location` lại có thể có những thuộc tính sau:
  - `pathname`: kiểu string - là path của URL
  - `search`: kiểu string - là URL string đem đi query
  - `hash`: kiểu string - là đoạn URL đã được băm (hashed)
  - `state`: kiểu object - là state gán với location nào đó, được cung cấp cho 1 method nào đấy, ví dụ `push(path, state)` khi location này được tống vào trong stack. Thuộc tính này chỉ áp dụng với "browser history" và "memory history".


### `push(path, [state])`: 
- method, 
- giúp tống 1 entry mới vào history stack.

### `replace(path, [state])`: 
- method, 
- giúp thay thế entry hiện tại trong history stack.

### `go(n)`
- method, 
- giúp dịch con trỏ (pointer) trong history stack đi `n` entry.

### `goBack()`: 
- method, tương đương với `go(-1)`.

### `goForward()`: 
- method, tương đương với `go(1)`.

### `block(prompt)`: 
- method, có tác dụng không cho phép chuyển trang.

## history có thể bị thay đổi

Object `history` có thể bị thay đổi (mutable). Do vậy, người ta khuyến cáo truy cập object `location từ props của component `<Route>`, thay vì từ `history.location`.

## Cần tìm hiểu sau

- Khác biệt giữa "browser history", "hash history", và "memory history"?
- Lúc nào dùng bạn nào?