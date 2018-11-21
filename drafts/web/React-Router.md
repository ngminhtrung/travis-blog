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
  - javascriptissexy
  - this
---


`React Router`: thư viện xử lý "routing" cho React. Khi cần chuyển qua lại giữa các "view" bên trong ứng dụng React, ta sẽ cần một "router" để quản lý các URL. React Router sẽ giúp làm việc đó, giúp cho phần URL và UI luôn được đồng bộ.

**Ghi chú**: 

- Bài viết gốc [React Router v4 Complete Guide](https://www.sitepoint.com/react-router-v4-complete-guide/)
- Ở bài này đang nói về React Router 4.
- Về cách phát âm của 1 số từ (nguồn: [Cambridge Dictionary](https://dictionary.cambridge.org/))

  |Từ         | Anh-Anh     | Anh-Mỹ              |
  |---        |---          |---                  |
  |route      |/ruːt/       |/ruːt/ hoặc /raʊt/   |
  |router     |/ˈruː.tər/   |/ˈraʊ.t̬ɚ/            |
  |routing    | /ˈruːt.ɪŋ/ hoặc /ˈruː.t̬ɪŋ/ hoặc /ˈraʊ.t̬ɪŋ/ | *không thấy ghi* |
  
## Giới thiệu

React là một thư viện thông dụng để tạo các SPA (single-page applications) vốn được render phía client. Một SPA có thể có nhiều view (tức là pages), và không giống như các website có nhiều trang dạng truyền thống, việc chuyển qua lại giữa các view của SPA sẽ không tải lại hoàn toàn trang. Thay vì thế, ta muốn view được render ngay bên trong trang hiện tại. Người dùng cuối, vốn quen với các website có nhiều trang, sẽ mong chờ các điểm sau ở một SPA:
- Mỗi "view" trong ứng dụng sẽ có 1 URL duy nhất, để người dùng có thể lưu lại URL đó và truy cập sau này (ví dụ: www.example.com/products).
- Nút "back" và "forward" trên trình duyệt vẫn hoạt động bình thường
- Những "view con" được tạo dạng "động" từ 1 view "cha" vẫn có URL của riêng nó (ví dụ: www.example.com/products/shoes/101, trong đấy 101 là id của sản phẩm).

**Routing** là quá trình (process) giúp giữ cho URL của trình duyệt đồng bộ với những gì được render trong trang. React Router giúp lập trình viên xử lý routing theo cách khai báo (declaratively). Cách khai báo này giúp kiểm soát luồng dữ liệu trong ứng dụng, bằng cách mô tả route như sau:
```js
<Route path="/about/" component={About}>
```
Ta có thể đặt component `<Route>` ở bất kỳ đâu mà bạn muốn *route* được render. Bởi `<Route>`, `<Link>` và các API khác của React Router đều chỉ là những component, việc làm quen với React Router sẽ khá dễ dàng.

**Ghi chú**: Nhiều người tưởng nhầm là React Router được cung cấp bởi Facebook, nhưng thực ra đây là thư viện của bên thứ ba, vốn được dùng rộng rãi bởi thiết kế tốt và sự đơn giản. Nếu bạn chỉ cần routers cho việc chuyển trang, bạn có thể tự viết code xử lý việc này thay vì dùng React Router. Tuy nhiên, việc hiểu về React Router (dù cơ bản thôi) cũng sẽ giúp bạn hiểu một router sẽ cần những gì.

**Tổng quan**

Phần dưới sẽ bao gồm các mục:

***Cơ bản về React Router***

Đây là một ví dụ đơn giản về React Router:
```js
<Router>
  <Route exact path="/" component={Home} />
  <Route path="/category" component={Category} />
  <Route path="/login" component={Login} />
  <Route path="/products" component={Products} />
</Router>
```

**Router**

Ta cần:
- 01 component "Router"
- một vài component "Route" 

để có thể thiết lập một bộ chuyển view như ví dụ trên. Bởi ta đang xây dựng ứng dụng chạy trên trình duyệt, ta có thể dùng một trang 2 loại Router từ thư viện API của React Router:
1. `<BrowserRouter>`
2. `<HashRouter>`

Sự khác biệt chính giữa 2 loại trên nằm ở "hình dạng" URL mà chúng tạo ra:
```js
// VỚi <BrowserRouter>, URL tạo ra có dạng
http://example.com/about

// Với <HashRouter>, URL tạo ra có dạng
http://example.com/#/about
```

`<BrowserRouter>` phổ biến hơn `<HashRouter>` bởi nó dùng API History của HTML5 để lưu dấu vết lịch sử router. Còn `<HashRouter>`, lại sử dụng phần đã được hash (băm) của URL (`window.location.hash`) để lưu trữ mọi thứ. Nếu muốn hỗ trợ các trình duyệt cũ, ta nên sử dụng `<HashRouter>`.

Ta gói component `<App>` bên trong component `<BrowserRouter>`.

### File index.js

```js
import React from 'react'
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
);
```

**Lưu ý** Mỗi component router chỉ có thể có 1 element con. Element con này có thể là một element HTML, hoặc là 1 component React.

Để React Router có thể hoạt động, ta cần import API tương ứng từ `react-router-dom`. Ở đây ta import `BrowserRouter` vào `index.js`. Ta cũng import component `App` từ `App.js`. `App.js` ở đây đóng vai trò điểm bắt đầu cho các React component khác.

Đoạn code trên sẽ tạo ra 1 instance của history cho toàn bộ các component bên trong App. 

### history

> `history` là tên một thư viện JavaScript cho phép lập trình viên dễ dàng quản lý lịch sử của session bất kỳ khi nào JavaScript chạy. Thư viện "history" này cung cấp một API tối thiểu cho phép bạn:
> - quản lý history track, 
> - chuyển qua lại giữa các trang, 
> - xác nhận việc chuyển trang, và 
> - bảo toàn "state" giữa các session.

Mỗi component router sẽ tạo ra 1 object "history" để lưu dấu vết URL hiện tại (`history.location`), và URL trước đước đó trong 1 stack. Khi URL hiện tại thay đổi, view sẽ được render lại, người dùng cuối sẽ có cảm giác như đang chuyển trang.

Làm cách nào để thay đổi URL hiện tại? Object "history" chứa những method như `history.push()`, và `history.replace()` để xử lý vụ này:
- `history.push()` sẽ được gọi khi người dùng click vào một component `<Link>`.
- `history.replace()` sẽ được gọi khi sử dụng `<Redirect>`.

Các method khác, như `history.goBack()`, và `history.goForward()`, được dùng để chuyển giữa các trang lưu trong history stack bằng cách tiến hoặc lùi một trang.

### Link và Route

Component `<Route>` có vai trò quan trọng nhất trong React router. Nó render UI nếu URL hiện tại trùng khớp với với thuộc tính path của route. Mỗi component `<Route>` có một prop tên là `path`, và nếu giá trị của `path` trùng với URL hiện tại, UI sẽ được render.

Component `<Link>` được dùng để chuyển qua lại giữa các trang. Nó tương đương với [element "a (anchor)" trong HTML](https://www.w3schools.com/html/html_links.asp). Tuy vậy, sử dụng thẻ `<a>` sẽ khiến trình duyệt phải tải lại trang, điều này ta không hề muốn. Ta sẽ sử dụng `<Link>` để chuyển đến một URL nào đó, không cần phải tải lại trang, mà phần view vẫn được render lại.

### Switch

Giúp render component `<Route>` hoặc `<Redirect>` được trả về đầu tiên khi tìm theo path. Thế nhưng **component `<Switch>` này thì khác gì so với một danh sách các component `<Route>`**?

Theo như docs của React Router:
- `<Switch>` hướng đến sự "duy nhất" bởi nó render một route "*exclusively*". "Exclusively" ở đây mang nghĩa "giới hạn".  
- Ngược lại, các `<Route>` có path trùng khớp với URL sẽ render "*inclusively*". "Inclusively" ở đây mang nghĩa "không giới hạn".

Với đoạn code sau:
```js
<Route path="/about" component={About} />
<Route path="/:user" component={User} />
<Route component={NoMatch} />
```

Nếu URL là `/about`, thì cả 3 components `<About>`, `<User>` lẫn `<NoMatch>` đều sẽ được render. Điều này được thiết kế có chủ đích, cho phép ta tạo ra 


