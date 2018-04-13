---
id: 105
title: '[D3.js] Có đáng để học ở Việt Nam hay không?'
date: 2017-10-04
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - General
tags:
  - javascript
  - front-end
  - D3.js
  - Data Visualization
  - job
  - career path
  - skill demanded
  - worth
---

Học D3.js để làm gì? có công ty nào ở Việt Nam cần nó? liệu đi làm chuyên về D3.js có đáng hay không? sau một thời gian chuyên về D3.js thì ta sẽ trở thành ai? thị trường tuyển dụng đánh giá như thế nào? ta kiếm tiền từ kỹ năng này ra sao? Bên cạnh D3.js ta cần phát triển thêm kiến thức/ kỹ năng nào? Đây là hàng loạt các câu hỏi tôi tự đặt ra khi bắt đầu với D3.js, cũng như khi đi phỏng vấn với 1 nhóm chuyên về mảng này ở Việt Nam. Với kinh nghiệm hạn hẹp trong ngành, tôi cố gắng tự trả lời, hoặc google câu trả lời, hy vọng giúp mình hiểu về con đường mình (có thể) đi, tránh những kỳ vọng phi thực tế, và lên kế hoạch self-training một cách khoa học. 

0. D3.js là gì thì ai chưa biết có thể đọc ở [trang chủ chính thức của thư viện JavaScript này] [1]. D3.js dùng để trực quan hoá dữ liệu, biến dữ liệu thành những đồ thị, bảng biểu xây dựng từ những native HTML5 elements (chứ không phải file ảnh), tăng tính tương tác với người dùng trong môi trường web. 

1. Học D3.js để làm gì? Để phục vụ cho thú vui cá nhân (tạo những đồ thị, bảng biểu có độ tuỳ chỉnh và tương tác cao vượt khỏi khả năng của Excel). Để đi làm kiếm tiền! 

2. Công ty nào ở Việt Nam cần D3.js? Chắc là không có, tìm thử trên [itviec.com][2] hay [topdev.com][3] đều không có kết quả nào :( Ở ngoài Việt Nam thì ok hơn, nhưng đương nhiên là không thể nhiều bằng các kỹ năng khác rồi. Đây là các tìm kiếm ở [indeed.com][4], [upwork.com][5] hay [glassdoor.co.uk][6]. Kết luận sơ bộ là việc chỉ dùng đến D3.js thì rất ít, và cũng chẳng công ty nào thuê 1 ông chỉ biết mỗi D3 trong khi các front-end technologies khác bẻ đôi không biết. 

3. Thế giới họ có thắc mắc giống mình hay không? Dân tình bàn tán ra sao? Tham khảo các bạn trên Quora nói gì ở bên dưới. 

4. Kết luận tiếp theo là gì? Biết mỗi d3.js thì sẽ chẳng tìm được việc ở nước ngoài chứ chưa nói là ở Việt Nam. d3.js cần được kết hợp với nhiều nền tảng khác để có thể phát huy hiệu quả nhất kỹ thuật trực quan hoá dữ liệu. Những kiến thức nền tảng chưa học vẫn cần học, những cái nào đang làm thì cần tiếp tục trau dồi và nâng cao:
- thuật toán
- data visualization
- front-end development
- back-end development 

> **Hỏi**: *Liệu những người giỏi D3.js sẽ dễ dàng tìm được việc trong tương lai gần? ([Will people with good d3.js skills be highly demanded in the near future?][7])*

- **Jérôme Cukier, data visualization engineer, Nov 2016**:

Trong khi tương lai của ngành trực quan hoá dữ liệu là vô cùng chắc chắn, thì d3.js nói riêng lại không phải là một kỹ năng hiếm khó tìm. Ba năm trước (2013), không dễ để tạo charts trên web. d3.js đã cho phép người dùng tạo ra các chart, bản đồ, và thậm chí dùng các thuật toán cao cấp như "treemaps" hoặc "force-directed layouts". Và đó cũng là thời mà việc học D3 khó hơn bây giờ rất nhiều, sách, ví dụ, workshop chẳng có để tham khảo. 

Còn bây giờ (năm 2016), chẳng những việc tạo charts và biểu diễn dữ liệu (dùng hoặc KHÔNG dùng D3) đã trở nên dễ dàng hơn, mà việc học nó cũng đơn giản. Một kỹ sư chưa biết gì về D3 có thể bắt đầu trong 1 ngày, rồi tiến dần đến các thao tác chỉnh sửa phức tạp hơn trong vài tuần tiếp theo. Tất nhiên phải hiểu là ai đã biết/ sử dụng d3.js thì thường có khiếu/ hứng thú với biểu diễn dữ liệu, sử dụng d3.js cũng là một cách để học về trực quan hoá một cách tổng quan. 
 
Ở một góc độ nào đó, d3.js đã trở thành quá dễ để học nó. d3.js được sinh ra trong một phòng lab ở đại học Standford, những người dùng nó đầu tiên là những tay quái kiệt cả về kỹ thuật lẫn lý thuyết (tức là họ biết cả thuật toán, javascript, và lý thuyết thông tin). Thế rồi đối tượng người dùng của d3.js được mở rộng, bất kỳ người nào dù không có các nền tảng vừa nói trên đều có thể sử dụng nó. Họ dùng d3.js một cách biệt lập, nhanh chóng hoàn thành các đồ thị riêng lẻ, nhưng lại không học cách để biến trực quan hoá dữ liệu thành 1 phần của 1 ứng dụng lớn hơn. Nói chung, người ta nên học lý thuyết thông tin và khoa học máy tính trước khi đến với d3.js (không phải sau/ hoặc không bao giờ).

Trong 2 năm tới (2017, 2018), d3.js có thể (hoặc có thể không) trở thành cách thông dụng nhất để biểu diễn dữ liệu với JavaScript. Điều này cũng đúng với JavaScript, nó có thể trở thành ngôn ngữ thông dụng nhất để xây dựng web, hoặc một ngôn ngữ khác sẽ thay thế Javascript. Đến lượt thế giới web, liệu web sẽ còn là cách người ta dùng nhiều nhất để đọc thông tin ở môi trường làm việc? 

Bạn thấy đấy, d3.js không phải là tất cả, chúng ta vẫn sẽ cần các kỹ năng biểu diễn dữ liệu, nhưng không phải chỉ với d3.js. 

- **Taha Kachwala, Agnostic Muslim, Oct 2016**:

Là một full-stack web developer, tôi có thể nói rằng thứ khiến cho tôi trở nên đặc biệt hơn so với lập trình viên khác khi tìm việc chính là d3.js. Không nhiều người có kinh nghiệm với nó, và càng ít người thuần thục. Trong các ứng dụng web, mỗi khi có yêu cầu phải tạo các bảng biểu đồ thị, thì giải pháp nhanh nhất là dùng các thư viện như HighCharts, C3, Plotly, v.v. nhưng nó đồng nghĩa với việc bạn phải giảm khả năng tinh chỉnh và tương tác với người dùng. Tôi tin là D3 xuất sắc bởi bản thân nó đã là một ngôn ngữ mới chuyên dùng cho trực quan hoá dữ liệu. 

Bạn cần chuyên tâm thực hành mới có thể sử dụng D3 một cách thuần thục. Việc trực quan hoá dữ liệu cũng đang trở thành 1 lĩnh vực có nhu cầu cao trên thị trường tuyển dụng. Gần như bất kỳ sản phẩm nào cũng cần những tính năng hiển thị dữ liệu cho khách hàng, làm báo cáo liên quan đến tài chính, sản phẩm, v.v. Tôi chẳng tìm được một ứng dụng web nào mà không đi kèm biểu diễn dữ liệu cả.

Vì thế, vâng, câu trả lời là bạn sẽ trở nên đặc biệt hơn trong mắt nhà tuyển dụng nên sở hữu porfolio với những đồ thị đẹp mắt (và có nghĩa).

> **Hỏi**: Kỹ năng sử dụng d3.js có giá trị thế nào? [How valuable of a skill is d3.js?][8]

- **Jérôme Cukier, data visualization engineer, Nov 2015**:

Nếu tách D3.js ra khỏi những kiến thức/ kỹ năng khác thì nó chẳng có gía trị gì lắm. D3.js phải đi cùng với hai kỹ năng sau: 
1. Information Design (không biết nên dịch là gì)
2. Front-end engineering 
Để có thể tạo ra một sản phẩm (trực quan hoá dữ liệu) tốt, người dùng cần phải thuần thục ít nhất 2 trong 3 kỹ năng trên (D3.js, Information Design, và Front-end Engineering).

Khoảng 2 năm trước (2013, 2014), tìm được người giỏi D3.js không dễ, và d3.js là cách đáng tin cậy nhất để tạo đồ thị trên web. Còn giờ thì sao (tháng 11 năm 2015), mệnh đề trên không đúng nữa. Bất kỳ một kỹ sư front-end nào đều có thể biến dữ liệu thô thành 1 dạng biểu diễn nào đó. 

Vậy kết là gì? có kỹ năng dùng d3.js chỉ giúp người dùng nâng cao hiệu suất khi cần trực quan hoá dữ liệu. 

> **Hỏi**: Liệu d3.js có đáng để học? [Is d3.js worth learning?][9]

- **Adrian M.P. Brasoveanu, works at MODUL University, Vienna, May 2017**:

Điều này hoàn toàn phụ thuộc vào mục tiêu của bạn. Học chỉ để học thôi thì không đáng. Nếu một trong những mục đích của bạn là tìm một cách đẹp đẽ để biểu diễn dữ liệu, thì vâng, d3.js xứng đáng với công sức bỏ ra. Còn nếu chỉ đơn thuần làm nhanh một đồ thị nào đó, thì hãy dùng những thư viện xây dựng trên nền d3.js, hoặc sử dụng Python hoặc R. 

Nếu bạn đặt mục tiêu hiểu sâu về front-end development, trực quan hoá, design patterns hay thuật giải, thì d3.js là một kỹ năng cần có. 

Mike Bostock (tác giả của D3) đã giải thích một trong những mục tiêu của ông ta khi thiết kế phiên bản mới của d3 là để hiểu, cũng như tìm tòi cách tốt nhất để thể hiện trực quan các thuật giải. Hãy đọc bài viết này trước khi quyết định sẽ làm gì tiếp theo: [Visualizing Algorithms][10]. Lưu ý là chính tác giả của D3 đã viết bài đó, phân tích một vài patterns đẹp, cũng như những lý do dẫn đến việc thiết kế thư viện D3. 

Và đây là suy nghĩ về D3 của 1 huyền thoại trong giới lập trình, Ward Cunningham, tác giả của Smalltalk và Extrem Programing: "*<span style="color:blue">Khi đang tìm cách để di chuyển các đối tượng (HTML element?) trên màn hình, tôi đã gặp thư viện d3.js. Đây là một thư viện với rất nhiều ví dụ biểu diễn dữ liệu vô cùng ấn tượng. Ở mỗi ví dụ, số dòng code chỉ khoảng 20, 30, 40 dòng. Rồi tôi đọc tài liệu, đọc về "philosophy" của thư viện này mà tác giả muốn gửi gắm. Tôi thích những hình biểu diễn và cả những dòng code phía sau nó. Chỉ có 40 dòng thôi, nhưng mỗi dòng chứa đựng trong nó những suy nghĩ thấu đáo. Tuy vậy, độ ngắn của các dòng code không tỷ lệ thuận với độ khó khi học sử dụng thư viện d3 này. Với tôi, điều khiến tôi hạnh phúc nhất của năm nay (năm 2012, thời điểm phỏng vấn) là được đào sâu vào những dòng code của d3, hiểu nó làm gì, hiểu những gì thư viện không làm được, và cách để giải quyết vấn đề.</span>*

*<span style="color:blue">Tôi thấy những ai nếu muốn có những hình chuyển động trên màn hình thì nên thử d3.js. Nhưng thử nó với một tâm trí rộng mở, bởi bạn đang đi theo sau bước chuân của một lập trình viên vô cùng xuất sắc.</span>"* (toàn bộ bài phỏng vấn có thể đọc ở đây: [Interview With Ward Cunningham][11])

Nếu những điều trên còn chưa đủ để thuyết phục bạn về giá trị của d3.js thì tôi nghĩ chẳng thứ gì khác làm được. Thật khó để có thể quảng cáo về d3.js tốt hơn Ward Cunningham. 


> **Hỏi**: Liệu d3.js có đáng để học nhìn từ khía cạnh đi xin việc? Nếu tôi đã biết React thì tôi có cần thêm D3.js? [(Is D3.js good to learn in terms of job prospect as of today? I already know React, so do I need D3.js?)][12]


[1]: https://d3js.org/
[2]: https://itviec.com/it-jobs/d3.js
[3]: https://topdev.vn/search?q=D3.js&sid=&cid=
[4]: https://www.indeed.com/q-D3-jobs.html
[5]: https://www.upwork.com/o/jobs/browse/skill/d3-js/
[6]: https://www.glassdoor.co.uk/Job/data-visualization-developer-javascript-d3-js-jobs-SRCH_KO0,45.htm
[7]: https://www.quora.com/Will-people-with-good-d3-js-skills-be-highly-demanded-in-the-near-future
[8]: https://www.quora.com/How-valuable-of-a-skill-is-d3-js
[9]: https://www.quora.com/Is-d3-js-worth-learning
[10]: https://bost.ocks.org/mike/algorithms/
[11]: http://www.drdobbs.com/architecture-and-design/interview-with-ward-cunningham/240000393?pgno=4
[12]: https://www.quora.com/Is-D3-js-good-to-learn-in-terms-of-job-prospect-as-of-today-I-already-know-React-so-do-I-need-D3-js