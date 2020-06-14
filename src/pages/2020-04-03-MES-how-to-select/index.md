---
title: 'Làm sao để lựa chọn giải pháp MES cho doanh nghiệp bạn'
date: 2020-04-03
author: ngminhtrung
categories:
  - MES
tags:
  - MES
  - translation
  - best_practices
  - programming
  - '2020'
---

Series bài dịch về [MES - Manufacturing Execution System](https://en.wikipedia.org/wiki/Manufacturing_execution_system) trong quá trình tìm hiểu về hệ thống này.

- Bài 1: [MES - Những bài học để thành công](https://travisnguyen.net/MES/2019/05/09/mes-failure-success/)
- Bài 2: [Vai trò của Center OF Excellence trong việc hiện thực hoá chuyển đổi hoạt động sản xuất](https://travisnguyen.net/MES/2019/05/10/mes-failure-success-2/)
- Bài 3: "Làm sao để lựa chọn giải pháp MES cho doanh nghiệp bạn", lược dịch từ bài gốc [Now’s the time to get your MES selection going](https://blog.criticalmanufacturing.com/time-to-get-your-mes-selection-going/) của Francisco Almada Lobo đăng trên Critical Manufacturing ngày 17.03.2020. Thời điểm đăng bài là lúc dịch Covid đang lan mạnh và gây hoang mang trên toàn thế giới.

===

Xin chia sẻ với bạn đọc rằng, quá trình lựa chọn giải pháp MES cho doanh nghiệp mình luôn mất rất nhiều thời gian. Quá trình này bao gồm các bước lớn sau:
1. Xây dựng "business case" (trường hợp kinh doanh)
2. Thiết lập các yêu cầu chi tiết cho MES (MES requirements)
3. Duyệt qua các nhà cung cấp MES trên thị trường
4. Chọn lựa các nhà cung cấp MES phù hợp
5. Yêu cầu PoC, làm thầu và đưa ra lựa chọn cuối cùng

Vậy trong mỗi bước lớn cần phải làm những gì?

# Bước 1: Xây dựng "business case" (trường hợp kinh doanh)

Các chủ doanh nghiệp cần phân tích những lợi ích thu được khi đầu tư MES cho hoạt động sản xuất của doanh nghiệp mình. 

Có 4 nhóm `lợi ích` cần quan tâm:

| Nhóm lợi ích | Tên gọi | Mô tả |
|------|---------|-------|
| 1 | Productivity (Năng suất lao động)| Cải tiến Production Volume, Cost, WIP, Cycle Time|
| 2 | Quality (Chất lượng)| Cải tiến Production Yield, Production Performance, OTD, và Customer Production Returns |
| 3 | Compliance (Sự tuân thủ)| đảm bảo tính tuân thủ quy trình và điều lệ, cũng như Truy xuất nguồn gốc (Traceability) |
| 4 | Agility (Thích ứng nhanh)| cải tiến về thời gian và chi phí khi đưa vào sản phẩm mới / cải tiến một sản phẩm hoặc quy trình |

Ngoài `lợi ích` thu lại được, các `chi phí` khác cũng phát sinh khi đưa MES vào. 

| Nhóm chi phí phát sinh (do MES) | Tên gọi | Mô tả | Loại phí |
|------|---------|-------|----|
| 1 | Hardware Depreciation | Khấu hao phần cứng | recurring cost|
| 2 | Software Licenses| Phí bản quyèn phần mềm | one-time cost |
| 3 | Software Maintenance| Bảo dưỡng bào trì phần mềm | recurring cost |
| 4 | Implementation Service| Triển khai giải pháp | one-time cost |
| 5 | Internal Employees' Time| Công sức của chính nhân viên mình | one-time cost|
| 6 | Operational Cost| Chi phí vận hành, liên quan đến đào tạo, vận hành, quản trị hệ thống | recurring cost |

`Chi phí` thứ 7, "Opportunity Cost": Nếu doanh nghiệp bạn không đầu tư vào MES, bạn nên làm gì với nguồn vốn đầu tư hiện tại để đạt được các lợi ích tương tự (4 lợi ích nói bên trên)? Thường thì chi phí này = 0, hoặc quá nhỏ nên bỏ qua, bởi rất khó để tìm được các giải pháp khác giúp thu lại các lợi ích tương đương với việc đầu tư vào MES.

# Bước 2: Thiết lập các yêu cầu chi tiết cho MES (MES requirements)

Sớm thiết lập các yêu cầu chi tiết cho MES là việc vô cùng quan trọng, bởi nó sẽ là nền tảng cho đánh giá và lựa chọn các nhà cung cấp MES, cũng như khi triển khai MES sau này. 

Những yêu cầu này có thể chia ra làm 3 nhóm chính:

## Nhóm 1: Functional requirement - Tính năng của MES

Những tính năng cần có của giải pháp MES. Lưu ý là các tính năng này phải phủ hết mọi quy trình vật lý cũng như quy trình nghiệp vụ:
- Ví dụ quy trình vật lý: sản xuất, logistics, v.v
- Ví dụ quy trình nghiệp vụ: sản xuất, kỹ thuật, bảo trì bảo dưỡng, chất lượng, v.v

Tham khảo "[MESA International model](http://www.mesa.org/en/modelstrategicinitiatives/MESAModel.asp)" về việc định nghĩa 11 module của MES.

## Nhóm 2: Techincal requirement - Đặc điểm kỹ thuật

Liên quan đến việc phân tích về:
- Technology (Công nghệ)
- Obssolescence Risk (Rủi ro lỗi thời)
- Integration Capability (Khả năng tích hợp)
- Scability (Tính mở rộng về volum dữ liệu)
- Availability (Tính sẵn sàng)
- Latency (Độ trễ)
- Extensibility (Tính mở rộng về mặt tích năng)
- User Interface  Ergonomics (Tính dễ dùng)

## Nhóm 3: Business requirement - Đặc điểm thương mại

Liên quan đến việc phân tích về:
- Vendor size (Công nghệ)
- Geographical presence (Hiện diện địa lý)
- Partner network (Mạng lưới partner)
- Financial situation (Tình trạng tài chính)
- Product references (Tham chiếu các dự án đã làm)
- Product roadmap (Lộ trình phát triển sản phẩm)
- Level of training offered (Mức độ hướng dẫn sử dụng)
- The quality of the documentation (Chất lượng tài liệu đi kèm), bao gồm: user manuals, how-to guides, v.v.
- Quy trình và năng lực hỗ trợ người dùng
- Yêu cầu khác về hợp đồng

# Bước 3: Duyệt qua các nhà cung cấp MES trên thị trường

Một khi bước 2 nói trên đã xong, các doanh nghiệp nên duyệt qua một loạt các nhà cung cấp giải pháp MES trên thị trường trước khi đi sâu phân tích từng nhà cung cấp. Các cách để tìm các nhà cung cấp MES là:
- qua tìm kiếm trên Internet
- hỏi chuyên gia
- sử dụng các công cụ phân tích thị trường của Gartner, IDC Insights, ARC Advisory, LNS Research, MESA.org, v.v

Danh sách chỉ nên dừng lại ở 4 - 6 nhà cung cấp tiềm năng (nhiều quá lại thành rối).

# Bước 4: Chọn lựa các nhà cung cấp MES phù hợp

Sau khi đã có một danh sách các nhà cung cấp MES tiềm năng, doanh nghiệp nên gửi đến từng nhà cung cấp bản RFI (Request For Information) chứa danh mục các yêu cầu về MES của mình.

Những cách làm hay có thể liệt kê gồm:
- *evaluation matrix* với các trọng số khác nhau của yêu cầu: nhằm tính điểm & so sánh giữa các nhà cung cấp.
- *product demo*: yêu cầu nhà cung cấp demo sản phẩm của họ, nhất là minh hoạt những tình huống phức tạp có liên quan đến hoạt động sản xuất của doanh nghiệp.
- *customer references*: tham khảo những khách hàng đang dùng giải pháp MES của nhà cung cấp.

# Bước 5: Yêu cầu PoC, làm thầu và đưa ra lựa chọn cuối cùng

Tại bước này, khoảng 2 nhà cung cấp tiềm năng cần tiến hành PoC (proof-of-concept) giải pháp của họ. Việc PoC đem lại những lợi ích sau:
- giúp doanh nghiệp đưa ra được đánh giá chi tiết hơn
- người dùng MES sau này qua PoC sẽ có cơ hội trải nghiệm xem giải pháp MES có "thuận tay" với mình hay không. 

Song song với nhóm PoC đang làm việc mình, thì nhóm làm hợp đồng có thể tiến hành thương lượng các điều khoản hợp đồng, vấn đề tài chính, khung thời gian dự án, v.v. 

# Kết luận

Năm (5) bước trên sẽ giúp doanh nghiệp hình dung tổng thể cần phải làm gì khi lựa chọn giải pháp MES. Trong thời điểm dịch bệnh trên toàn thế giới đầu năm 2020, các bước trên đều có thể làm từ xa, giúp doanh nghiệp vẫn có thể tiến hành dự án đầu tư MES mà không bị bó buộc bởi các buổi trao đổi tận nơi.

Trung Nguyễn (Travis)
Sales Engineer/ Solution Consultant | Manufacturing domain