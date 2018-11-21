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

### Authentication là gì, khác gì với Authorization?

Theo từ điển:
> - authentication = the process or action of proving or showing something to be true, genuine, or valid.
>
> - authorization = the action or fact of authorizing or being authorized.

Vậy đại loại:
- *authentication* là quy trình/ quá trình/ hành động để chứng mình:
    - bản Windows XP ta đang dùng là ... "genuine" (được mua bản quyền, không bị can thiệp bởi bên thứ 3)
    - chữ ký của ông giám đốc trên văn bản tăng lương là ... chính chủ.
    - quy định cho ô tô đi qua trạm BOT không cần thu phí là ... hợp lệ. 
- *authorization* là quá trình cho phép, cấp phép ai đó làm cái gì đấy, kiểu như:
  - Bộ phận nhân sự của các công ty không được bán số điện thoại cá nhân của nhân viên khi không được sự cho phép của người lao động. 

Trong tin học, có thể tóm gọn qua bảng sau:
|Authentication       | Authorization     |
|---                  |---                |
|Nhập đúng username & password, chứng tỏ mình đúng là người đã đăng ký, hệ thống cho phép đăng nhập để sử dụng dịch vụ, đây gọi là "authentication"| Dù đăng nhập đúng, nhưng nếu chỉ là thành viên thường, không phải admin, thì chỉ được xem hạn chế một vài mục, đây gọi là "authoriztion" |

Về mặt logic:
- "authentication" phải đi *trước* "authorization". 
- nhưng người ta "thường" kết hợp 2 thứ trên vào làm một, khiến cho người không biết bị nhầm lẫn.

Về mặt dịch thuật, có lẽ:
- "authentication" được dịch là "chứng thực nhận dạng"
- "authorization" được dịch là "phân quyền/ cấp phép".

### Những yếu tố naò giúp xác định "authentication"?

Việc chứng thực nhận dạng xảy ra ở khắp nơi, từ việc chứng minh bạn là chủ tài khoản để rút tiền ở ATM, đến việc bạn là chủ tài khoản email để gửi thư, từ việc bạn là chủ chữ ký để ký hợp đồng triệu đô, đến việc bạn là chủ điện thoại để đăng nhập sử dụng. 

Muốn quá trình "authentication" diễn ra ngon lành, thì cũng giống như 1 thằng cha bán hàng đa cấp chứng minh bản thân để đi lừa tiền người dân vậy. Hắn phải chứng minh:
- những gì hắn BIẾT, ví dụ biết cách làm giàu bằng tiền ảo và giới thiệu để người dân tin.
- những vật chất hắn SỞ HỮU, tức là xe sang, bộ vest xịn giầy bóng mượt mà. 
- những thứ thuộc về CON NGƯỜI hắn, tức là nụ cười khả ái, cái mắt lúng liếng, cái mồm thoăn thoắt, hành vi đĩnh đạng, thể hiện một tầm vóc lớn. 

Ba yếu tố trên, tùy yêu cầu mà dùng một yếu tố, hoặc kết hợp vài cái lại, sẽ giúp tạo ra quá trình "authentication" mạnh mẽ tùy ý.

| # | Yếu tố      | Giải thích  | Ví dụ   |
|---|---          |---          |---      |
| 1 | Kiến thức   | Bạn BIẾT gì?  | Bạn biết mật khẩu, tên đăng nhập, mã PIN, câu hỏi bí mật, thông tin cá nhân ...|
| 2 | Sự sở hữu   | Bạn CÓ gì?    | Bạn có ... chìa khóa, có thẻ ATM, có điện thoại (để nhận mã OTP),... |
| 3 | Đặc điểm sinh học | Bạn TRÔNG như thế nào? | Vân tay, mồng mắt, giọng nói, khuôn mặt, nhịp tim, chữ ký tay, ... |

### Có bao nhiêu loại "authentication" dựa vào các yếu tố trên?

Trong thế giới online thì có 1 cách phân loại dựa vào 3 yếu tố tạo thành "authentication" trên: đó là dựa vào số lượng yếu tố sử dụng:
- Nếu chỉ dùng 1 yếu tố  -> *single-factor* authentication (không biết ví dụ nào để minh họa nữa)
- Nếu dùng 2 yếu tố --> *two-factor* authentication: chính là vụ đăng nhập tài khoản ngân hàng cần cả thẻ ATM (sở hữu) và mã PIN (kiến thức).
- Nếu dùng 3 yếu tố --> *multi-factor* authentication.  

### Trong thế giới web application, còn cách phân loại authentication nào nữa không?

1. Cách cổ điển: Nhập username và password.
2. Cách hiện đại: Mượn mạng xã hội (như Twitter, Facebook) để đăng nhập, gọi là [OAuth](https://oauth.net/) -> Vô cùng tiện, đỡ phải nhớ lằng nhằng. Để biết kỹ về OAuth, tốt nhất là đọc tài liệu của nó, hoặc [Wikipedia](https://en.wikipedia.org/wiki/OAuth#Security). Còn hiện tại, bản thân cứ hiểu nôm na (dù vẫn còn khá xa so với sự thực) về loại authentication sử dụng bên thứ 3 này là:
  - Thay vì phải nhớ 2 username và 2 password để đăng nhập vào dịch vụ A và dịch B, bây giờ ta chỉ cần nhớ username và password của dịch vụ A. 
  - Mỗi lần đăng nhập vào B, ta làm các bước:
    - Quay sang A, xin hắn cái thư đảm bảo rằng ta là chính chủ của 1 account do A cung cấp.
    - Quay sang B, cầm thư đảm bảo của A đưa cho B. 
    - Vậy là B cho ta đăng nhập. 
  - Cái "thư đảm bảo" nói trên có hình thức sao, format kiểu gì, nội dung ra sao, rồi cách thức trao đổi thư từ thế nào thì phải đọc chi tiết OAuth. Nói lung tung bị chửi ngay.

### Còn gì để nói về cách hoạt động của authentication nữa không?

Vẫn chưa hết :-O, vẫn còn 1 thuật ngữ nữa là "cơ chế" (mechanism) của authentication. Trang [này](https://www.pingidentity.com/en/company/blog/2016/02/04/the_top_6_authentication_mechanisms.html) liệt kê 6 cơ chế của authentication, tuy vậy chỉ để tham khảo, vì hình như không có định nghĩa chính thức về vụ này: (1) passwords, (2) hard tokens, (3) soft tokens, (4), biometric authentication, (5) contextual authentication, và (6) device identification. 

Trong [Passport.js](http://www.passportjs.org/), một thư viện JavaScript dùng cho việc authentication trong Node.js và Express.js, "cơ chế" được gọi là "*strategies*" (chiến lược).

### Kết luận
- Authentication dính đến bảo mật, trông đơn giản mà phức tạp và đầy rẫy các từ chuyên môn.
- Cần tìm hiểu về Passport.js để sử dụng thay vì tự viết authentication:
  - Tính năng của Passport.js?
  - Các authentication strategies?
  - Logic flow của nó là gì?
  - Ví dụ mẫu?

### Passport.js là gì?

- Là một middleware của Express.js, phục vụ việc authentication để user có thể đăng nhập theo một cách nào đó. 
- Passport.js rất linh động, nó cho phép sử dụng nhiều cơ chế authentication (hay còn gọi là authentication strategies) tùy theo người dùng, ví dụ:
  - đăng nhập thông qua tài khoản Twitter, Facebook, Google, Microsoft --> cái này chính là **OAuth**.
  - đăng nhập bằng cách kiểm tra username và password trong database --> cái này chính là **[Local Strategy](https://github.com/jaredhanson/passport-local)**.
  - .v.v.

### Passport.js xuất hiện trong những phần nào của ứng dụng web?

1. Gọi module thông qua `require()`, và khởi tạo passport thông qua `passport.initialize()` và `passport.session()`. 
2. Cấu hình passport với ít nhất 1 authentication strategy, cài đặt methods cho `serializeUser` và `deserializeUser`. 
3. Xác định một rotue nào đó sẽ sử dụng dịch vụ `passport.authenticate` cho việc xác thực danh tính của user.

### Luồng công việc của Passport.js sẽ đi như thế nào?

Giả sử lập trình viên yêu cầu người dùng xác thực danh tính tại route `/login`, áp dụng strategy "Local":
1. Khi người dùng nhấn nút "submit", thì trình duyệt sẽ gửi 1 request dạng POST chứa thông tin của người dùng (bao gồm là username và password) đến server ở route `/login`, được middleware `passport.authenticate` tiếp nhận xử lý. 
2. Do lập trình viên đã cấu hình strategy là "Local", Passport sẽ thực hiện hình thức xác thực danh tính thuộc dạng "Local". 
3. Passport sẽ lấy riêng `req.body.username` và `req.body.password`, truyền vào 1 bộ xử lý nào đó (được viết riêng cho Local Strategy).
4. Bộ xử lý này sẽ:
  - gọi dữ liệu ứng với *user* trong database.
  - kiểm tra xem password cho trùng khớp hay không
5. Trường hợp có lỗi (Error) khi tương tác với database, thì `done(err)` sẽ được gọi.
  - Nếu không tìm thấy user hoặc password không khớp, thì gọi `done(null, false)`.
  - Nếu mọi thứ đều ổn, và ta cho phép người dùng được đăng nhập, thì gọi `done(null, user)`.
6. Một khi đã gọi `done()`, thì luồng xử lý sẽ nhảy ngược về `passport.authenticate()`. Tại đây, thông tin về lỗi (error), user, và những thứ bổ sung khác (nếu yêu cầu) sẽ được truyền vào. 
7. Nếu người dùng được phép đăng nhập, middleware sẽ gọi `req.login` (một hàm của passpot đính kèm với request).
8. Khi `req.login` được gọi, thì `passport.serializeUser` sẽ được gọi tiếp theo. Method này:
  - có quyền truy cập vào object chứa thông tin về user.
  - sẽ xác định dữ liệu nào của user cần được lưu trong session.
  - khi thực hiện xong, sẽ đính kèm kết quả vào session thông qua `req.sesion.passport.user`.
9. Kết quả trên cũng được chèn vào request thông qua `req.user`.
10. Khi mọi thứ xong thì chuyển tiếp đến cái gì là tùy thuộc lập trình viên.




