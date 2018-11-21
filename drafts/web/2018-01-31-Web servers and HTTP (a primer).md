---
id: 132
title: 'Web servers and HTTP (a primer)'
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

https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview

Mỗi request bao gồm:
- một URL để xác định đính đến
- một phương thức (method) giúp xác định bản chất của request (ví dụ request để lấy dữ liệu, xóa dữ liệu, hay cập nhật dữ liệu). Dưới đây là danh sách các methods của HTTP:
  - `GET`: yêu cầu lấy 1 dữ liệu nào đó (ví dụ: một file HTML chứa thông tin về một sản phẩm, hoặc một danh sách các sản phẩm). 
  - `POST`: yêu cầu tạo mới 1 dữ liệu nào đó (ví dụ thêm 1 bài viết mới vào wiki, hoặc một người dùng mới vào database). 
  - `HEAD`: yêu cầu lấy metadata information của một dữ liệu nào đấy mà không lấy về phần body giống như GET. Ví dụ: sử dụng HEAD để tìm xem lần cuối cùng dữ liệu trên được cập nhật từ bao giờ, và nếu thấy có cập nhật thì mới dùng tiếp GET để lôi phần body về (tiết kiệm hơn). 
  - `PUT`: Cập nhật một dữ liệu nào đó (hoặc tạo mới nếu dữ liệu kia chưa tồn tại).
  - `DELETE`: Xóa một dữ liệu nào đó
  - `TRACE`, `OPTIONS`, `CONNECT`, `PATCH`: Những method này không thông dụng, tạm chưa bàn.

- có thể thêm thông tin được mã hóa trong các tham số của URL ,trong POST data (data gửi bởi HTTP phương thức POST), hoặc trong cookies. Ví dụ:
  - Tham số của URL: `GET` sẽ yêu cầu lấy dữ liệu thông qua URL gửi kèm các cặp key - values, ví dụ: muốn tìm thông tin về 1 người có tên là Fred, tuổi 11, thì URL sẽ gửi đi request dạng "http://mysite.com**name=Fred&age=11". Trong đó:
    - Dấu "?" phân tách giữa URL gốc và tham số URL
    - Các cụm key-value giống như `name=Fred`, và `age=11`.
    - Các cụm key-value được phân tách nhau bởi dấu (&)
    - Cách làm này không bảo mật chúng có thể bị thay đổi bởi người dùng. Tức là ông Fred có thể tự gửi đi URL dạng "http://mysite.com**name=Peter&age=21" để lấy thông tin về ông Peter tuổi 21. Chính vì thấy, GET không được dùng cho các request để cập nhật dữ liệu trên server.
  - POST data. Những request dạng POST sẽ yêu cầu thêm dữ liệu mới, dữ liệu do đó được mã hóa trong phần body của request.
  - Client-side cookies. Cookies chứa dữ liệu về session, bao gồm cả keys mà server có thể dùng để xác định xem người dùng có đang đăng nhập hay không, cũng như quyền truy cập vào các tài nguyên nào đó.

Web servers wait for client request messages, process them when they arrive, and reply to the web browser with an HTTP Response message. The response contains an HTTP Response status code indicating whether or not the request succeeded (e.g. "200 OK" for success, "404 Not Found" if the resource cannot be found, "403 Forbidden" if the user isn't authorised to see the resource, etc). The body of a successful response to a GET request would contain the requested resource.

When an HTML page is returned it is rendered by the web browser. As part of processing the browser may discover links to other resources (e.g. an HTML page usually references JavaScript and CSS pages), and will send separate HTTP Requests to download these files.

Both static and dynamic websites (discussed in the following sections) use exactly the same communication protocol/patterns.

### Ví dụ về request/ response dạng GET

#### Request

```
GET https://developer.mozilla.org/en-US/search?q=client+server+overview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _gat=1; _ga=GA1.2.1688886003.1471911953; ffo=true
```
Chú ý:
- Dòng 1 và dòng 2 chứa hầu hết các thông tin ta cần
- Dòng 1: 
  - Phương thức của giao tiếp: GET.
  - Đích đến của URL: /en-US/search.
  - Tham số của URL: q=client%2Bserver%2Boverview&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=webdev
  - Phiên bản của giao thức: HTTP/1.1
- Dòng 2: Website đích: developer.mozilla.org
- Dòng cuối: client-side cookies.
- Ngoài ra, còn có các thông tin khác như:
  - Trình duyệt gửi request: Mozilla Firefox (Mozilla/5.0).
  - Trình duyệt chấp nhận nén định dạng gzip
  - Trình duyệt chấp nhật các chuẩn ký tự của ISO-8859-1,UTF-8;q=0.7,*;q=0.7 và ngôn ngữ như de,en;q=0.7,en-us;q=0.3.


#### Response

```
HTTP/1.1 200 OK
Server: Apache
X-Backend-Server: developer1.webapp.scl3.mozilla.com
Vary: Accept,Cookie, Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:11:31 GMT
Keep-Alive: timeout=5, max=999
Connection: Keep-Alive
X-Frame-Options: DENY
Allow: GET
X-Cache-Info: caching
Content-Length: 41823

<!DOCTYPE html>
<html lang="en-US" dir="ltr" class="redesign no-js"  data-ffo-opensanslight=false data-ffo-opensans=false >
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <script>(function(d) { d.className = d.className.replace(/\bno-js/, ''); })(document.documentElement);</script>
  ...
```

Chú ý:
- Dòng 1: Mã của response, ỏ đây là 200 OK, báo hiệu là request đã được trả về thành công.
- Dòng 5: Response chứa text/html, định dạng ký tự chuẩn UTF-8.
- Dòng cuối: Độ lớn của thong điệp (41823)
- Phần cuối: Nội dung tex/html để trình duyệt hiển thị.

### Ví dụ về request/ response dạng POST

Một HTTP POST được tạo ra khi ta submit một form chứa thông tin cần được lưu trên server.

#### Request

Đoạn text bên dưới minh hoạt cho một HTTP request được tạo ra khi người dùng submit một form chứa thông tin cá nhân trên 1 website nào đó. Nhìn chung, định dạng của request này giống với request dạng GET trình bày bên trên, nhưng dòng thứ 1 ghi rõ đây là dạng POST.

Hơn nữa, cần chú ý là phần tham số của URL đã không còn. Thông tin điền vào form đã được encoded trong phần body của request (ví dụ, phần fullname được đặt là: &user-fullname=Hamish+Willee).

```
POST https://developer.mozilla.org/en-US/profiles/hamishwillee/edit HTTP/1.1
Host: developer.mozilla.org
Connection: keep-alive
Content-Length: 432
Pragma: no-cache
Cache-Control: no-cache
Origin: https://developer.mozilla.org
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: https://developer.mozilla.org/en-US/profiles/hamishwillee/edit
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.8,es;q=0.6
Cookie: sessionid=6ynxs23n521lu21b1t136rhbv7ezngie; _gat=1; csrftoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT; dwf_section_edit=False; dwf_sg_task_completion=False; _ga=GA1.2.1688886003.1471911953; ffo=true

csrfmiddlewaretoken=zIPUJsAZv6pcgCBJSCj1zU6pQZbfMUAT&user-username=hamishwillee&user-fullname=Hamish+Willee&user-title=&user-organization=&user-location=Australia&user-locale=en-US&user-timezone=Australia%2FMelbourne&user-irc_nickname=&user-interests=&user-expertise=&user-twitter_url=&user-stackoverflow_url=&user-linkedin_url=&user-mozillians_url=&user-facebook_url=
```

#### Response

Dưới đây là minh họa của 1 response, trong đó:
- Code trạng thái "302 Found" báo với trình duyệt là request dạng POST đã thành công
- Và răng trình duyệt phải gửi đi một HTTP request thứ hai để tải trang cụ thể ở trường Location. 

Response này gần như giống với response cho request dạng GET.

```
HTTP/1.1 302 FOUND
Server: Apache
X-Backend-Server: developer3.webapp.scl3.mozilla.com
Vary: Cookie
Vary: Accept-Encoding
Content-Type: text/html; charset=utf-8
Date: Wed, 07 Sep 2016 00:38:13 GMT
Location: https://developer.mozilla.org/en-US/profiles/hamishwillee
Keep-Alive: timeout=5, max=1000
Connection: Keep-Alive
X-Frame-Options: DENY
X-Cache-Info: not cacheable; request wasn't a GET or HEAD
Content-Length: 0
```

Note: The HTTP responses and requests shown in these examples were captured using the Fiddler application, but you can get similar information using web sniffers (e.g. Websniffer) or browser extensions like HttpFox. You can try this yourself. Use any of the linked tools, and then navigate through a site and edit profile information to see the different requests and responses. Most modern browsers also have tools that monitor network requests (for example, the Network Monitor tool in Firefox).

## Static sites

Đối với 1 *static site*, khi nhận được yêu cầu từ trình duyệt, web server sẽ sẽ trả về nội dung cố định đã được tạo sẵn. Ví dụ: nếu ta tạo 1 trang nói về sản phẩm thứ 1 tại "/static/myproduct1.html", thì nguyên trang này sẽ được gửi đến tất cả người dùng muốn xem sản phẩm này. Nếu thêm sản phẩm thứ 2, thì đương nhiên sẽ thêm trang thứ 2, ví dụ tại "myproduct2.html", cứ thế tiếp tục với các sản phẩm tiếp theo. Bắt đầu từ đây, cách tiếp cận này trở nên không hiệu quả, bởi câu hỏi đặt ra là sẽ phải làm sao nếu ta có hàng nghìn sản phẩm? chẳng nhẽ phải làm hàng nghìn trang? Với cách lam này, nhiều đoạn code sẽ bị lặp lại ở tất cả các trang, và nếu ta muốn thay đổi một cái gì đó liên quan đến cấu trúc của trang, ta sẽ phải thay đổi toàn bộ một cách thủ công.

Vậy, *static sites* sẽ hữu dụng nếu ta chỉ có một vài trang trong website, và muốn gửi cùng 1 nội dung đến tất cả các khách hàng. Tuy nhiên, một khi số lượng các trang tăng lên, thì chi phí để bảo trì website trở nên quá cao. 

Về cách vận hành:
- Khi người dùng muốn truy cập vào 1 trang web nào đó, trình duyệt sẽ gửi 1 HTTP GET request đến địa chỉ (URL) cụ thể của trang đó.
- Khi server nhận được yêu cầu, nó sẽ trả về 1 HTTP response chứa nội dung của trang kèm một HTTP Response status code là "200 OK" (nghĩa là yêu cầu thành công).
- Server có thể trả về "404 Not Found" trong trường hợp nội dung không tìm thấy, hoặc "301 Moved Permanently" trường hợp nội dung đã từng tồn tại nhưng đã bị di chuyển đi chỗ khác.

Lưu ý:
- Server cho *static site* chỉ cần xử lý request dạng GET, bởi server không hề lưu những dữ liệu nào cần thay đổi. 
- Server cũng không cần phải thay đổi thông điệp trả về dựa trên dữ liệu trong HTTP Request (ví dụ như tham số URL hoặc cookies). 
- Hiểu cách vận hành của static site vẫn hữu ích khi học về lập trình server-side, bởi dynamic sites vẫn xử lý những dữ liệu tĩnh (như CSS, JavaScript, ảnh tĩnh, v.v.) cùng một cách như static site.

## Dynamic sites

*Dynamic site* là trang web có khả năng tạo dữ liệu, và trả dữ liệu cho người dùng dựa trên những yêu cầu cụ thể của URL và dữ liệu trong request gửi đi (thay vì luôn luôn gửi cùng 1 dữ liệu đối với 1 địa chỉ URL nào đó). 

Ví dụ với trang bán hàng nói trên, server sẽ lưu dữ liệu về sản phẩm ở 1 trong 1 database thay vì lưu trực tiếp trong file HTML. Khi server nhận được một HTTP GET Request cho 1 sản phẩm nào đó, server sẽ xem sản phẩm được yêu cầu có ID bao nhiêu, rồi lấy dữ liệu của sản phẩm tương ứng trong database, sau đó tạo ra file HTML bằng việc chèn dữ liệu vào 1 template dạng HTML, rồi gửi file HTML đó cho trình duyệt của người dùng. Đây chính là ưu điểm lớn nhất của dynamic site so với static site:
- Sử dụng database cho phép thông tin về sản phẩm được lưu trữ, dễ dàng mở rộng, thay đổi, tìm kiếm.
- Sử dụng HTML templates cho phép dễ dàng thay đổi cấu trúc của HTML, thay đổi một nơi sẽ áp dụng cho toàn bộ các phần còn lại.

### Giải phẫu một dynamic request

Hãy hình dung 1 huấn luyện viên muốn xem danh sách 11 các cầu thủ tốt nhất trong một đội mang tên "AFC", huấn luyện viên sẽ nhờ vào 1 website chứa dữ liệu của tất cả các cầu thủ của tất cả các đội bóng để lọc ra kết quả. Sau khi huần luyện viên submit một form với tên và số của các cầu thủ, cơ chế vận hành bên trong dynamic site sẽ diễn ra như sau:

1. Trình duyệt tạo 1 HTTP GET request đến server sử dụng địa chỉ URL của dữ liệu cần tìm (`/best`), encode tên gọi của team, số lượng cầu thủ trong tham số của URL (ví dụ: "`/best?team=team_AFC&show=11`"), hoặc là trong URL pattern (ví dụ: "`/best/team_AFC/11/`"). GET request được sử dụng bởi đây chỉ yêu cầu lấy dữ liệu chứ không phải thay đổi dữ liệu.
2. Web Server cho rằng request này là "dynamic", chuyển nó đến Web Application để xử lý (web server quyết định cách xử lý URL dựa trên các pattern của URL quy định trong file cấu hình).
3. Web Application hiểu rằng:
  - mục đích của request là để lấy một đội giỏi nhất dựa trên URL có từ khóa (`/best/`)
  - đội cần tìm kiếm là *team_AFC*
  - số lượng cầu thủ cần tìm là 11

    Tiếp theo, Web Application dựa vào những tính toán nội bộ để đưa ra một danh sách các cầu thủ "giỏi nhất"

4. Web Application tạo ra một file HTML bằng cách chèn dữ liệu của các cầu thủ giỏi nhất (lấy từ Database) vào một template HTML.

5. Web Application gửi về cho trình duyệt trang HTML nói trên, không quên kèm theo một HTTP status code số 200 (nghĩa là "thành công"). Nếu có gì không đúng xảy ra, Web Application sẽ trả về 1 code khác, mang số "404", nghĩa là danh sách đội giỏi nhất kia không tồn tại.

6. Trình duyệt sẽ bắt đầu xử lý file HTML trên để tạo trang web, gủi một request khác để lấy bất kỳ file CSS hoặc JavaScript nào mà file HTML tham chiếu đến.

7. Web Server sẽ tải những file CSS hoặc JavaScript rồi gửi trực tiếp đến trình duyệt (lưu ý, việc tải/ xử lý những yêu cầu kiểu này vẫn dự vào việc web server được cấu hình ra sao).

Thao tác để cập nhật 1 bản ghi trong database sẽ được xử lý riêng, ngoại trừ một điều là HTTP request gửi từ trình duyệt sẽ phải là một POST request. 

### Những nhiệm vụ khác 

Ngoài công việc trên, Web Application còn có thể thực hiện việc:
- gửi email yêu cầu người dùng xác nhận việc đăng ký của họ.
- lưu bản theo dõi (logging)
- các việc khác.


### Không chỉ HTML được trả về

Không chỉ file HTML, mà các dữ liệu sau còn có thể được gửi đi từ server:
- Các định dạng khác của file: như text, PDF, CSV, v.v.
- Các định dạng khác của dữ liệu: như JSON, XML, v.v

Lưu ý: 
- Ý tưởng về việc cập nhật nội dung động theo yêu cầu của người dùng đã có từ lâu với công nghệ AJAX. 
- Gần đây, khái niệm "Single-page apps" đang trở nên thông dụng:
  - Toàn bộ website chỉ là 1 trang HTML đơn được cập nhật tùy vào yêu cầu của người dùng. 
  - Đẩy rất nhiều phần tính toán từ server sang phía trình duyệt của người dùng
  - Khiến cho trang web trông giống như một ứng dụng nguyên bản (native app), chạy vô cùng mượt mà.


## Sử dụng Web framework giúp lập trình server-side nhẹ nhàng hơn
--- 

Các web framework cho server-side giúp việc viết code để xử lý các hoạt động mô tả bên trên dễ dàng hơn. Ưu điểm bao gồm:

1. Giúp làm việc trực tiếp với HTTP requests và responses

    Thay vì phải viết các đoạn code dài lê thê để xử lý các HTTP request và responses, giờ đây chỉ cần sử dụng các cú pháp ngắn gọn trực quan để tương tác.

2. Điều hướng các request đến hàm xử lý tương ứng

    Các tài nguyên của website sẽ tương ứng với các URL khác nhau. Việc dùng web framework sẽ giúp điều hướng các requests đến các hàm xử lý khác nhau dự trên URL và bản chất của request thay vì đặt tất cả trong 1 hàm lớn (đồng nghĩa với khó quản lý, bảo dưỡng về sau).

3. Giúp truy xuất thông tin nhúng trong request dễ dàng

    Mỗi HTTP request có nhiều thông tin được nhúng trong đó. Ví dụ:
    - HTTP GET request yêu cầu lấy files hoặc dữ liệu từ server sẽ chứa thông tin về files/ dữ liệu trong tham số của URL
    - HTTP POST request yêu cầu cập nhật một dữ liệu nào đó sẽ chứa thông tin cần cập nhật dạng "POST data" bên trong body của request. 
    - HTTP request có thể chứa thông tin về phiên bản làm việc hiện tại, hoặc thông tin của người dùng bên trong client-side cookie.

    Làm thế nào để trích xuất các thông tin trên từ request? Web framework giúp chuyển các thông tin trên và các object để lập trình viên gọi các thuộc tính từ đó. Ví dụ, web framework *Django* vứt thông tin kia vào 1 object tên là `HttpRequest`, rồi truyên sang những hàm có chứa methods và thuộc tính đề:
    - truy cập URL đích
    - bản chất của request (ví dụ HTTP GET)
    - tham số GET hoặc POST
    - cookies và dữ liệu phiên làm việc.
    - v.v.

4. Giúp việc truy cập database đơn giản và trực quan hơn

    Websites sử dụng databases để lưu thông tin của người dùng vừa phục vụ nội bộ, vừa để chia sẻ ngược lại với người dùng. Web frameworks thường cung cấp một lớp trung gian để tương tác với database. Lớp trung gian này giúp cho các đoạn code liên quan đến đọc, ghi, truy vấn, và xóa bản ghi đơn giản hơn, dễ hiểu hiểu hơn. Lớp trung gian này được goi là Object-Relational Mapper (ORM).

5. Giúp render dữ liệu

    Web frameworks thường cung cấp một cái gọi là "templating systems", cho phép ta dựng lên cấu trúc của một tài liệu. Tưởng tượng cấu trúc này như những nét phác thảo lớn của một bức tranh, đã được định nghĩa ngay từ đầu. Sau đó, khi người dùng có yêu cầu cụ thể, thì web framwork sẽ giúp điền vào các khoảng trống màu sắc, các chi tiết cụ thể (chính là dữ liệu lấy từ database). Các templates này chủ yếu sử dụng để tạo file HTML, nhưng cũng có thể cho các loại file khác.

## Có nhiều web framework ngoài kia, tiêu chí nào để lựa chọn cái phù hợp?

Một vài các tiêu chế để cân nhắc như:

1. Có dễ học hay không? 

2. Hiệu suất làm việc? Tính bằng thời gian ta có thể viết ra một tính năng mới một khi đã quen thuộc với framework, bao gồm cả thời gian để viết và bảo trì code (bởi ta không thể viết cái mới khi cái cũ đang bị lỗi). Có nhiều yếu tố ảnh hưởng đến phần hiệu suất này, bao gồm:
    - Mục đích ban đầu của framework: Mỗi framework viết ra đều nhắm vào một vài vấn đề cụ thể cho những nền tảng phần cứng/ môi trường cụ thể nào đó. 
    - Một chiều (opinionated) hay đa chiều (unopinionated): Framework dạng một chiều hướng người dùng vào 1 cách nhất định để giải quyết 1 vấn đề nào đó, nó rất hữu ích khi người ta dùng nó vào đúng việc. Framework dạng một chiều không linh động như framework đa chiều, kiểu nhạc nào cũng nhảy. 
    - Là dao Thụy Sĩ hay dao đơn: 
      - Dao Thụy Sĩ? framework loại này chứa mọi thứ, mọi chức năng người dùng cần, và cả không cần. Mọi thứ đều được đi kèm khi cài đặt framework. Ưu điểm: mọi thứ có sẵn, phục vụ tận răng. Nhược điểm của nó là nặng, cồng kềnh vì không phải chức năng nào cũng cần.
      - Dao đơn? framework chỉ cung cấp các chức năng tối thiểu. Người dùng cần thêm gì phải tự đi tìm các thư viện để cài thêm vào. Ưu điểm: Gọn nhẹ. Nhược điểm: cần thứ gì thêm phải đi tìm.
    - Liệu framework có cổ vũ thói quen viết code sáng sủa, khoa học? Ví dụ: những framework thúc đẩy người dùng viết theo kiến trúc Model-View-Controller để tách biệt functions theo logic sẽ giúp cho code dễ dàng bảo trì hơn. 

3. Hiệu năng thực thi: Tốc độ thực thi của framework. Cái này chỉ mang tính tương đối. 

4. Hỗ trợ *Caching*: 

5. Khả năng mở rộng: 

6. Bảo mật: Một vài web frameworks bảo mật hơn những web frameworks khác.
