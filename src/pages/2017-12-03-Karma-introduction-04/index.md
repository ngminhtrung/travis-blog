---
id: 113
title: 'Sự ra đời của Karma và thế giới của testing tool vào quãng 2013 (phần 4)'
date: 2017-12-03
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

# 4. Những giải pháp hiện tại 

_Trong phần này, tôi sẽ mô tả về các giải pháp hiện tại cho việc kiểm thử các ứng dụng web, giải thích các ưu nhược điểm của từng công cụ_.

Kiểm thử ứng dụng web sẽ được thực hiện ở rất nhiều cấp độ: từ cấp độ thấp nhất, tức là kiểm tra chức năng của từng function bỏ qua cả hệ thống còn lại, đến cáp độ cao nhất là kiểm tra toàn bộ ứng dụng từ góc độ người dùng. Việc test cấp độ thấp thường không đò hỏi việc cài đặt gì cao siêu, và nó chạy khá nhanh. Tuy vậy một kịch bản test không chỉ toàn cấp độ thấp bởi còn cần xem các module nhỏ sẽ làm việc, trao đổi thông tin với nhau chuẩn xác hay không. Thêm nữa, khi tích hợp với dịch vụ của bên thứ ba thì sẽ không thể nào không test ở cấp độ cao. Test ở cấp độ càng cao thì càng mất thời gian, do đó cần thực hiện test ở nhiều cấp để đảm bảo hiệu quả. 

Phần dưới đây sẽ nói về các giải pháp hiện tại cho kiểm thử ứng dụng web. Hầu hết các công cụ này đều phù hợp để test ở 1 trong 2 cấp độ:  mức độ thấp như Mocha hoặc JsTestDriver, hoặc cấp độ cao như Selenium hoặc WebDriver. Do vậy, các công cụ đó không hẳn là cạnh tranh với nhau, mà là bổ trợ cho nhau.  

## 4.1. Selenium 

[Selenium](http://docs.seleniumhq.org) là một bộ công cụ đa năng để test, xuất hiện gần như sớm nhất và có nhiều tính năng đã được kiểm chứng qua thời gian. Selenium phù hợp cho test ở cấp độ cao, với kịch bản test viết cho toàn bộ ứng dụng đứng từ góc độ của người dùng.  

Nguyên lý làm việc của Selenium tập trung ở cái gọi là "proxy injection". Selenium mở 1 trình duyệt có proxy đặt đến 1 URL cục bộ, URL này được dẫn đến 1 server tạo ra bởi Selenium để "lắng nghe" các yêu cầu (request). Mỗi khi trình duyệt mở 1 URL mới, nó (trình duyệt) sẽ gửi request thông qua proxiy nói trên. Thông tin trả về là 1 trang web theo yeu cầu, đi kèm thêm 1 đoạn code JavaScript trong đó. Đoạn JavaScript thêm vào này tạo ra liên lạc giữa trình duyệt và Selenium server. 

Lập trình viên sẽ sử dụng các API trong thư viện Selenium cho phần "client" để thực hiện các thao tác như "điều hướng trang web đến 1 địa chỉ URL", hoặc "click vào 1 nút" trong kịch bản test. Thư viện client kia sẽ chạy kịch bản test, gửi mệnh lệnh thông qua HTTP đến Selenium server, server này có kết nối với browser và sẽ chuyển tiếp các mệnh lệnh đến browser. Đoạn mã JavaScript thêm vào nói trên sẽ giúp "diễn dịch" lại các mệnh lệnh trong browser.   

Do thư viện client hỗ trợ Java, Pythong và Ruby, nên lập trình viên có thể sử dụng 1 trong 3 ngôn ngữ này để viết kịch bản test. 

## 4.2. WebDriver / Selenium 2

WebDriver là một protocol dựa trên HTTP để liên lạc với web browswer. Selenium 2 là thế hệ tiếp theo của Selenium, và thực thi giao thức của WebDriver. 

## 4.3. Mocha

Mocha là một testing framework và test runner, viết bằng JavaScript trong môi trường Node.js (Node), với mục tiêu chính là test ở cấp độ thấp trong các dự án sử dụng Node. Có lẽ đây là test runner tốt nhất cho mục tiêu này. 

Mocha có thể được thao tác hoàn toàn bằng dòng lệnh, được tích hợp với bớt kỳ IDE nào. Đây là đặc điểm giúp cải thiện chuỗi thao tác công việc đã nói ở phần 3. 









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

