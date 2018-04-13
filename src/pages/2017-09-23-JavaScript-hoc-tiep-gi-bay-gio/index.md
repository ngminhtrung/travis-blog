---
id: 102
title: '[Zell Well] Lựa chọn nào cho việc học Javascript'
date: 2017-09-23T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - General
tags:
  - javascript
  - front-end
  - framework
  - node
  - server
  - database
  - mongoDB
  - Angular
  - React
  - Zell Liew
---

Đây là 1 bài dịch từ 1 email của Zell Liew với tiêu đề "JSR - Exploring JavaScript peripherals (The Adult Phase)". Tôi đăng ký nhận thư của anh chàng này từ lúc nào không nhỡ, và thường nhận được những email có nội dung chưa được thú vị lắm. Email này trong chuỗi "Con đường khám phá JavaScript" của Zell, và anh ta đã gửi 1 - 2 thư trước về gia đoạn sơ sinh, rồi gia đoạn teen. Giờ là phần "trưởng thành" (Adult Phase). Vì tò mò, tôi đã đọc chứ không xoá đi như thường lệ, và quả thực tác giả nhắc đến những điều chưa ai nói với tôi. Còn bạn, đã ai nói với bạn là sau khi học cơ bản về HTML, CSS và Javascript, bạn muốn đi tiếp với Javascript thì sẽ nên đi như thế nào? một rừng lựa chọn ngoài kia, cái nào nghe cũng quen tai mà chẳng hiểu gì cả, từ front-end framework, node, nodejs, database, etc... Ở bài này, tôi sẽ dịch để bạn thấy tác giả đi thẳng vào vấn đề học và làm cái gì, không phân tích quá nhiều, khỏi mất công đau đầu.  

= = = = = = = = = = = = 

Sau khi đã đạt đến một trình độ cơ bản nhất định về JavaScript, đây là các lựa chọn bạn có thể xem xét:
1. Học một front-end framework nào đó (như Angular, React)
2. Học Node để làm backend.
3. Học những kiến thức Javascript nâng cao. 

<h2>Học front-end frameworks</h2>

Việc sử dụng một framework nào đó đồng nghĩ với việc bạn đã bị khóa trong không gian tư duy của framework đấy. Việc thay đổi là rất tốt kém. Vì thế trước khi chọn học cái nào, hãy tự hỏi bản thân bạn cần cái gì. 

Chẳng phải ai cũng cần một framework, bởi đôi khi, Javascript thuần đã là quá đủ. Thử đọc <a href="https://zellwk.com/blog/learn-tools/?ck_subscriber_id=131432563">bài này (08.03.2017) </a> nhé trước khi ra quyết định. 

*Ok, giờ giả sử ta thực sự cần một framework chứ JavaScript thuần không đủ, vậy thì sao?*

Bạn cần quyết định xem học cái gì. Đây là một câu hỏi hại não mà nhiều người đã chết tắc ở đó. 

Hàng tá bài viết trên mạng phân tích và so sánh các frameworks, nhưng tốt nhất bạn chỉ nên dùng một (hoặc tối đa 2 tiếng) để đọc mấy bài đó thôi, sau đó thì quẳng đi và đi theo tiếng gọi trái tim, thấy thích thích cái gì thì học. 

Việc chọn framework nào chưa quan trọng, kể cả việc bạn có chọn sai. Cứ tiếp tục bước tới và học framework đấy một cách bài bản đã. 

Tôi nói vậy bởi các framework đều tương tự nhau, đều là những điều giống nhau (routing, DOM manipulation, kiểm soát states, v.v.). Một khi bạn đã vững framework đầu tiên, bạn sẽ dễ dàng tiếp cận các framework còn lại. 

Nếu được, tự tạo ra một dự án nhỏ mà bạn có thể thực hành những gì mình học, bạn sẽ nhận ra những điều mình không thấy nếu chỉ đọc tài liệu không thôi. 

<h2> Các thư viện Javascript khác thì sao? </h2>

Bên cạnh frameworks, hãy cân nhắc rất nhiều thư viện JavaScript để bạn cân nhắc. Đơn cử như:
1. <a href="https://greensock.com/gsap?ck_subscriber_id=131432563">GSAP</a> - GSAP là một thư viện để xây dựng animation có hiệu suất cực cao. Nếu bạn muốn làm những hiệu ứng vừa ngầu vừa phức tạp, đừng quên GSAP.
2. <a href="https://d3js.org/">D3</a> - D3 là một thư viện để xào xáo DOM dựa trên số liệu. Nếu bạn muốn hiển thị một lượng lớn số liệu, hãy thử D3. Và bạn thực sự thích thú với biểu diễn dữ liệu - nhớ theo dõi <a href="http://www.datasketch.es/">Data Sketches</a> của Shirley Wu và Nadieh Bremer. 
3. <a href="https://lodash.com">Lodash</a> - Lodash là một thư viện chức năng để giúp bạn làm việc dễ dàng hơn với JavaScript. 
4. <a href="https://webpack.js.org">Wepack</a> - Wepack là thư viện thông dụng nhất để gói và bung các tài nguyên Javascript hiện tại. Một khi đã thành thạo với Wepack, bạn có thể cắt và thu nhỏ code Javascript của mình chỉ trong 1 bước. 
5. <a href="https://gulpjs.com">Gulp</a> - một task runner thông dụng. 

<h2> Học để xây dựng phần backend </h2>

Nếu bạn muốn dựng backend thì tốt nhất là chơi với <a href="https://nodejs.org">Node</a> nó là ngôn ngữ Javascript cho server. Node hoàn toàn có thể so găng với những người khổng lồ trong ngôn ngữ server như Ruby và Python. Rất nhiều công ty lớn như Netflic, Paypal, và LinkedIn sử dụng Node. 

Có hai ưu điểm khi bạn học Node:

1. Bạn sẽ học Node nhanh hơn vì đã có nền tàng về Javascript (ý là nếu bạn chưa biết ngôn ngữ server nào cả thì học Node sẽ nhanh hơn.)

2. Học xong Node, bạn sẽ tận dụng được luôn những công cụ như Wepack và Gulp vốn được xây dựng trên Node. Bạn có thể dụng npm như công cụ quản lý gói thư viện. 

Bên cạnh Node, bạn cần 2 thứ nữa: một server framework và một ngôn ngữ cơ sở dữ liệu. 

<h3> Server </h3>

Một server framework sẽ giúp bạn tiến vào thế giới backend nhanh hơn mà không phải gõ quá nhiều code. Tất nhiên, nếu thích thì bạn có thể tự xây dựng server, nhưng tôi nghĩ là không cần thiết. 

Tôi khuyên bạn nên thử với server framework thông dụng nhất cho Node là Express.js. 

<h3> Cơ sở dữ liệu </h3>

Cứ tưởng tượng cơ sở dữ liệu như ổ đĩa cứng trên máy của bạn. Và khi tạo server, bạn cần một thứ gì đó như ổ cứng để tổ chức và lưu thông tin. 

Có rất nhiều ngôn ngữ cơ sở dữ liệu, hầu hết được phân ra giữa ngôn ngữ hệ SQL và hệ không-SQL. Với hệ SQL, thông dụng nhất là Postgres, trong khi ở hệ không-SQL, thông dụng nhất là MongoDB. 

Bạn có là lĩnh mới trong lĩnh vực này không? Nếu đúng, chọn MongoDb vì câu lệnh của nó gần tương tự với JavaScript nên sẽ dễ cho bạn khi học. 

Tôi đưa bạn 2 khoá học để giúp bạn tìm hiểu về server nhanh chóng:
1. <a href="https://zellwk.com/blog/crud-express-mongodb/?ck_subscriber_id=131432563">Xây dựng một ứng dụng CRUD đơn giản với Express và MongoDB. </a>
2. <a href="https://learnnode.com/?ck_subscriber_id=131432563">Khoá học Node của Wes Bos. </a>

<h2> Học Javascript nâng cao </h2>

Kể cả khi bạn đang ở gia đoạn "trưởng thành", vẫn có quá nhiều thứ cần biết về JavaScript. Hãy chọn bất kỳ thứ nào dưới đây. 

1. Lập trình hướng đối tượng. 

2. Lập trình hàm. 

3. Những thay đổi mới nhất của Javascript. 

4. Test Driven Development 


Vậy đấy, có quá nhiều lựa chọn phải không? bạn tính đi tiếp đường nào?

