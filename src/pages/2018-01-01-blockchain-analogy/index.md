---
id: 120
title: '[Tìm hiểu về Blockchain] Bài 01 - Ví dụ siêu đơn giản để giải thích về bitcoin và blockchain'
date: 2018-01-01
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - blockchain
tags:
  - blockchain
  - bitcoin
  - crytocurrency
  - crytography
---

Tôi không định đầu tư bitcoin. Tôi chỉ muốn biết "*blockchain là gì?*", "*tại sao nó lại ầm ĩ như thế trên thế giới và Việt Nam?*", "*liệu có thể thông qua blockchain để tìm hiểu về Khoa học Máy tính hay không*?". Tôi muốn hiểu, muốn trình bày lại về blockchain bằng cách giải thích đời thường. Đây sẽ là bài đầu tiên, thứ tự hoàn toàn ngẫu nhiên, về hành trình tìm hiểu của cá nhân tôi. Do vừa đọc vừa viết, tôi không rõ các chủ đề sắp tới sẽ là gì, viết vào thời điểm nào. Trong đầu ít nhất đang nghĩ đến các câu hỏi sau:
- Mỗi khối block chứa gì?
- Cách để mô tả khối block và chuỗi block đơn giản nhất thông qua JavaScript
- Hàm băm là gì? tính chất? lý do?
- Ví dụ cụ thể nhất (trong khả năng) về ứng dụng của blockchain ngoài tiền ảo
- Mọi người đang nói những chủ đề gì trong Group Blockchain Developer Việt Nam
- Ở Việt Nam có những công ty nào nghiên cứu blockchain rồi? ứng dụng ra sao?
- Những ý kiến phủ nhận tương lai của blockchain?

Mục tiêu là trả lời các câu hỏi trên ngắn gọn, dễ hiểu (cho người Việt).

---
Lưu ý: Bài này hoàn toàn lấy ý tưởng từ [A Super-Simple Guide To Bitcoin And The Blockchain](https://dev.to/jordanirabor/a-super-simple-way-to-understand-bitcoin-and-the-blockchain-cg6)

Hãy tưởng tượng nhóm *freeCodeCamp Hà Nội* gồm Đại, Khánh, Tâm, Thắng, Trung, và Tuyến là 6 bạn học sinh của trường tiểu học Thăng Long. Các bạn này chơi trò đổi *bút chì* lấy *bút mực*, hoặc đổi lấy *thước kẻ* hoặc *cục tẩy*, hoặc đơn giản là đổi lấy *tiền*. Việc đổi chác này hoàn toàn dựa trên sự đồng thuận giữa 2 bạn tại thời điểm diễn ra *giao dịch*. Chỉ có 1 điều không hề thay đổi, đó là mỗi chiếc bút chì được coi là 1 *tài sản* (an asset).

![alt text][image01]{: .center-image }

Lúc đầu, cho mỗi lần đổi chác (ví dụ, Trung muốn đưa cho Tâm 3 chiếc bút chì để đổi lại 1 thứ gì đó), Trung và Tâm sẽ cùng nhau đi gặp cô giáo chủ nhiệm (cô giáo Thảo), nhờ cô ghi lại giao dịch này trong cuốn sổ ghi đầu bài của lớp. Cô Thảo sẽ ghi chép lại mọi đổi chác kiểu này để tránh mọi tranh chấp hay cãi vã của bọn học sinh trong tương lai. 

Trong cuộc đổi chác giữa Trung và Tâm, cô Thảo phải đảm bảo rằng Trung thực sự có 3 chiếc bút chì để đưa cho Tâm. Ngay khi cô Thảo xác nhận điều này, cô phải cập nhật ngay vào sổ ghi đầu bảo, đại ý là kể từ lúc này, trò Trung có ít hơn 3 chiếc bút chì, trò Tâm có thêm 3. 

Mặc dù cô Thảo đã vô cùng tận tâm, cô vẫn là con người và không phải lúc nào cũng chính xác; đôi khi vì quá bận bịu với công việc của trường, cô không thể tập trung vào mấy phi vụ của đám học sinh, khiến cho cô mắc vài "lỗi đánh máy" trong quyển sổ kia. 

Hậu quả? Một ngày hội 6 đứa kia chịu không nổi cô Thảo, quyết định loại cô ra khỏi quy trình (tại cô vừa hay "đánh máy sai", lại còn chậm), bọn chúng sẽ tự thiết lập cơ chế giao dịch riêng. 

Cơ chế của bọn quỷ này là gì? Đầu tiên là chúng không cần người trung gian (như cô Thảo) để kiểm soát các giao dịch. Chúng tuân theo quy tắc sau:
- Khi bất kỳ 2 đứa nào muốn đổi chác bút chì, chúng nó sẽ hét lên thông báo với toàn bộ 4 đứa còn lại. Lũ 4 đứa kia sẽ nhanh chóng xác nhận là thằng Trung có đủ bút chì để giao cho thằng Tâm.
- Ngay khi quá trình xác nhận hoàn thành, mọi đứa trẻ sẽ phải ghi chép lại giao dịch vào quyển sổ của riêng nó (không còn 1 quyển sổ trung tâm nữa), giao dịch được chấp thuận. Bằng cách này, mọi giao dịch sẽ luôn được đảm bảo và chính xác. 
- Cuối cùng, với những đứa lao động "cực nhọc" để giúp xác minh giao dịch, thì nhóm các ông bố bà mẹ sẽ cùng nhau trao tặng 1 số bút chì nào đó để thưởng cho chúng. 

Ý tưởng trên không tệ chút nào. Cách thức đấy sẽ giúp loại bỏ cơ chế trung gian. Mọi giao dịch sẽ được đảm bảo bởi mỗi đứa trẻ đều có quyển sổ ghi chép toàn bộ giao dịch của cả nhóm, quyển sổ luôn được cập nhật mỗi khi có đổi chác của bất kỳ ai trong nhóm. Phần hay nhất là đứa nào hăng hái tham gia xác minh giao dịch sẽ có thưởng. 

Vậy đấy, hóa ra ý tưởng trên đã tồn tại, và nó được gọi là *blockchain*. Ví dụ trên đơn thuần chỉ là cách để giúp chúng ta hiểu về *bitcoin* và *blockchain* mà không phải đi quá sâu vào các chi tiết kỹ thuật. Thử đối chiếu nhé:
- Những chiếc bút chì chính là *bitcoin* trong hệ thống *blockchain*. Một *bitcoin* là  1 đơn vị tiền ảo (ngoài ra còn có nhiều loại tiền ảo khác).
- Cô giáo Thảo là ví dụ cho hệ thống ngân hàng, chính phủ, và kiểm toán. Trong cuộc sống thực, chúng ta tin tưởng vào bên thứ 3 này để giúp điều phối các giao dịch. Vấn đề là đội ngũ này không phải lúc nào cũng chính xác (nếu không muốn nói là sai sót thường xuyên), bảo mật kém (hacker có thể ăn trộm tiền trong ngân hàng).
- Mấy đứa trẻ nỗ lực xác minh giao dịch giữa 2 thành viên trong nhóm chính là ví dụ của những người "đào tiền ảo", vốn rất quan trọng trong hệ thống. 
- Những người đào tiền ảo là lý do tại sao bitcoin lại an toàn. Họ sử dụng máy tính của mình để thực hiện hàng ngàn hàng triệu phép toán phức tạp mỗi giây để đảm bảo các quyển sổ ghi chép của từng cá nhân trong hệ thống luôn chính xác và cập nhật. Với cách này, hoàn toàn bất khả thi cho 1 thợ đào hoặc một nhóm thợ đào nào đó định gian lận hệ thống, tìm cách thay đổi thông tin ở một vài chỗ nào đó, bởi cả hệ thống sẽ không phụ thuộc vào một nhóm cá nhân nào. 
- Để giao dịch được chấp thuận, mọi quyển sổ phải được đồng bộ với nhau, và các thợ đào phải đồng ý với kết quả tính toán. 
- Chúng ta cũng đã thấy lũ trẻ mất công đi xác minh giao dịch sẽ được thưởng một ít bút chì. Điều này cũng tương tự trong *blockchain*, mỗi khi một thợ đào A (a miner) có thể giải được phép toán (thông qua máy tính) và xác nhận một giao dịch, và các thợ đào khác khẳng định rằng công việc của anh A kia là chuẩn, sau đó ghi điều đó (tức là tính toán của anh thợ A) vào tất cả các quyển sổ của mỗi người. Anh thợ A đấy sẽ được thưởng một lượng bitcoin nhất định. 
- Mỗi khi một thợ đào nhận một lượng bitcoin như là phần thưởng cho công sức anh ta bỏ ra, lượng bitcoin đó sẽ được thêm vào vào *blockchain*.


Vậy đấy, công nghệ tiền mật mã ảo đã mở ra vô số hướng đi cho con người, và câu trả lời là chúng ta sẽ chọn đi theo hướng nào chỉ nằm ở tương lai.


[image01]: https://ngminhtrung.github.io/images/PostIMG/2018-01-01-blockchain/image01.png "Nhóm 6 học sinh"
