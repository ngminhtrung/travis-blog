---
id: 103
title: 'How do Express.js Sessions work?'
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


Khi đụng vào web application, muốn xác thực người dùng với **authentication** & Passport.js, chắc chắn phải hiểu thêm về **session**. Vậy:
- Session là gì?
- Làm thế nào mà session lưu data?

### Session là gì?

Hiểu đơn giản thế này, giả sử bạn vào một khu du lịch rất rộng có rất nhiều cổng, mỗi cổng có một cửa soát 2 thứ: (1) Chứng minh nhân dân, (2) Vé (có in hình, tên tuổi, ngày sinh) của bạn. Nếu mỗi lần đi qua 1 cổng đều phải trình 2 thứ này ra thì nhiêu khê mất thời gian quá. Thế nên ban quản lý khu du lịch sẽ làm một cách nào đó để lưu thông tin cá nhân của bạn sau lần trình giấy tờ lần đầu tiên, sau đó nếu bạn đi loanh quanh trong ngày qua các cổng kia thì cứ tự nhiên mà qua thôi, không bị hỏi han gì nữa. Cái này gần gần với "session", là một nơi lưu dữ liệu cá nhân của bạn, để bạn có thể truy cập vào các mục khác nhau (ứng với các đường dẫn khác nhau) của một trang web mà không phải đăng nhập đi đăng nhập lại với cùng 1 username và password.

### Cách set-up một session trong Express?

```js
var express = require('express');
var session = require('express-session');

var app = express();
app.use(session());
```

Phức tạp hơn, có thể set-up session tại "cổng" nào đó, ứng với route `'/'`, lưu một vào thông tin tại đây:
```js
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

// Access the session as req.session
app.get('/', function(req, res, next) {
  var sessData = req.session;
  sessData.someAttribute = "foo";
  res.send('Returning with some text');
});
```

để rồi khi đến "cổng" khác, ứng với route `'/bar'` chẳng hạn, ta có thể lôi thông tin của session ra:
```js
app.get('/bar', function(req, res, next) {
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`);
});
```

Lưu ý rằng việc lưu thông tin vào *session* có thể thực hiện bằng nhiều cách khác nhau. Dưới đây là 4 cách thông dụng:
1. Lưu vào bộ nhớ của ứng dụng (application memory)
2. Lưu vào cookie
3. Lưu vào bộ nhớ đệp (memory cache)
4. Lưu vào database

### Các cách lưu dữ liệu session:

1. **Cách 1: Lưu dữ liệu session vào bộ nhớ ứng dụng**: 

    *Bộ nhớ ứng dụng* là bộ nhớ nào? Vẫn chưa trả lời được. Google không ra. Không chắc chắn đây là RAM (của server) mà mỗi tiến trình Node.js chiếm khi chạy.

    Theo hướng dẫn thì người ta không khuyến cáo sử dụng cách này, hoặc chỉ sử dụng lúc phát triển sản phẩm thôi. Vì sao? Vì nó phụ thuộc vào server, server mà bị treo, hoặc khởi động lại, thì dữ liệu trong session cũng biến mất. 

2. **Cách 2: Lưu dữ liệu session trong cookies:**

    Cookie là gì? là một file bé xíu được gửi qua lại giữa web server và trình duyệt:
    - file này lưu thông in về phiên đăng nhập của người dùng. 
    - khi người dùng đăng nhập, server tạo ra file cookie này, gửi đến trình duyệt, lưu file cookie trên máy người dùng, đặt thời hạn sử dụng (ví dụ 5 phút, 10 phút, ...). Sau thời hạn sử dụng này, thông tin lưu trong cookie không còn giá trị sử dụng. 
    - Sau khi đăng nhập, người dùng lại truy cập vào 1 một mục khác của trang web, thì trình duyệt sẽ gửi 1 request mới đến server. Request này được gửi kèm theo file cookie kia, để server biết người dùng là hợp lệ. 
    - Server có thể thêm bớt chỉnh sửa trong file cookie, sau đó gửi ngược lại cho trình duyệt. 

    Miễn là file cookie còn hạn, thì mỗi lần trình duyệt gửi đi 1 request, nó đều đính kèm file cookie vào đó. 

    Do file cookie có thể chứa dữ liệu quan trọng & bí mật của người dùng (như username, password, số thẻ tín dụng, v.v.) cho nên việc bảo mật cookie cần được lưu ý. Để bảo mật cookie, một phương án là tận dụng `expression-cookie`.

    Nhược điểm của cookie:

    | # | Nhược điểm            |
    |---|---                    |
    | 1 | Chỉ lưu được ít dữ liệu, khoảng 4KB |
    | 2 | Do cookie được gửi kèm theo mỗi request, cho nên nếu lưu nhiều dữ liệu, thì nó sẽ làm chậm tốc độ của webite  |
    | 3 | Nếu hacker biết được cách cookies mã hóa (biết mã bí mật), thì có nguy cơ thông tin trong cookies sẽ bị đọc lén, bao nhiêu thông tin của người dùng bị lộ hết |

3. **Cách 3: Lưu thông tin session trong Memory Cache**:

    Chưa thực sự hiểu. Lưu ý để sau này đọc thêm:
    - Memory Cache là cái gì? Là cache hay là RAM?
    - Cơ chế lưu vào Memory Cache?
    - Redis? Memcached? 

4. **Cách 4: Lưu session vào Database**:

    Được khuyến cáo không nên dùng. Lưu để sau này đọc thêm.

5. **Vậy nên lưu session vào đâu**?

    Theo bài [này](https://nodewebapps.com/2017/06/18/how-do-nodejs-sessions-work/), thứ tự ưu tiên là như sau:
    - cache
    - cookie
    - database

    Tuy vậy cần có trải nghiệm thêm từ kinh nghiệm cá nhân và học hỏi từ người khác trước khi có kết luận. 

### Tạm kết luận:

- Session không đơn giản như nghĩ ban đầu. Còn rất nhiều câu hỏi như:
  - cuối cùng là session được lưu ở đâu? Trong file [README của express-session](https://github.com/expressjs/session/blob/master/README.md) có ghi là: "Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side." Vậy "stored server-side" là stored ở đâu? Database? hay RAM?
  - express-session liên quan gì đến cookie-session? 
  - express-session này liên quan gì đến `localStorage`, `sessionStorage` vẫn hay được nhắc đến khi học HTML?

- Các vấn đề bảo mật cũng nhiều và chi ly. 


### Tham khảo tiếp:

- [Securing Node.js: Managing Sessions in Express.js](https://dzone.com/articles/securing-nodejs-managing-sessions-in-expressjs)
- [All You Ever Wanted to Know About Sessions In Node.js](https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions)