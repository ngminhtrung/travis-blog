---
id: 131
title: 'Phân vân với readable code'
date: 2018-01-28
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - code
  - readable
  - clean
s---

Cảm giác khi đọc code của người khác không phải lúc nào cũng đem lại cảm giác dễ chịu. Trừ những lúc khâm phục ra, thì còn lại chủ yếu là vò đầu bứt tai chửi thề . Từ nỗi khổ của kẻ đi sau, tôi lúc nào cũng muốn mình viết ra những đoạn code dễ hiểu, dễ đọc nhất, vừa giúp cho mình của chính 1 tuần 1 tháng sau, vừa giúp cho bạn nào sau này phải maintain code của mình. Nhưng phải làm thế nào? Để trả lời cho câu này, tôi nhớ lại một vài thứ đọng lại đợt đọc 3 chương đầu của đọc quyển Clean Code là:
- đặt tên biến có ý nghĩa
- chia code thành nhiều function 
- hạn chế comment

Đây là ví dụ của một đoạn code JavaScript viết ngay gần đây, mục đích là vẽ đồ thị hình radar sử dụng D3.js:

```js
// Tạo các đường đồng mức
createLevelLines(param1, param2, Lines);
// Thêm vào text cho từng đường đồng mức
insertLevelText(param1, param2, Text);
// Tạo các trục 
createAxes(param1, param2, Axes);
// Tính tọa độ các điểm
const dotsList = calculateDotsCoordinates(params1, params2);
// Vẽ và tô màu các polygons
createAndPaintPolygons(param1, param2, dotsList, Polygons);
// Tạo và tô màu các điểm
createAndPaintDots(param1, param2, Dots)
```

Đoạn viết gốc dài hơn 250 dòng theo đúng flow nói trên. Nếu là người làm chuyên D3.js sẽ không thấy mấy vấn đề khi đọc 250 dòng kia. Nhưng vì nghe theo lời của Robert Cecil Martin (tác giả của Clean Code), tôi cứ thử :
  - tách các phần nhỏ ra thành các functions, 
  - khai báo tên function theo chức năng

với mong muốn rằng những người sau này nếu chưa biết nhiều sẽ hiểu ý đồ của người đi trước. 

Tuy vậy, tự tôi có một vài vấn đề với vụ này:
1. Không ai trong team code như vậy, và mọi người cũng không cho việc viết code kiểu kia nó sẽ dễ hiểu hơn. Chưa bàn chuyện ai đúng ai sai, việc mình khác người đem đến cảm giác không thoải mái (dù không nghiêm trọng).
2. Quản lý scope và số lượng tham số truyền vào trong từng function trở nên phức tạp. 
- Về *scope*, tự dưng phải để tâm bởi các variables không còn được đặt trong cùng 1 code block nữa, chúng rải rác trong các functions, mà vì 1 vài lý do thẩm mĩ, tôi lại đặt phần khai báo function ra ngoài code block ban đầu. 
- Về *tham số truyền vào*, số lượng tham số truyền vào trong code thực tế dài gấp đôi so với ví dụ trên. Lúc gọi hàm đã vài lần truyền nhầm thứ tự, hoặc thiếu tham số so với phần khai báo hàm, cứ phải kéo chuột lên xuống để đối chiếu (do vị trí khai báo hàm và gọi hàm cách xa nhau).

Có lúc muốn gọi 
```
createLevelLines();
```
thay vì
```
createLevelLines(param1, param2, Lines);
```
nhưng chưa tìm ra cách nào hiệu quả. 

Đến hôm nay đọc được bài ["Cách hiệu quả và đơn giản nhất để viết code dễ hiểu"](https://dev.to/girish3/most-effective-and-simplest-way-to-write-readable-code-dph) trên *dev.to* thì tác giả cũng nói về những thứ tương tự. Dưới đây là 2 hình minh họa của tác giả bài kia: Code gốc và sau khi được viết lại.

Phiên bản gốc:

Phiên bản viết lại (cải tiến):

Vấn đề chưa dừng ở code lẫn phần viết của tác giả, mà nằm ở phần comment bên dưới. Không có thời gian phân tích xem người bình luận hợp lý hay chưa, chỉ trích lại một ý kiến phản đối. Lúc này chưa hiểu, hy vọng sau này va vấp nhiều hơn sẽ hiểu.

> Personally, I do not like the kind of method in your improved version. They neither take arguments nor do they produce values. This means they rely on state set by someone else and they produce side effects that others (might) rely on. In the initial version it is easier to reason why things are ordered as they are, because I can see which usage of a variable depends on which write to this variable. However, I do support the extraction of methods to give them a proper name, but with two additions:
> - Make (all of!) the method's dependencies explicit (parameters)
> - Produce as less as possible side effects (produce a single value and return it)
>
> Let's not argue about procedural programming style, where avoiding side effects is not always easy or even possible. But there are a lot of occasions where following these principles leads to code which is easier to understand and to reason about. That is because from a method's call site, I can not only see what it is intended to do (=method name) but also what it needs to do this (=parameters) and what is the result of doing it (=return value).
