---
title: 'Ownership, team structure trong dự án phát triển phần mềm cho doanh nghiệp'
date: 2020-04-19
author: ngminhtrung
categories:
  - software_development
tags:
  - MES
  - translation
  - best_practices
  - programming
  - '2020'
---

Bài này viết này nhằm theo dòng suy nghĩ của bài viết ["Ownership and team structure"](https://www.linkedin.com/pulse/ownership-team-structure-nghia-minh/?trackingId=woKZMWZxxt8U6g7i18RRKQ%3D%3D), đăng trên LinkedIn cá nhân Mr. Minh Nghĩa (Director of Marketplace System at Tiki Corporatio) ngày 19.04.2020. 

Từ những trải nghiệm trong gần 3 năm vừa qua trong lĩnh vực phát triển phần mềm, nhất là mảng phát triển ứng dụng cho doanh nghiệp trong domain "sản xuất", bản thân mình cũng trăn trở rất nhiều câu hỏi như Mr. Nghĩa đã nêu ra. 

## Việc chuyên môn hoá trong team có thực sự đem lại hiệu quả cũng như tính "chịu trách nhiệm" trong các dự án end-to-end cho doanh nghiệp? Mô hình công việc nên có là gì? 

Về lý thuyết, điểm tích cực của việc có đầy đủ từ Project Manager (PM), Project Tech Lead (PTL), Business Analyst (BA), Developers (Dev), Tester, Quality Assurance (QA) là sẽ giúp chuyên môn hoá, tăng chất lượng của dự án. 

Trong thực tế, với các dự án quy mô vừa nhỏ, làm trực tiếp với khách hàng là business users, tổng thời gian 3 - 5 tháng, mô hình trên cồng kềnh và không hiệu quả.

Ví dụ cho 4 roles quan trọng là PM, PTL, BA và Dev như dưới đây:

#### 1. PM không thể chỉ quản lý task và resource trong nhóm
 mà không nắm nghiệp vụ để tham gia communicate cả 2 chiều (chiều với khách lẫn nội bộ team). Logictics cho team dự án, cũng như mapping tiến độ dự án với hợp đồng để đảm bảo các payment milstone cũng là việc một PM cần chú ý đến.

#### 2. PTL không thể chỉ là một senior dev, hay đưa ra kiến trúc chung chung (mô hình MVC hoặc 3-tiers chẳng hạn) mà cần thêm:
- định hướng giải pháp kỹ thuật theo nghiệp vụ, cũng như 
- đánh giá software architecture phù hợp với bản chất ngành IT là  có người mới/cũ ra vào liên tục trong giai đoạn phát triển, bảo trì.
- đưa ra văn hoá, và practices cho việc test-driven development để cả team cũng tham gia, đảm bảo chất lượng code base luôn đạt mức độ ổn định, team không bị "loạn" vì bug khi dự án chạy nước rút do deadline. 

#### 3. BA không thể chỉ là IT BA (viết tài liệu chi tiết cho dev code) mà còn phải:
- tìm hiểu sâu nghiệp vụ của khách hàng, tìm tòi các reference case đã được tiêu chuẩn hoá trên thế giới để cùng thảo luận, đưa ra các kiến nghị với khách hàng. 
- có tư duy về test để cùng tham gia viết test case, tham gia test, đảm bảo ứng dụng phục vụ đúng nhu cầu của khách. 

#### 4. Dev không thể chỉ làm mỗi việc coding, mà còn nên:
- tham gia viết unit test, system test, đảm bảo code của mình PASSED trước khi gộp chung vào code của dự án. Developer phải chịu trách nhiệm với code của mình trước khi chuyển sang cho tester, giảm bớt một phần việc cho tester (dù là manual hay automation test), cũng là tiết kiệm thời gian và chi phí cho dự án. 
- viết tài liệu mô tả code của mình, đảm bảo document luôn được cập nhất phục vụ việc đọc hiểu dự án của người mới trong bất kỳ giai đoạn nào (phát triển cũng như bảo trì)

## Vậy túm lại team structure và cách làm việc nên như thế nào? 

Khó có câu trả lời làm chính bản thân tôi hài lòng, nhưng tạm thời tôi nghĩ rằng với bài toán phát triển phần mềm cho doanh nghiệp:

- Mô hình team cần phải thật lean, các thành viên nên đa di năng nhất có thể để có thể làm mọi việc nhanh, gọn, liên tục deliver được cho khách hàng các phiển bản của sản phẩm (từ demo, alpha, beta, final release). Ví dụ:
  + PM, BA nên kiêm nghiệm việc communicate với khách, nắm vững nghiệp vụ, theo dõi task và trao đổi với team members. 
  + BA nên là 1 cặp của BA nghiệp vụ và BA IT, đảm nhiệm cả vai trò tester. 
  + PTL, Dev nên vừa là solution/ software architect, vừa dev, vừa test và viết technical documents 

- Luôn dành thời gian để hiểu bài toán của khách, bám chặt vào các pain points, các business benefits của dự án. Đảm bảo nhu cầu của khách được phản ánh đúng, đủ, rõ ràng. 

- Dự án nên nhìn cả ở góc độ "sau phát triển", tức là giai đoạn bảo hành và bảo trì, từ đó có những quyết định về kiến trúc giải pháp, technology stack, tài liệu, v.v. phù hợp. 

Trung Nguyễn (Travis)
Sales Engineer/ Solution Consultant | Manufacturing domain