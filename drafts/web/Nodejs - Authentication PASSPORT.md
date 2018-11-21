---
id: 103
title: 'Node.js Streams: Everything you need to know'
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

## AUTHENTICATE

Mỗi request có thể được xác thực nhờ gọi method `passport.authenticate()`, trong đó chỉ rõ cách thức xác thực (strategy) mà ta muốn áp dụng. Ở ví dụ bên dưới, `'local'` chính là tên của 1 loại strategy.
```js
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // Nếu việc xác thực thành công thì hàm này được thực thi.
    // và `req.user` chứa thông tin về người dùng đã được xác thực
    res.redirect('/users/' + req.user.username);
  });
```
Theo mặc định, nếu việc xác thực:
- thất bại, Passport sẽ trả về code `401 Unauthorized`, và không gọi những hàm xử lý route khác. 
- thành công, hàm xử lý tiếp theo sẽ được gọi, giá trị của `req.user` sẽ đại diện cho thông tin của người dùng đã được xác thực.

Lưu ý: Strategy phải được chỉ rõ trước khi sử dụng trong một route.

### Redirects

Sau khi xác thực một request, người dùng sẽ được chuyển tới một trang mới.
```js
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));
```
Trong đoạn code trên, cấu hình mặc định đã bị ghi đè bởi phần điều hướng:
- Nếu xác thực thành công, người dùng sẽ được chuyển đến trang chủ.
- Nếu xác thực thất bại, người dùng sẽ được chuyển đến trang login để thử lại.

### Flash Messages

Flash message thực ra chỉ là thông điệp đính kèm khi điều hướng trang web sau khi quá trình xác thực diễn ra, mục đích là để cung cấp thêm thông tin cho người dùng. 
```js
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
```
Một khi đặt `failureFlash: true` thì Passport hiểu ta muốn xuất một error message với nội dung tạo bởi bộ xác nhận (verify callback), mỗi một strategy sẽ có 1 bộ xác nhận khác nhau. Đây thường là cách làm đúng đắn nhất, bởi bộ xác nhận là nơi hiểu rõ nhất tại sao quá trình xác thực lại thất bại.

Còn nếu không, ta có thể đặt nội dung cụ thể cho flash message.
```js
passport.authenticate('local', { failureFlash: 'Nhập sai tên đăng nhập hoặc mật khẩu.' });
```
Nếu cần tạo một thông điệu khi quá trình xác thực thành công, thì ta có thể sử dụng `successFlash`.
```
passport.authenticate('local', { successFlash: 'Xin chào!' });
```

### Tắt Sessions

Sau khi xác thực thành công, Passport sẽ giữ cho session với thông tin đăng nhập được liên tục. Điều này là chuyện cần làm với đa số các website, bởi sau khi đăng nhập xong thì người dùng cần chuyển sang phần khác của trang web mà không cần đăng nhập lại. Tuy vậy, điều này có thể là không cần thiết trong một vài trường hợp nào đó, ví dụ API server sẽ luôn đòi thông tin xác thực từ phía người dùng cho mỗi request. Trong trường hợp này, session có thể được tắt mà không làm ảnh hưởng đến hoạt động của Passport. Để tắt session, đặt `session: false`.
```js
app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });
```

### Tùy biến hàm Callback

Nếu các lựa chọn có sẵn không đủ để xử lý một request cần xác thực, thì người dùng có thể tùy biến hàm callback tương tự như dưới đây:
```
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
```
Trong ví dụ trên:
- Hàm `authenticate()` được gọi bên trong hàm xử lý route thay vì được dùng như một route middleware. Điều này sẽ giúp cho hàm callback truy cập vào object `req` và `res` thông qua closure.
- Nếu quá trình xác thực thất bại, `user` sẽ bằng `false`. 
- Nếu có vấn đề gì xảy ra, `err` sẽ được tạo.
- Tham số tùy chọn `info` được truyền vào mang theo thông tin chi tiết về quá trình xác thực. Thông tin chi tiết này được cung cấp bởi bộ xác thực (verify callback).
- Hàm callback có thể sử dụng các tham số truyền vào để xử lý kết quả xác thực theo ý muốn.

Lưu ý: Khi sử dụng hàm callback tùy biến, trách nhiệm tạo session sẽ là của bản thân ứng dụng. Do vậy mà ta cần gọi `req.login()`, đồn thời gửi đi 1 `response`.

## CẤU HÌNH CHO PASSPORT

Để Passport chạy được, ta cần phải cấu hình cho 3 mục sau:
1. Strategy
2. Application middleware
3. Session (không bắt buộc)

### Cấu hình cho Strategy

"Strategy" là thuật ngữ mà Passport sử dụng để nói về cách thức xác thực mỗi request. Cách thức xác thực thì có rất nhiều:
- bắt người dùng nhập username và password để đối chiếu thông tin lưu trong database
- sử dụng OAuth
- sử dụng OpenID
- .v.v.

Do vậy, trước khi yêu cầu Passport xác thực một request, ta cần phải chỉ rõ là xác thực theo cách nào, tức là sử dụng strategy nào.

Từng strategy và cấu hình của nó sẽ được truyền vào như là tham số của hàm `use()`. Ví dụ sau là cho "LocalStrategy" (tức là đối chiếu username và password):
```js
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Sai username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Sai password.' });
      }
      return done(null, user);
    });
  }
));
```

### Bộ xác thực (Verify Callback)

Ví dụ trên minh hoạt một khái niệm quan trọng, đó là "verify callback". Mỗi strategy đều yêu cầu verify callback đi kèm với nó. Mục đích của verify callback là để tìm kiếm user (trong database) mà có thông tin trùng khớp với các thông tin để xác thực. .

Khi mà Passport tiến hành xác thực một request, nó phải:
- tiến hành đọc tập thông tin dùng để xác thực chứa trong request
- sau đó gọi "verify callback", truyền vào thông tin kia, trong trường hợp cụ thể này thì thông tin chứa username và password. 
- Nếu thông tin để xác thực là chuẩn, thì verify callback sẽ gọi hàm `done` để cung cấp cho Passport dữ liệu về user vừa được kiểm định.
  ```js
  return done(null, user);
  ```
- Nếu không đúng (ví dụ passowrd sai), `done` sẽ được gọi với `false` thay vì `user`, báo hiệu là quá trình xác thực thất bại.
```js
return done(null, false);
```
Nếu muốn có thêm thông tin về lý do tại sao xác thực thất bại, thì ta có thể truyền vào `message` như sau:
```js
return done(null, false, { message: 'Incorrect password.' });
```
Cuối cùng, nếu quá trình xác thực thất bại không phải vì chuyện sai mật khẩu hay username, mà vì 1 lý do giời ơi đất hỡi nào đó như database không tồn tại, thì `done` sẽ được gọi với `err` theo thông lệ trong lập trình Node.js.
```js
return done(err);
```

Lưu ý: Phải nhớ phân biệt hai trường hợp xác thực thất bại:
- Trường hợp thứ 1 là do người dùng
- Trường hợp thứ 2 được gọi là "server exception", trong đó `err` mang 
giá trị `non-null`. Authentication failures are natural conditions, in which the server is operating normally. Ensure that err remains null, and use the final argument to pass additional details.

By delegating in this manner, the verify callback keeps Passport database agnostic. Applications are free to choose how user information is stored, without any assumptions imposed by the authentication layer.

