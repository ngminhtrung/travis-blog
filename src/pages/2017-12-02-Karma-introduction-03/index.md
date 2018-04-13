---
id: 112
title: 'Sự ra đời của Karma và thế giới của testing tool vào quãng 2013 (phần 3)'
date: 2017-12-02
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - testing
  - mocha
  - assertion library
  - karma
---

# 3. Vấn đề testing của thế giới lập trình web nằm ở đâu? 

_Trong phần này, tôi muốn nhấn mạnh việc các lập trình viên web không có đủ công cụ để test code của họ một cách hiệu quả, và lý do tại sao cần phải có các testing tool để nâng cao chất lượng sản phẩm web. Tôi cũng chia sẻ thêm về mục đích của dự án Karma, những điểm mà tôi nhắm đến để nâng cao trải nghiệm và phát huy tinh thần kiểm thử trong lập trình web thông qua một test runner mới (chính là Karma)_.

## 3.1. Các vấn đề của testing trong thế giới lập trình web

Phải nói rằng các lập trình viên web không có đủ công cụ để thực hiện việc test tự động, do đó họ không tha thiết, cuối cùng là bỏ qua không chạy test. 

Với các ngôn ngữ và môi trường khác như Java, Python và C#, các công cụ test được tích hợp với các IDES tốt đến mức mà các lập trình viên có thể chạy các bài test trực tiếp trong IDE, nhìn thấy ngay kết quả. Với trường hợp của ngôn ngữ lập trình loại "static type" như Java hoặc C++, ngay bản thân trình biên dịch cũng đã phát hiện ra rất nhiều vấn đề trước khi thực thi code. 

Còn chúng ta, những lập trình viên web, ngôn ngữ hàng ngày sử dụng là JavaScript, thì ngôn ngữ này được xếp vào dạng "dynamic" chứ không phải "static" type. Chúng ta không có trình biên dịch để bắt những lỗi như gõ sai tên biến, gọi method không tồn tại, hoặc đọc những thuộc tính không tồn tại của object. Các lập trình viên phải thực thi code thì mới tìm được vấn đề. Do đó, việc kiểm thử là cực kỳ cần thiết, câu hỏi chỉ là chúng ta tự động hoá được bao nhiêu phần trăm của khối lượng kiểm thử. 

Các ứng dụng web chạy trong 1 trình duyệt nào đó (web browswer). Điều này có nghĩa nếu lập trình viên muốn thử xem đoạn code vừa thêm vào có khiến trang web "trắng xoá" hay không, anh (cô) ta phải mở trình duyệt, nhấn refresh, đợi trang web tải lại rồi kiểm tra bằng "mắt" xem thế nào. **Đây chính là thủ phạm chính - workflow (hay là chuỗi thao tác làm việc)**. Việc thiếu vắng trình biên dịch không hẳn là một vấn đề lớn, bởi máy ảo (virtual machine) JavaScript trong web browswer chạy tương đối hiệu quả và thực thi code còn nhanh hơn việc biên dịch code C++ hoặc Java. Vấn đề ở đây là chuỗi thao tác làm việc (workflow) kia khiến cho lập trình viên phải chuyển cửa sổ từ trình soạn thảo (editor) sang trình duyệt, tải lại trang, kiểm tra bằng mắt thường, thậm chsi còn phải mở web inspector ra và tương tác với ứng dụng web để kiểm tra trạng thái của biến nào đó.  

Ngoài ra, do có rất nhiều trình duyệt khác nhau, dẫn đến một điều là có nhiều vấn đề khác nhau ứng với mỗi trình duyệt, nhất là khi cần thao tác với DOM. Vậy là những kiểm thử có thể PASSED với browswer này, nhưng lại thành FAILED với browser khác. Thật là một thảm hoạ. 

Đương nhiên có thể thực thi JavaScript không qua trình duyệt bằng cách chạy nó trong môi trường như Node.js hoặc Rhino. Cách này có thể giảm số bước thao tác trong workflow ít nhiều. Nhưng vẫn tồn tại hai vấn đề: (1) Lập trình viên không thể truy cập đến những thứ đặc thù của browser như DOM hoặc API, khiến cho việc test chỉ giới hạn trong các logic thuần JavaScript. (2) Mỗi browser lại có các vấn đề khác nhau. Để kiểm tra toàn bộ các vấn đề này, cần thực hiện test cho mọi browser mà sản phẩm được hướng tới sẽ chạy trên đó.  

## 3.2. Mục tiêu đối với dự án phát triển testing enviroment Karma

Mục đích của dự án này là tạo ra một công cụ - một test runner (hay testing enviroment) mà có thể giúp các lập trình viên nâng cao hiệu suất và hiệu quả làm việc thông qua các phần test tự động đơn giản và nhanh hơn. 

Thực sự tôi còn mong muốn nhiều hơn thế, tôi muốn thúc đẩy cho Test Driven Development (TDD) như là cách mà lập trình viên cần làm để phát triển ứng dụng. Lý do? Bởi tôi tin đây là cách hiệu quả nhất để tạo ra những sản phẩm chất lượng cao. 

Có hai yêu cầu tiên quyết mà mỗi lập trình viên cần để áp dụng TDD một cách thành công:
- viết những đoạn code dễ test
- có một testing enviroment. 

Việc viết những đoạn code dễ test là con đường mà AngularJS đang triển khai. AngularJS tạo ra hướng dẫn giúp lập trình viên viết những module độc lập, phân tách nhiệm vụ với nhau, từ đó tạo điều kiện để test code. 

Còn Karma chọn điều kiện thứ hai, mục đích của Karma là đem đến một môi trường test phù hợp đến cho bất kỳ lập trình viên nào. Quá trình cài đặt và cấu hình phải rành mạch, giúp cho việc viết kịch bản test chỉ mất vài giây, rồi kết quả của việc test hiện lên tức thời. 

Ở các phần bên dưới, tôi sẽ mô tả các trường hợp và tính năng mà Karma cần hỗ trợ, lý do tại sao các tính năng này quan trọng. 

### 3.2.1. Thực hiện kiểm thử trên những trình duyệt thực sự

Có rất nhiều vấn đề xảy ra khi hiển thị trang web trên những trình duyệt khác nhau, và một trong những mục tiêu của kiểm thử là phải nắm được chuyện gì đã xảy ra. Vấn đề này có thể là gì: Mỗi trình duyệt thì hiển thị khác nhau một chút, thực hiện các API khác nhau, hệ điều hành mà trình duyệt đang chạy trên đó cũng dẫn đến các lỗi không đồng nhất. Đó là lý do Karma hướng đến khả năng thực hiện tests trên bất kỳ trình duyệt nào, thậm chí trên các thiết bị khác nhau, bao gồm điện thoại di động và máy tính bảng. 

### 3.2.2. Khả năng kiểm soát từ xa

Như đã nói ở trên, đây là chuỗi thao tác đặc trưng của lập trình viên web: thay đổi gì đó trong code, nhấn save, quay sang trình duyệt, nhấn refresh, đợi trình duyệt tải, di chuột chạy thử vài thao tác để "xem" (bằng mắt) những thứ vừa làm trong code đã hiển thị đúng chưa. Nếu chưa, lặp lại các bước trên. Đây là một chuỗi thao tác nhàm chán gây mất tập trung cần phải loại trừ. 

Karma hướng đến việc giảm bớt chuỗi thao tác, mỗi lần lập trình viên nhấn save, họ phải nhìn thấy kết quả test ngay lập tức, ngay trong trình soạn thảo mà không phải chuyển sang trình duyệt. Nếu cần kích hoạt một phép kiểm thử thủ công thì việc đó cũng có thể được làm ngay trong cửa sổ console của IDE. Đây chính là tính năng "kiểm soát từ xa" mà Karma cần có.

### 3.2.3. Tăng tốc độ test

Đợi chờ kết quả test thì thường là không thích thú lắm, thời gian đợi có thể lên tới một vài phút. Do đó mà lập trình viên có xu hướng chỉ chạy tests vài lần trong ngày, và họ sẽ khó để sửa lỗi phát hiện qua test failed. Lý do cho điều này rất đơn giản, là vì nếu càng thêm nhiều code vào sau lần chạy test lần cuối cùng, thì sẽ vùng tìm kiếm lỗi sẽ rộng ra hơn. 

Tôi muốn thu nhỏ không gian tìm kiếm nói trên bằng cách cho phép lập trình viên chạy tests vào mỗi lần họ lưu file, các lỗi sẽ dễ được phát hiện hơn, do số lượng code mới thêm vào còn chưa nhiều. Muốn làm được như vậy, việc thực hiện các phép kiểm tra phải rất nhanh. Người dùng không muốn đợi dài hơn 1 vài giây. Đó là lý do tại sao mục tiêu của Karma là nhanh. 

Thêm nữa, Karrma cần cung cấp cơ chế để tập trung test một phần nhỏ trong cả kịch bản test lớn. Ví dụ, nếu lập trình viên đang làm việc trên 1 tính năng nhất định nào, họ chỉ cần các phép tests liên quan trực tiếp đến tính năng đó thôi. Nếu tests toàn bộ một dự án (lớn), vốn có hàng nghìn phép tests, thì thời gian chạy sẽ rất lâu. Như thế, khả năng chạy một phần nhỏ của kịch bản bản test sẽ khiến lập trình viên thực hiện kiểm thử thường xuyên hơn. 

**Vậy, ý tưởng cốt lõi ở đây là luôn có phản hồi liên tục từ test, giảm thiểu sự sao nhãng của lập trình viên**.

### 3.2.4. Tích hợp với các IDE và trình soạn thảo (text editor)

Karma cần phải được tích hợp nhưng không phụ thuộc vào IDE và trình soạn thảo. Nghĩa là công cụ này cần cung cấp các tính năng cơ bản như "watching" phần code, và thực thi phần test mỗi khi có bất kỳ sự thay đổi nào với code, hoặc chỉ chạy một phần nhỏ trong kịch bản test trong khi không cần bất kỳ hỗ trợ nào từ IDE hoặc trình soạn thảo. 

### 3.2.5. Tích hợp với các CI Servers

Continuous Integration (CI - tam hiểu là "tích hợp liên tục") ban đầu là thao tác gộp code của các lập trình viên ở các chỗ (trên máy tính chẳng hạn) vào 1 nơi (trên server chung chẳng hạn) để phòng trách các vấn đề liên quan đến tích hợp. Còn ngày nay, lý do chính để có CI server là để giúp build toàn bộ project, kiểm thử trên các thiết bị khác nhau mà việc này vốn tốn nhiều thời gian không thể làm được trên máy tính của lập trình viên. Hơn nữa, lập trình viên cũng chẳng có toàn bộ các thiết bị để thử nghiệm. Do vậy, thường thì họ chỉ chạy một vài test nhẹ trên máy, phần còn lại sẽ chạy trên CI Server. CI Server sẽ chạy testing mỗi lần code được đẩy lên repository, hoặc thậm chí trước cả lúc đấy. 

Việc debug trên CIT server khá là khó khăn bởi không được làm trực tiếp, chưa kể các giới hạn về quyền truy cập. Từ lý do này, Karma sẽ cần phải tích hợp tốt với CI server, cho phép sử dụng cùng cấu hình test cả khi làm trên máy cục bộ lẫn trên CI server. Muốn được như vậy, Karma sẽ phải có khả năng xuất kết quả dưới dạng XML, cung cấp 1 mode đặc biệt mà ở đó mọi test được thực thi một lần, trả kết quả ngay lập tức, cho người dùng biết là test thành công hay failed. 

### 3.2.6. Khả năng mở rộng

Karma sẽ cho phép bên thứ ba tích hợp các phần mở rộng (plugin), để bổ sung thêm tính năng cũng như hỗ trợ tích hợp với bất kỳ framework hoặc thư viện nào. 

### 3.2.7. Debugging 

Quá trình debug là việc loại bỏ các lỗi xảy ra khi chạy chương trình. Hầu hết các công cụ lập trình đều cho phép người dùng mở 1 chế độ đặc biệt để nhìn vào những ngóc ngách khi code thực thi. Do tính quan trọng của debg, Karma sẽ cần hỗ trợ việc này, cho phép kích hoạt chương trình debug của trình duyệt theo cả 2 cách, từ trong trình duyệt hoặc từ IDEs. 

