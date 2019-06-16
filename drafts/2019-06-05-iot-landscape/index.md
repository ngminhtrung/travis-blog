---
title: 'IoT Landscape'
date: 2019-06-05
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

Tổng quan


Một **IoT system** cần có những đặc tính sau:
- Một: system này được thiết kế cho một hoặc một tập các ứng dụng nào đó, thay vì chỉ là một tập hợp của các thiết bị có kết nối Internet. 
- Hai: Các thiết bị vật lý trong *IoT system* rất linh động.
  - Trường hợp 1: phần lớn thiết bị là các cảm biến (sensor). 
  - Trường hợp 2: Các bộ truyền động (actuator) lại chiếm đa số. Trong cả hai trường hợp này, mục đích cuối vẫn là xử lý tín hiệu và dữ liệu dạng chuỗi thời gian (time-series data)

**Nguyên nhân (về mặt công nghệ) phía sau việc nở rộ quan tâm đến IoT**?  

1. Bởi sự xuất hiện và phổ biến của **microelectromechanical (MEMS) sensors**. Những *integrated accelerometers* (cảm biến gia tốc), *gyroscopes* (cảm biến con quay hồi chuyển), *chemical sensors* (cảm biến hoá học), và những dạng khác của cảm biến giờ đây đã co sẵn khắp mọi nơi. 

    Những cảm biến này đã đi vào đời sống thay vì chỉ quanh quẩn trong các phòng thí nghiệp bởi hai lý do:
    - vừa có chi phí thấp (low cost)
    - tiêu thụ ít điện năng (low power consumption)

    Các sensor trên đã giúp thúc đẩy và hỗ trợ IoT system trong việc xử lý tín hiệu.

2. Bởi VLSI digital và analog electronics có chi phí thấp.

**Lưu ý**: 
- Năng lược tiêu thụ thấp là yếu tố quan trọng trong việc tính tổng chi phí sở hữu của một IoT system. Để có mức tiêu hao năng lượng thấp cần có sự chú ý của mọi khâu (từ thiét kế phần cứng, thiết kế phần mềm, đếu thuật toán của ứng dụng).
- Bảo mật cũng là một yếu tố then chốt khi thiết kế và vận hành IoT system. Bảo mật không còn là một vấn đề riêng lẻ nữa, mà cần cả chú ý cả bảo mật phần cơ khí lẫn phần mềm. 

## Phân loại IoT system dựa trên mục đích 

- **Sensor network**: thường chỉ đóng vai trò thu thập dữ liệu từ các cảm biến
- **Alert system**: dữ liệu từ sensors được thu thập và phân tích. Nếu có ngưỡng giá trị nào bị vượt thì hệ thống sẽ có cảnh báo. 
- **Analysis system**: dữ liệu từ sensor được thu thập và phân tích. Kết quả phân tích được tự động tổng hợp vào báo cáo theo giờ, theo ngày, v.v. 
- **Reactive system**: kết quả phân tích từ dữ liệu sensor có thể khởi động bộ truyền động nào đó.
- **Control system**: Dữ liệu từ sensor được đẩy vào các tính toán có thuật toán điều khiển, output của tính toán này là input cho việc điều khiển bộ truyền động.

## Phân loại các chức năng trong IoT system

- **Event latency**:  Độ trễ từ thời điểm sự kiện xảy ra cho đến khi tín hiệu truyền đến đích có thể không quan trọng với những chương trình xử lý theo batch, nhưng trở thành vấn đề khi cần phân tích online.
- **Event throughput**: Số lượng sự kiện được ghi nhận, truyền tải, và xủ lý chia cho 1 đơn vị thời gian. Giá trị này phụ thuộc vào throughput của các nodes, network bandwidth, và cloud throughput.
- **Event loss rate** và **buffer capacity**: Nếu không thiết lập ngưỡng tối đa cho số lượng sự kiện được tạo ra, môi trường có thể hình thành số lượng sự kiện trong một khoảng thời gian nhiều hơn khả năng của hệ thống. Event loss rate captures the desired capability, while buffer capacity is a more pragmatic requirement that can be directly tied to component capabilities.
- **Service latency** & **throughput**: Ultimately, events will be processed by services. We can also specify the latency and throughput for services.
- **Reliability** & **availability**: Since IoT systems are distributed, reliability is more likely to be specifed over parts of the network rather than reliability of the complete system. Availability is commonly used to describe distributed systems.
- **Service lifetime**: IoT systems are often expected to have longer lifetimes than we expect for PC systems. The lifetime of the system or a subset of the system may be
considerably longer than that of a component, particularly if the system uses redundant sensors and other components.