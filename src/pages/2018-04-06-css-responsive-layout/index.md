---
title: 'Layout - Làm thế nào để lên khung layout, và hỗ trợ responsive'
date: 2018-04-06
author: ngminhtrung
categories:
 - css
tags:
 - layout
 - responsive
 - flexbox
 - google
 - fluid
 - mobile-first
---

**Day 38**:

### Bài toán: 
Tự học ReactJS bằng cách làm one-page app đơn giản ([ví dụ](https://github.com/ngminhtrung/react-draw-spirograph)), vấn đề mình đau đầu nhất là (1) lên layout, và (2) làm style cho app. Chưa đề cập đến vụ style, riêng cái layout chỉnh mãi mà các thẻ div, các element không thẳng với nhau theo như bản mockup ban đầu. Mình cũng từng đi 1 lượt các bài tập [CSS của W3School](https://www.w3schools.com/css/) nhưng khi bảo tự làm từ đầu 1 cái cho bản thân thì cảm thấy ngợp.

Cái mình học trên W3School chỉ như là nhìn thấy cây, mà không nhìn thấy rừng. Được chỉ cách chỉnh từng phần tử con, nhưng không được chỉ cách lắp ghép các phần tử con thành một ngôi nhà theo tưởng tượng. *Mình muốn biết về cách làm, về workflow, về cách tư duy khi đụng vào layout một cách tổng thể, lên layout như thế nào, sao bắt nó hỗ trợ responsive*.  Vậy phải làm thế nào?

### Giải quyết: 

Khi hỏi cậu em, thì được chỉ 1 mẹo là: "**Hãy xử lý phần layout trước và chỉ layout mà thôi. Tô màu cho từng vùng, kiểm tra xem có vùng nào đè vào nhau, padding, margin, border, kích thước chuẩn chưa, khi chuyển sang mobile view thì có dịch chuyển như ý mình muốn hay không. Khi nào ngon lành phần khung, thì mới bắt đầu đi vào chi tiết**".  Lời khuyên này rất đúng, nó giúp ta làm đến đâu gọn đến đấy, cô lập từng vùng. Tránh việc phần khung chưa ổn, đã đi vào chi tiết, sau có khi mất công đập hết đi làm lại.  Đây đúng là 1 phần của workflow mà mình đang tìm. Tuy nhiên, nó vẫn chưa trả lời câu hỏi là làm thế nào để lên được layout.

Hôm nay đọc được mục Responsive Web Design của Goolge tại [đây](https://developers.google.com/web/fundamentals/design-and-ux/responsive/) , thấy đó là câu trả lời mình đang đi tìm. 

- Họ giải thích tại sao cần dùng thẻ `meta` ngay đầu file `html`, mối quan hệ giữa DIP (Device Independent Pixels) với Hardware Pixels. 
- Quan trọng hơn, họ nói về tư duy "start small" và 4 patterns để thiết kế layout. 

### Start small là gì?
- Là nghĩ và thiết kế layout dành cho mobile ngay từ đầu, thay vì nghĩ đến nó như 1 trang sẽ hiển thị trên màn hình máy tính.
- Việc phân bố layout là phải để tôn lên nội dung của website, chứ không phải vì kích thước thiết bị. 
- Sau đó, mở rộng bề ngang trình duyệt dần dần, từng cấp một. Tại mỗi cấp, nghĩ xem layout nên được bố trí lại như thế nào là phù hợp với content và user experience. Đặt break point cho cấp đó. 

Ưu điểm của việc này quá rõ ràng không còn gì phải bàn cãi. Trước đây mình toàn đi ngược, làm hết sức để layout cho màn hình rộng trông ưng ưng mắt. Nhưng sau đó mới lại test xem responsive ra sao, có khi hiện trên mobile không ngon, lại phải chỉnh lại từ đầu. Mà cứ chỉnh đi chỉnh lại một cách mù quáng.

### Patterns để làm layout là gì?

Hầu hết các patterns đề sử dụng `flexbox` làm công cụ chính để thực hiện ý đồ, bao gồm:

#### 1. Mostly Fluid

Không biết dịch là gì. Nó chỉ các khối trong layout cứ như các khối chất lỏng khác màu chảy trong 1 đường ống. Tùy vào độ rộng hẹp của đường ống hẹp thì các khối này xếp đè lên nhau một cách tự nhiên.

Cách này phù hợp với người mới bắt đầu như mình. Ảnh minh họa lấy từ bài của Google. 

![MostlyFluid](https://developers.google.com/web/fundamentals/design-and-ux/responsive/imgs/mostly-fluid.svg)

#### 2. Column drop

Chưa biết mô tả cách này ntn.

![ColumnDrop](https://developers.google.com/web/fundamentals/design-and-ux/responsive/imgs/column-drop.svg)

#### 3. Layout shifter

Cách này phải đảo component của layout (trái phải, trên dưới) tùy vào từng cấp độ rộng của browser. 

![LayoutShifter](https://developers.google.com/web/fundamentals/design-and-ux/responsive/imgs/column-drop.svg)

#### 4. Tiny tweaks

Chỉ có vài thay đổi nhỏ so với cách trên

#### 5. Off canvas

Cách này dùng khi cần có navigation bar đưa ra đưa vào tùy độ rộng của browser. Cách này là khó nhất.

![OffCanvas](https://developers.google.com/web/fundamentals/design-and-ux/responsive/imgs/off-canvas.svg)

### Kết luận

Vậy là hướng đi step by step đã có, rất logic, mà vẫn có tính "nghệ thuật", đủ để người mới học và làm theo, có được những layout đem lại behavior hợp lý. 

Với mình, việc layout đạt được tính responsive như ý muốn là một yêu cầu tối thiểu khi làm front-end, kể cả với người muốn chuyên về JavaScript. Style sao cho đẹp hơn, UX tốt hơn là vấn đề khác, đòi hỏi skill và kiến thức khác. 

ngminhtrung 06-04-2018
