---
id: 103
title: 'D3.js - Zoomable Treemap Bar Chart'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Treemap trông như thế nào?

Nó có dùng vào việc gì? Có gì hay?

Treemap dùng để biểu diễn dữ liệu dạng cây. Có nhiều cách để biểu diễn dữ liệu dạng cây, nhưng Treemap có ưu điểm là:
- tận dụng được không gian biểu diễn
- thể hiện được giá trị tương đối của từng nhánh trên tổng giá trị. Để nắm bắt được nhanh bản chất của dữ liệu, ưu điểm này của Treemap hơn hẳn so với những loại biểu diễn khác (như Circle Pack, hay Dendrogram, hay Network).

Cái tên Treemap nghe lạ vậy?

Treemap là kết hợp của từ "tree", ý nói dữ liệu, "map" là bản đồ, ý nói là dữ liệu được trải ra và vẽ như một bản đồ. 

Treemap được tạo ra chỉ để vẽ chart? Lịch sử của nó là gì?

Treemap (và thuật toán đằng sau nó) được hình thành từ năm 1990 bởi Ben Shneiderman (giáo sư tại University of Maryland). Mục đích của ông khi tạo treemap là để kiểm tra xem trong nhóm 14 người dùng chung 1 ổ cứng 80MB, thằng nào copy bậy bạ tốn bộ nhớ nhất. Chắc chắn là nếu thời đó có ổ 1TB như bây giờ thì Treemap đã không ra đời.

Thuật toán tạo Treemap là gì?

Là thuật toán để tính xem:
- nhét hình gì vào trong bản đồ? hình chữ nhật, hình tam giác, hình tròn? chốt là nhét hình chữ nhật.
- hình nhét vào có kích thước ra sao? cao và rộng thế nào? nhét ngang hay nhét dọc
- nhét theo chiều nào của dữ liệu? từ cao xuống thấp? từ dưới đi lên? chốt là nhét từ cấp cao nhất xuống thấp nhất.

Với D3.js, hiện tại Mike Bostock sử dụng thuật toán "squarified" (có lẽ bắt nguồn từ chữ "square"), cố gắng tạo các hình chữ nhật với tỷ lệ vàng, giúp cho treemap tạo ra khá dễ nhìn.