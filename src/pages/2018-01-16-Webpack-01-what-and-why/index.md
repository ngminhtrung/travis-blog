---
id: 124
title: 'Webpack 01 - Khi nào thì dùng và tại sao?'
date: 2018-01-16
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - webpack
  - dependency-graph
  - browserify
  - grunt
  - gulp
  - bundle
  - configuration
---

**TL;DR** (Dài quá, ứ đọc!): 

1. Webpack nghe thì có vẻ rất đơn giản, đó là trong một dự án lớn, nó giúp đóng gói 1 nhiều file JavaScript vốn được lồng vào nhau như hình cây chằng chịt thành 1 file duy nhất. Nhờ có 1 file duy nhất mà lập trình viên sẽ chỉ cần lo tổ chức thư mục dự án mà không cần phải quan tâm đến viêc gọi từng file JS một lúc triển khai sản phẩm. Trình duyệt thay vì phải tải rất nhiều file JS nhỏ, giờ chỉ cần 1 file duy nhất. Tất nhiên cái hiểu trên của cá nhân tôi mới chỉ hạn chế, bởi Webpack còn làm được nhiều điều hơn thế. Vấn đề là Webpack không đơn giản chút nào, từ cách thức làm việc bên trong cho đến việc cấu hình, cứ nhìn lớt phớt vào file cấu hình của người khác thì mãi không hiểu được bản chất. Vì vậy tôi viết (và dịch lại từ 1 nguồn khác) theo mạch là những câu hỏi - trả lời của bản thân, hy vọng là sẽ sớm hiểu thêm Webpack từ trong ra ngoài.

2. Bài này dựa trên [*Webpack: When To Use And Why*](https://blog.andrewray.me/webpack-when-to-use-and-why/) của Andrew Ray đăng vào tháng 4 năm 2016. Do các công cụ đều cập nhật liên tục, nên có thể có thông tin đã bị cũ. Hơn nữa, phần nói về ưu nhược điểm sẽ mang tính cá nhân cao. Nên tham khảo phần comment bên dưới bài viết của Andrew Ray để biết thêm quan điểm của những người khác.

### Webpack là gì?
---

Chắc chắn là dân front-end dev nhìn thấy cái tên *Webpack* thường xuyên, nhưng chưa đụng vào thì coi như không. Ngắn gọn thì Webpack là công cụ giúp đóng gói toàn bộ phần mã nguồn chương trình cũng như hình ảnh, font, và CSS (toàn bộ những thứ này tiếng Anh gọi là *assets*) thành 1 file (hoặc 1 vài file). Việc đóng gói này không phải đóng gói 1 cách lộn xộn, kiểu như ta quẳng lẫn lộn quần áo, máy tính, sách, dụng cụ vệ sinh cá nhân vào 1 cái vali rồi đóng nắp lại, sau đó muốn tìm cái gì đều phải lục tung cả vali mới thấy. Webpack sẽ sắp xếp sao cho mọi thứ ngăn nắp có cấu trúc giống hệt như khi ta viết code ban đầu, chỉ định cái nào chạy trước cái nào sau, A phải phụ thuộc B, rồi B phụ thuộc C... Tôi thấy Tây có nhắc đến khái niệm *dependency graph*, không biết chính xác đến đâu, bản thân tôi cứ tạm coi từ đó chính là sự ngăn nắp có cấu trúc của các files nói trên.

### Tại sao cần biết về Webpack?
---
Nói một cách thực dụng thì bạn cần biết Webpack bởi mọi người xung quanh đều dùng nó rồi, đụng vào dự án nào cũng đều có Webpack.

Còn thực tế, trừ khi bạn làm dự án nhỏ chỉ có 1 file Javascript (ví dụ *myscript.js*), 1 file CSS ( ví dụ *mystyle.css*) hoặc cùng lắm chèn thêm 1 - 2 thư viện *jQuery*, animation, thì bạn chẳng cần để tâm đến Webpack, đụng vào đau đầu mất thời gian. 

Nhưng nếu bạn làm dự án vừa vừa một chút, trong thư mục dự án có hơn chục files JavaScript, ảnh, font, thì việc dùng Webpack đóng gói, làm gọn lại file mã nguồn sẽ đem lại lợi ích rất lớn. 

### Nhiều file JavaScript với ảnh ọt, font thì ảnh hưởng gì? 
---
Phần này lại liên quan đến cái *dependency graph* nói trên. Còn nhớ hồi đi học, để viết ra được 1 cái chương trình con con dùng JavaScript ES5, đôi khi phải chèn vài ba thư viện nào đó vào trong thẻ `<head>` của file HTML. Giả sử như thế này:

```js
<script src="script.js"></script>
<script src="jquery.min.js"></script>
<script src="d3.v4.min.js"></script>
```
Cách viết này làm chậm trình duyệt bởi nó phải thực hiện nhiều HTTP requests. Để cải tiến, ta có thể gộp các file JS đó lại làm một, làm rối nó (để việc đọc trộm trở nên khó khăn), đặt tên file duy nhất đấy là *bundle.js* chẳng hạn. 

```js
// tập hợp 3 files JS trên vào 1 mảng
// nối lại qua .concat()
// làm rối qua .uglify()
// xuất ra 1 file duy nhất là bundle.js
var scripts = [  
    'script.js',
    'jquery.min.js',
    'd3.v4.min.js'
].concat().uglify().writeTo('bundle.js');

// chèn file bundle.js vào đầu file html
<script src="bundle.js"></script>  
```
Cách làm trên giải quyết hết các vấn đề chưa? CHƯA, vì:
- vẫn phải sắp xếp các files JS trong array đúng thứ tự. Mà có 3 files thì dễ, nhỡ có 30 files mà ngồi sửa thì mệt lắm, lại dễ sai, mới lại chắc gì đã làm được. 
- phải lưu tâm đến việc các files liên lạc với nhau qua *global variables* (biến toàn cục). Rất có thể là file sau sẽ ghi đề lên global variable cùng trùng tên với file trước.

Còn với ES6, hoặc Node.js, ta có thể  chia nhỏ các file JS theo các chức năng nhỏ (module hóa), rồi [`import` (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) hoặc [`require` (Node.js)](https://nodejs.org/api/modules.html#modules_require) các files đó vào 1 file JS tổng quan hơn, rồi cứ thế ghép nối đến file JS chung nhất. 

Ví dụ: 
```js
// file index.js 
require('./moduleA.js');
require('./moduleB.js');

// file moduleA.js
var newDiv = document.createElement("div"); 
var newContent = document.createTextNode("Hi there! I'm module A!"); 
newDiv.appendChild(newContent); 
document.body.appendChild(newDiv);

// file moduleB.js
var newDiv = document.createElement("div"); 
var newContent = document.createTextNode("Hi there! I'm module B!"); 
newDiv.appendChild(newContent); 
document.body.appendChild(newDiv);

```
Vì trình duyệt vẫn chưa hỗ trợ cú pháp *require()*, chúng ta phải sử dụng công cụ để biến những files trên thành một file được đóng gói mà trình duyệt nào cũng chạy được ngon lành. 

Với nhiệm vụ trên, thì không chỉ Webpack, mà các công cụ trước nó như Browserify cũng làm được. Webpack sinh ra để làm gì nữa?

### Vậy Webpack thực sự làm gì?
---
Webpack còn giúp người dùng sử dụng cú pháp `require()` trên cả những asset tĩnh, trên máy local, nghĩ là những file không phải Javascript.

Hãy xem ví dụ này:
```js
<img src={ require('../../assets/logo.png') } />  
```
Hừm, rõ ràng là không thể dụng `require()` cho file ảnh trong JavaScript cơ mà? Hóa ra Webpack giúp người dùng xử lý chỗ này. Khi Webpack duyệt qua toàn bộ mã nguồn của người dùng, nó sẽ dừng lại ở những chỗ gọi `require()`. Tại đây, nó so sánh đường dẫn `../../assets/logo.png` với phần cấu hình của **loader** mà người dùng đã thiết lập. Ví dụ:
```js 
loaders: [  
    { test: /.png$/, loader: "file" }
]
```
Với cấu hình trên, khi mà đường dẫn của `required()` kết thúc với đuôi `.png` (trùng khớp với regurlar expression `/.png$/`) thì Webpack sẽ gửi file đó đến 1 thứ là **file loader**.

*File loader* làm 2 việc:
1. Nó thay thế  cụm `require(...)` dài dài của file gốc thành 1 *string URL* đúng chuẩn của JavaScript. Ngoài đúng chuẩn JS ra, string đó còn phụ thuộc vào cách bạn thiết lập cấu hình cho Webpack. Ví dụ nó có thể trở thành 1 CDN URL kiểu như *cdn.mywebsite.com/logo.png*. 
2. Nó copy file từ folder gốc đến 1 folder mới do bạn chỉ định, vẫn trên máy local, ví dụ thư mục `dist/` (viết tắt của *distribution* - phân phối). Sau này lúc triển khai dự án, bạn chỉ cần upload thẳng cả folder `dist/` lên trên CDN, thế là file ảnh *logo.png* được đảm bảo sẽ được tải trên website của bạn. 

 Vậy cần nhớ 1 điều quan trọng ở đây: Trình duyệt (hoặc node.js) sẽ không bao giờ hiểu `require('logo.png')` là gì. Chỉ có Webpack sẽ giúp bỏ *require* đó đi, thay bằng một đoạn code JavaScript hợp lệ (ví dụ thành URL) chẳng hạn. Một khi đã là JavaScript hợp lệ thì trình duyệt và node.js mới thực thi được.

### Ngoài Webpack ra còn những công cụ nào tương tự? 
---
**Browserify**, **Grunt**, **Gulp**, v.v. là những cái tên thỉnh thoảng nghe đến, nhưng chưa tìm hiểu cụ thể. Chỉ note lại ở đây để có dịp quay lại. 

### Điểm "cộng" của Webpack?
---
1. Xử lý đống *assest* tĩnh, đặc biệt là CSS. Mọi hình ảnh, rồi CSS có thể được đóng gói vào folder `dist/` là xong.

2. Dễ dàng chia tách file mã nguồn. Ví dụ, bạn biết là file `homepage.js` chỉ yêu cầu một số các file CSS nhất định, thì Webpack có thể tạo ra 1 file `homepage.css` duy nhất để giảm kích thước. 

3. Kiểm soát quá trình xử lý các *assets*: Nếu file ảnh có kích thước nhỏ, bạn có thể yêu cầu Webpack encode nó dưới dạng base64, chèn trực tiếp vào JavaScript để giảm số lượng HTTP requests. Nếu file ảnh lớn, thì tải nó thông qua URL. Nếu cần `require('./style.less')`, thì nó sẽ được tự động *parsed* (chuyển đổi) từ Less về CSS thuần. 

4. Giúp quá trình triển khai sản phẩm được ổn định thông qua giảm nguy cơ *deploy* code mà thiếu file ảnh, rồi up nhầm file CSS cũ. 

5. Ban đầu sẽ khá mất thời gian với Webpack, nhưng sau đó thì sẽ tiết kiệm được rất nhiều thời gian nếu cấu hình chuẩn. Bạn sẽ có nhiều tính năng như "*hot load reloading*" (tự động build lại code sau mỗi lần nhấn `save`), quản lý CSS, CDN cache busting, v.v.  

### Điểm "trừ" của Webpack?
---
Không cái gì là hoàn hảo. Có vài điểm cần lưu ý với Webpack là:

1. Tài liệu hướng dẫn rất kém. 

2. Mã nguồn thì cũng [rất nhiều vấn đề](https://github.com/webpack/webpack/issues/824). 

3. Việc thiết lập cấu hình cho Webpack không khác gì đi vào bãi mìn. Cú pháp khó hiểu. Tốt nhất là xem những [thiết lập có sẵn](https://github.com/erikras/react-redux-universal-hot-example/blob/master/webpack/dev.config.js) từ những [dự án dạng "boilerplate"](https://github.com/gaearon/react-hot-boilerplate). Hoặc cũng có thể dùng những [thư viện](https://www.npmjs.com/package/webpack-validator) giúp kiểm tra file cấu hình.

4. Wepback gần như chỉ được [1 người quản lý](https://github.com/sokra). Thành ra nhiều lúc mọi thứ không theo kịp với tốc độ phát triển của công nghệ khác dùng với nó (ví dụ React), và tài liệu cũng không được viết đầy đủ. 

5. Webpack sử dụng ngôn ngữ khá kỳ lạ, ví dụ `require("!style!css!less!bootstrap/less/bootstrap.less");` vốn ít người dùng, không được giải thích kỹ lưỡng.


### Kết luận

Trên đây là một vài dòng về Webpack. Nó mới chỉ là vài đường phác thảo về chân dung của công cụ này, giới thiệu về ý tưởng phía sau, giúp người dùng khỏi cảm thấy bí ẩn mỗi khi nhìn vào Webpack. Còn rất nhiều thứ phải tìm hiểu về nó, ví dụ như **Dev Server**, như **Watch Mode**, v.v, rồi sẽ được viết trong những bài sau. 

### Bookmark cho tương lai

- [Ag-grid: Understanding Webpack](https://www.ag-grid.com/ag-grid-understanding-webpack/)
- [Webpack - Concept](https://webpack.js.org/concepts/)
- [Webpack Basics Explained](https://housefrommars.com/webpack-basics-explained/)
- [Smashing Magazine: A Detailed Introduction To Webpack](https://www.smashingmagazine.com/2017/02/a-detailed-introduction-to-webpack/)