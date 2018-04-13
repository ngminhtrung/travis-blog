---
id: 117
title: '[D3.js] Xuất ảnh từ chart ra định dạng SVG, PNG, JPG và PDF'
date: 2017-12-19
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - D3.js
  - Data Visualization
  - job
  - data join
---

Sau một ngày tìm hiểu về cách xuất chart (vẽ bởi d3.js) sang file ảnh dạng `.svg`, `.jpg`, `.png` và file `.pdf`, tuy chưa thành công nhưng tôi note lại vài điểm dưới đây để sau này tra cứu lại. Sau đó phải chuyển sang một nhiệm vụ khác mới được phân công!

### D3.js là gì? Chart được vẽ ra sao?
---

- D3.js (viết tắt của Data-Drive Document) là một thư viện JavaScript để vẽ chart thông qua việc thêm, thay đổi số lượng cũng như thuộc tính của các DOM trong HTML. Tìm hiểu về d3.js ở [đây](https://d3js.org/).
- Chart mà D3.js được thể hiện trong thẻ `svg`. SVG viết tắt bởi Scalable Vector Graphic, một định dạng ảnh vector có cấu trúc dữ liệu kiểu XML, phục vụ cho việc tạo đồ họa hai chiều, có hỗ trợ việc tương tác cũng như làm hoạt hình. Tìm hiểu nhanh về svg ở đây: [Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics), [Sử dụng file SVG cho Website](https://kipalog.com/posts/Su-dung-file-SVG-cho-website). Chi tiết nhất là [W3C Recommendation on SVG 1.1](https://www.w3.org/TR/SVG/)
- Một ví dụ chart được vẽ bằng D3.js? Xem [Biểu đồ tỷ lệ thất nghiệm ở Việt Nam năm 2017](https://ngminhtrung.github.io/projects/learning/d3/vietnam/vn-unemployment-2016/)

![alt text][image01]{: .center-image }

### Vẽ được rồi còn cần làm gì nữa?
--- 
Mặc dù chart đã hiện được trên web, nhưng có một nhu cầu lớn đó là xuất ra file ảnh để chèn vào báo cáo. Những định dạng cần được hỗ trợ là:
- svg (file ảnh vector không vỡ khi zoom in)
- jpg (file ảnh nén)
- png
- pdf (một định dạng thông dụng trong giới văn phòng của Adobe)

Về tính năng, ngoài việc xuất ảnh, người dùng nên có lựa chọn về chất lượng của ảnh (liên quan đến resolution, kích thước dài rộng).

### Cách thực hiện trên "client-side"?
---
Tham khảo từ:
-   Saving Browser-based SVGs as Images. Tác giả: Eric Shull. Link [here](https://spin.atomicobject.com/2014/01/21/convert-svg-to-png/)
- Tính năng export của thư viện *Billboard.js*. Link [here](https://naver.github.io/billboard.js/)

Hướng dưới đây dành cho việc thực hiện trên **client side**.

1. Lấy nội dung của SVG theo định dạng XML.
    - Lấy nội dung của chart từ HTML `node` bé nhất chứa chart đấy (tức là trùm ra ngoài thẻ `svg`). 
    - Do phần styling của chart nhiều khi được đặt ở 1 file CSS (external CSS), vì vậy nếu chỉ copy nội dung của `svg` thì chưa đủ.
    - Do `node` là dạng cấu trúc hình cây, vì vậy cần làm phẳng nó thành dạng chuỗi thanh định dạng XML thông qua các methods `XMLSerializer()` và `serializeToString()`

2. Lấy phần **style** của chart thông qua các CSS rules trong object `styleSheets` của `document` (chính là `windows`).
    - Cần lọc riêng *CSS texts* trong *CSS rules*
    - Cần biến **CSS texts** từ dạng mảng (array) thành 1 chuỗi duy nhất.
    
3. Gộp phần nội dung của chart và style thành 1 object XML, bổ sung các attributes của XML như `namespace`, `version`, `xmln`, `xmlns:xlink`. Tạm gọi object này là `dataStr`.

4. Encode toàn bộ đoạn trên ra dạng base-64. 

5. Tạo data URI với theo định dạng: `data:image/svg+xml;base64,${b64EncodeUnicode(dataStr)}`

6. Tạo 1 image, đặt source của nó là `data URI` trên

7. Tạo 1 image trên `canvas` với định dạng PNG, source là `data URI`.

8. Tạo 1 link với thuộc tính `href` trỏ đến PNG data URI.

8. Thêm link trên vào DOM, chạy method `click` trên link đó.

### Nhược điểm của chạy trên "client-side?? Ko hỗ trợ IE, Safari 
---
- Không hỗ trợ *Internet Explorer* (bất kỳ phiên bản nào) do Microsoft không hỗ trợ `objectForeign`. Xem thông báo của Micrsoft ở bài ["2.1.24 [SVG11] Section 23.3, The 'foreignObject' element"](https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx)

Ngoài ra việc chạy trên *Safari* cũng trục trặc tương tự. 

### Khắc phục bằng cách chạy trên server-side?
---
Khi xem tính năng export ảnh trên 1 thư viện lâu đời là [Highcharts](https://www.highcharts.com/) thì họ không dùng client-side mà chạy Phantom.JS trên server-side để tạo ảnh (chạy headless browswer, tạo chart, chụp ảnh màn hình) rồi trả về cho người dùng. Cách làm này sẽ khắc phục được hạn chế về trình duyệt nói trên. 

### Tóm tắt:
---
- Việc xuất ảnh từ chart của D3.js ra file ảnh có thể được thực hiện bằng 2 cách:
    - Trên client-side: bị lỗi với Internet Explorer và Safari.
    - Trên server-side: phải cài thêm thư viện của bên thứ 3. 

- Bài viết mới dừng ở lý thuyết, còn cần tự thử nghiệm và cập nhật trong tương lai.

### Tham khảo
---
1. CSS Style Sheets - CSS Object Model (CSSOM) - W3C Working Draft, 17 March 2016. Link [here](https://www.w3.org/TR/cssom-1/#css-style-sheets)
2. StyleSheet - Moizilla Developer. Link [here](https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet)
3. What does CDATA in XML mean? Link [here](https://stackoverflow.com/questions/2784183/what-does-cdata-in-xml-mean)

[image01]: https://ngminhtrung.github.io/images/PostIMG/2017-12-19-Export-SVG-PNG/image01.gif "Bar Chart D3.js"