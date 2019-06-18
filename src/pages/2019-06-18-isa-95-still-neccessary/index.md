---
title: 'ISA-95 không lạc hậu, mà cần thiết cho nền sản xuất thông minh'
date: 2019-06-17
author: ngminhtrung
categories:
  - manufacturing
tags:
  - isa-95
  - factory
  - smart
  - manufacturing
  - '2019'
---

Lược dịch từ bài [ISA-95 Is Necessary for Smart Manufacturing](https://www.automationworld.com/isa-95-necessary-smart-manufacturing) của Michael Bachelor đăng trên AutomationWorld vào tháng 10 năm 2017. Michael Bachelor là chủ tịch của Bachelor Controls Inc., một thành viên được chứng nhận bởi Control System Integrators Association (CSIA).

=====

[ISA-95](https://www.isa.org/isa95/), một mô hình tổ chức thông tin (`information model`) được dùng để định nghĩa cách thức "giao tiếp" giữa phần điều khiển và các chức năng khác của hệ thống sẽ không bị lỗi thời theo thời gian như các loại công nghệ khác. Nó là một cách thức giúp việc tổ chức thông tin và khiến cho hệ thống thông tin thông minh hơn. 

Việc hình thành IIoT (Industrial Internet of Things) sẽ ảnh hưởng như thế nào đến dữ liệu thuộc tầng máy móc (plant floor)? Mục đích của IIoT là để giúp việc sản xuất thông minh hơn. Và có một niềm tin trôi nổi đâu đó rằng IIoT xuất hiện sẽ làm cào bằng "mô hình tổ chức thông tin theo kiểu ISA-95" (*ISA-95 information model*), đồng nghĩa với việc tiêu chuẩn này trở thành lỗi thời. Qua bài viết này, tôi muốn đưa ra một góc nhìn khác, kèm những lý lẽ của mình.

`Information model` không phải là `internetworking infrastructure`, cũng không là `protocol`. Thông tin là thứ vật liệu cần phải được chế biến, được chuyển đi, và xử lý. *Internetworking infrastructure* và *protocol* là những phương tiện giúp chúng ta vận chuyển *vật liệu thông tin* nói trên. Những khái niệm này không hề giống nhau, mà chúng hỗ trợ cho nhau.

Về *network infrastructure*, đúng là với nhiệm vụ kết nối phần *top floor* với *plant floor*, nó đã bị "*làm phẳng*" so với quá khứ. Những chuẩn giao tiếp (*protocol*) như Foundation Fieldbus, Modbus, Profibus, DeviceNet, ControlNet và rất nhiều chuẩn khác được tạo ra để kết nối các thiết bị cũng như đem phần I/O của thiết bị làm việc với bộ điều khiển (*controller*). Do đây không phải những chuẩn mở nên để bắt các chuẩn này nói chuyện với nhau rất mệt mỏi. Để trao đổi dữ liệu với một *business system* cần thêm vài tầng giao tiếp vật lý (*physical communication layers*) giữa I/O và business systems. Còn hiện tại (khi có IIoT), chúng ta chỉ có tầng *control I/O* và tầng *enterprise resource planning (ERP)* trong mạng Ethernet. Theo nghĩa đó, việc giao tiếp đã bị làm phẳng. Nhưng tôi muốn nhấn mạnh lần nữa là việc này không liên quan đến luồng thông tin truyền qua phần hạ tầng. 

Nếu muốn nói về các tính năng của một hệ thống điều hành sản xuất, ta sẽ có những gì? Đó là:
- *production control* (quản lý sản xuất), 
- *product cost accounting* (quản lý chi phí sản phẩm),
- *order processing* (xử lý đơn hàng), 
- *production scheduling* (lập lịch sản xuất), 
- *product inventory control* (quản lý tồn kho), 
- *quality assurance and maintenance management* (quản lý chất lượng và bảo trì) 

Tất cả những tính năng trên đều gắn với thông tin nào đó. Chẳng có tính năng nào cũng như dữ liệu gắn với nó có mối liên hệ với protocol, system hoặc network infrastructure. Người ta tạo ra ISA-95 để cải thiện tính rõ ràng, cấu trúc, cũng như sự đồng bộ của thông tin sản xuất, nó độc lập với việc triển khai bất kể công nghệ cũ/ mới nào. ISA-95 là thứ không phụ thuộc vào công nghệ (!!!)

ISA-95 là về các hoạt động sản xuất kinh doanh. Nó không bị lỗi thời như công nghệ. Nó sẽ chỉ lỗi thời khi những thứ như kế toán, sản xuất, bảo trì, chất lượng, và nhà kho trở nên lỗi thời. *Độ trưởng thành* của *information model* đồng nghĩa với *tính hiệu quả* qua thời gian. Hàng thập kỷ kinh nghiệp trong điều hànhh sản xuất - kinh doanh đã giúp cải thiện cả hai (độ trưởng thành & tính hiệu quả). Không yếu tố nào thay đổi nhanh hơn cái còn lại, kết quả là ISA-95 được hưởng lợi từ hơn 2 thập kỷ làm việc. Vài người sai lầm cho rằng ISA-95 đang trở nên già cỗi như thứ xảy đến với mọi công nghệ khác, cần phải bỏ nó đi thay bằng những thứ mới hơn. Nhưng điều này chỉ đúng nếu ISA-95 là công nghệ, trong khi thực tế, thì không. ISA là về chuẩn của hoạt động sản xuất kinh doanh, nó có lịch sử phát triển phía sau, cũng như cả những nỗ lực trong hiện tại để cải tiến. Nếu ISA-95 chỉ là thứ gì mới toanh vừa được tạo ra thì nó chắc chắn chưa đủ chín muồi để đưa vào cuộc sống.

Khi nhìn về những công nghệ mới xuất hiện đang tạo ra những thay đổi lớn, tôi thấy có vai trò của Big Data (dữ liệu lớn). Vài người cho rằng Big Data sẽ ảnh hưởng đến `information model`, tức là ảnh hưởng tới ISA-95. Dẫu vậy, dù Big Data có thể đóng góp vào việc hoà trộn dữ liệu từ những nguồn bên ngoài tổ chức của bạn, thì nó khong loại đi nhu cầu với thông tin đang có. Hoạt động sản xuất kinh doanh vẫn đang ở đó. ISA-95 vẫn đang tập trung vào việc mô hình hoá tổ chức thông tin. Big Data vừa là một chủ đề khác, vừa mang tính bổ trợ.

ISA-95 đã được xây dựng bởi nỗ lực của những chuyên gia đến từ end user, từ software vendor và các integrator organizations. Họ cùng nhau cải thiện các tiêu chuẩn đang có lên cao hết sức có thể, và tạo ra các tiêu chuẩn mới khi cần. Tiêu chuẩn chứ không phải luật. Tiêu chuẩn là thứ mang tính định hướng cho các nhà sản xuất, họ có thể chọn để dùng nếu thấy tấm áo vừa với mình. Vì vậy, sẽ cần suy nghĩ rất cẩn thận trước khi quẳng đi nỗ lực của rất nhiều chuyên gia công nghiệp khi tạo ra ISA-95.

Một khi hoạt động điều hành sản xuất kinh doanh đã trưởng thành, thì việc có một tiêu chuẩn công nghiệp sẽ giúp các nhà cung cấp phần mềm dễ dàng đồng bộ với 1 mô hình thông tin nhất định. Nếu nhà sản xuất muốn cải tiến `information model` xuyên suốt doanh nghiệp của họ, họ có thể chọn công việc tiêu chuẩn hoá theo ISA-95 cùng các phần mềm đã được công nhận phù hợp với chuẩn này. Nếu mọi hệ thống sử dụng bên trong nhà máy được thiết kế tuân theo ISA-95, thì việc trao đổi thông tin sẽ hiệu quả và rõ ràng hơn. Còn nếu nhà máy bỏ qua ISA-95, có lẽ họ sẽ phải tự tạo ra một chuẩn mởi, hoặc chấp nhận sống với các dữ liệu riêng lẻ thiếu kết nối. ISA-95 được sinh ra để cung cấp cách làm thông minh hơn (việc thiếu kết nối).

## Tham khảo sau

- [Information model](https://en.wikipedia.org/wiki/Information_model)
- [Shop floor](https://en.wikipedia.org/wiki/Shop_floor)
- [From shop floor to top floor: making the invisible visible](https://www.infosys.com/engineering-services/white-papers/Documents/factory-visibility.pdf)
- [Big Data, from the Executive Suite to the Factory Floor](https://www.industryweek.com/technology/big-data-executive-suite-factory-floor)