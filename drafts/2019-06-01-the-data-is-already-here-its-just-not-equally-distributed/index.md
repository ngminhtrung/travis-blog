---
title: 'THE DATA IS ALREADY HERE, IT’S JUST NOT EQUALLY DISTRIBUTED'
date: 2019-06-01
author: ngminhtrung
categories:
  - pondering
tags:
  - reviewing
  - self
  - best_practices
  - programming
  - '2018'
---
http://brightwolf.com/the-data-is-already-here-its-just-not-equally-distributed/

*Viết tắt*: **IIoT** = **I**ndustrial **IoT** = giải pháp hoặc sản phẩm IoT cho môi trường công nghiệp (cho nhà máy chẳng hạn)

===

Với nhiều doanh nghiệp, việc đầu tư cho IIoT có thể coi là thành công bước đầu  khi mà "*concept của IIoT*" đã được triển khai chạy thử trơn tru. Tuy nhiên khoản đầu tư đó có đem lại hiệu quả tài chính hay không thì chưa rõ. Để có thể đem lại hiệu quả đầu tư về mặt tài chính, các giải pháp IIoT phải đi xa hơn việc chỉ trích xuất dữ liệu từ các máy móc, lưu trữ dữ liệu đó trên "đám mây", rồi hiển thị dữ liệu trong các ứng dụng. Mấy trò đó đã xa xưa như trái đất rồi. Những hệ thống IIoT muốn được coi là thành công, muốn nhận được sự chú ý thì phải vượt lên trên những thứ kỹ thuật như máy móc hay kết nối đám mấy. Để chứng minh cho chủ doanh nghiệp những giá trị kinh doanh (business outcome) của một hệ thống IIoT, dự án đòi hỏi sự tích hợp toàn diện thông tin của toàn bộ tổ chức, kết hợp và tái kết hợp dữ liệu từ các máy móc với ERP, CRM chẳng hạn thành "hiểu biết (insight)" và hành động. Trừ khi dự án dạng "concept của IIoT" của bạn ngay từ đầu đã bao gồm các giải pháp cho các thách thức của việc truy cập và phân phối dữ liệu, còn không thì dự án ấy chưa chứng minh được điều gì..

## Làm thế nào để trích xuất dữ liệu từ máy móc thiết bị lên đám mấy?

Đây là cách hầu hết các dự án IIoT bắt đầu. Tùy thuộc vào sự phức tạp của máy móc, sự đa dạng, tốc độ sản sinh, và khối lượng dữ liệu được tạo ra, cũng như các điều kiện của môi trường và hệ thống mạng mà máy móc hoạt động trong đấy, câu trả lời có thể là rất đơn giản, có thể là vô cùng phức tạp. Tuy vậy, điểm sáng đó là việc thu thập dữ liệu một cách an toàn (bảo mật), chuyển đổi dữ liệu, truyền dữ liệu chủ yếu thuộc phạm trù chuyên môn kỹ thuật, bao gồm việc xác định công nghệ thích hợp và áp dụng chúng cho phù hợp.

## Làm thế nào để khai phá được giá trị bên trong dữ liệu?

Bây giờ cuộc hành trình thực sự bắt đầu, nó vượt lên trên những lao động tay chân (như khoan và bơm trong công nghiệp dầu khí), tiến vào một không gian nơi các thuộc tính của dữ liệu dạng tương tự (analog data) được số hoá, được xem xét đến từng bit riêng lẻ của dữ liệu. Những thông tin này phải được làm sạch, được chế biến, tinh chế, và rồi [kết hợp thành các định dạng mới](http://brightwolf.com/mastering-data-flow-distributed-industrial-iot-systems/) - một dạng "chuyển đổi kỹ thuật số" - trở thành nguyên liệu đầu vào cho các hoạt động kinh doanh. "*Làm thế nào mà dữ liệu mới này có thể giúp tạo ra các cơ hội kinh doanh mới? tạo thêm thu nhập mới cho tôi và khách hàng của tôi?*". Mọi thú vị xuất hiện từ đây. 

## Điền vào chỗ trống

Thu thập thông tin từ các thiết bị của họ cho phép các tổ chức để ngày càng trở nên dữ liệu-driven, nhưng chỉ khi họ có thể đúng cách phân tích những gì họ thu thập. Edd Wilder-James, nhà chiến lược cho dự án TensorFlow học máy của Google và cựu phó chủ tịch chiến lược công nghệ tại Silicon Valley dữ liệu Khoa học, làm cho báo cáo vấn đề rõ ràng: "Trở ngại lớn nhất đối với sử dụng phân tích dữ liệu tiên tiến không phải là nền tảng kỹ năng hay công nghệ, nó đơn giản truy cập cũ sang dữ liệu" Sau khi vượt qua các rào cản kỹ thuật thu thập dữ liệu, tổ chức thường xuyên thất bại trong việc cung cấp các hệ thống có khả năng của việc sử dụng nó cho các lái xe kinh doanh phía trước. nghiên cứu của ông, được công bố trên Harvard Business Review quyết vấn đề trực tiếp. "Ôm dữ liệu như một lợi thế cạnh tranh là một điều cần thiết cho doanh nghiệp ngày nay, vậy tại sao nó khó khăn như vậy để có được quyền truy cập vào dữ liệu chúng tôi cần? "

Đầu tiên, chúng ta phải hiểu rằng nó không chỉ là dữ liệu máy chúng ta đang nói về. Một cảm biến có thể báo cáo động cơ đang chạy nóng, nhưng trừ khi hệ thống của bạn có thể kết hợp nhiệt độ đơn vị với khách hàng, hàng tồn kho, và các hồ sơ dịch vụ để kích hoạt một kế hoạch hành động thông báo có không có nhiều bạn có thể làm vượt đèn flash một số đèn cảnh báo hoặc tắt thiết bị. để mang lại giá trị thực tế, giải pháp của bạn phải kết nối và trao đổi dữ liệu với CRM, ERP của bạn, và hệ thống doanh nghiệp khác. Bây giờ hệ thống IOT của bạn có thể kích hoạt các luồng công việc chẳng hạn như thông báo nhân viên kỹ thuật chính xác và có phần thay thế đúng sẵn sàng, theo SLA giao cho rằng máy nói riêng và khách hàng. Thật không may, dữ liệu doanh nghiệp thường tồn tại trong silo riêng biệt không dễ dàng kết nối. Vì vậy, những gì có thể được thực hiện? trong khi thừa nhận rằng vài công ty "có sự sang trọng của việc xây dựng một cơ sở hạ tầng phù hợp từ đầu, "Wilder-James nài xin họ" tìm ra một cách để đạt được điều đó một cách gia tăng. "

Trở ngại LÀ CÁCH
IOT công nghiệp không chỉ là về kết nối máy tới các đám mây. Đó là kết nối máy của bạn để doanh nghiệp của bạn và tạo ra một hệ thống trung tâm thông tin tình báo. Đó là về sắp xếp các hoạt động và các đội nội bộ của bạn với dịch vụ sản phẩm của bạn và đem lại cho doanh nghiệp của bạn một lợi thế cạnh tranh riêng biệt. Điều này đòi hỏi một mở, thích nghi kiến ​​trúc hệ thống có khả năng kết hợp máy mới, kiểu dữ liệu, và các công cụ theo thời gian khi hệ thống của bạn tiến hóa. Tin tốt là bạn có thể bắt đầu nhỏ. "Nhìn xác định cơ hội có giá trị cao," Wilder-James khuyến cáo. "Phân tích nhu cầu kinh doanh của bạn, và chọn một vấn đề mà dữ liệu có thể cung cấp một lợi ích hữu hình, có lẽ trong việc tăng cường bán hàng hoặc tạo ra một phản ứng sự cố ưu tiên. Mỗi bước tiến bộ nên xây dựng hướng tới một nền tảng tích hợp cho dữ liệu doanh nghiệp của bạn." với treo thấp quả như cảnh báo các đội bán hàng của bạn khi một khách hàng đang chạy thiết bị của bạn tại 100 sử dụng% mỗi ngày, cho thấy một opportuni upsell chín ty, và dễ hiểu kịch bản bảo dưỡng dự phòng, IOT cung cấp động lực hoàn hảo cho doanh nghiệp của bạn chuyển.