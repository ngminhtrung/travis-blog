---
title: "Một vài ghi chú sau khi thi (và passed) AWS Certified Solutions Architect - Associate ngày 08.10.2018"
date: 2018-10-08
author: ngminhtrung
categories:
 - cloud
tags: ["cloud", "aws", "exam""]
---

Dưới đây là một vài ghi chép của tôi sau buổi thi AWS Certified Solutions Architect - Associate ngày 08.10.2018 tại NetPro (số 9 Trung Liệt, Đống Đa, Hà Nội). 

### Background cá nhân

- Kinh nghiệm làm việc với front-end khoảng 1 năm, có học sơ nhưng chưa làm việc với back-end cũng như deploy lên server bao giờ.
- Trước khi thi chưa làm việc với cloud
- Được FSOFT training trong 4 buổi (8 tiếng/ buổi) hơn 1 tháng trước khi thi. 

### Về phòng thi ở NetPro

Không ngon lành cành đào như tưởng tượng. Phòng nhỏ, có 6 ô ngăn với nhau bởi vách nhưng 2 người ngồi cạnh nhau vẫn nhìn màn hình nhau được. Phòng cách âm không tốt, người bên ngoài đi lại, đóng mở cửa vẫn có thể nghe thấy được. Tuy vậy cũng không nên quá để ý đến việc này. Cứ coi buổi thi như một buổi làm việc ở văn phòng, người ra người vào lộn xộn mà vẫn phải cố để tập trung làm việc :-). 

###  Về đề thi AWS CSA-A ngày 2018.10.08

- Hỏi rất nhiều thứ rộng, không chỉ về core services của AWS như EC2, S3, VPC, Database, AutoScaling, Load Balancer, mà cả những thứ “mơi mới” như Cognito, Kinesis, Athena, v.v. Những thứ cores thì hỏi sâu và nhiều, những thứ mới hỏi ít hơn nhưng vẫn cần biết qua để xem nên chọn/ hay loại trừ phương án đó. Với đề thi hôm đó, thì tôi nhớ được có EC2, S3 (đủ cả S3 Standard, S3-IA, Glacier, S3-RRS, Snowball, Version Control, signed-URL, expiration, Cross-region-replication), ELB, AutoScale, Route 53, Cognito, Kinesis, DynamoDB, RDS, Redshift, IAM, CoudFront (cả feature Origin Access Identity (OAI) của CloudFront), ElasticCache, API Gateway, Lambda, Aurora, NAT, Internet Gateway, e-gress Internet Gateway, IPv4, IPv6, SQS, Elastic Transcoder, Identity Provider, Athena, Elastic Beanstalk, Docker, Code Deploy, .... nói chung là tùm lum.

- Hỏi sâu một vài thứ như DynamoDB (ví dụ maximize throughput thông qua partion/ sort key, secondary index, v.v.). Cái này nếu chưa làm thực tế bao giờ, hoặc chưa đọc - hiểu - nhớ các phần sâu trong Developer Guide chắc không thể hoàn thành. SQS cũng là một topic sẽ được hỏi nhiều thứ chi tiết liên quan đến ```WaitingTime``, ```DelayedTime```, hay ```VisibilityTimeOut```.


- Câu hỏi vẫn là scenarios-based, cần suy luận, vài chỗ tính toán đơn giản. 
Vài câu hỏi về việc chuyển đổi từ on-premise lên AWS, định hướng stateless. 

### Thời gian làm bài: 

160 phút, bao gồm:
- 130 phút chính thức
- 30 phút xin thêm (đăng ký với AWS). 

Nên tận dụng hết để kiểm tra đi kiểm tra lại các câu. Như tôi chỉ làm hết 100 phút, còn 60 phút đi kiểm tra lại từ đầu từng câu một. 


### Về cách học

Với đề thi kiểu trên, mình nghĩ là nên:
- tham gia đầy đủ khoá học AWS của FSOFT để được giới thiệu về tư duy cloud, cũng như trao đổi về những chủ đề khó.
- nên thực hành thật nhiều bên cạnh đọc lý thuyết:
    - thực hành theo free tutorial của AWS
    - thực hành theo các bài lab trên Qwiklab
    - thực hành theo các bài lab của khoá ACloudGuru - Certified Solutions Architect - Associate 2018
    - Lưu ý: làm tất, càng nhiều càng tốt, làm đi làm lại mới nhớ và hiểu lý thuyết.
- nguồn lý thuyết bao gồm:
    - Trang web của Amazon Web Services giới thiệu tổng quan về từng services (https://aws.amazon.com/)
    - AWS Developer Guide (https://docs.aws.amazon.com/index.html#lang/en_us): Bắt buộc phải đọc đến mức này ngay cả không thi Developer. 
    - FAQs (https://aws.amazon.com/faqs/)
    - AWS Well-Architected (https://aws.amazon.com/architecture/well-architected/)
    - Architecting for the Cloud (AWS Best Practices): https://d0.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf. Phần này có nhắc đến stateless application, hoặc serverless architecture sẽ giúp trả lời kha khá câu hỏi
- học theo khoá ACloudGuru - Certified Solutions Architect - Associate 2018 --> đã upload videos của khoá này trong group. Hầu hết các videos đều ngắn gọn, dễ hiểu, đưa ra các mẹo làm bài thi, phù hợp ngồi nghe/ xem trên xe buýt. 
tham khảo tranh luận trên diễn đàn của ACloudGuru: https://acloud.guru/forums/aws-certified-solutions-architect-associate/recent?p=1


### Cách ôn thi giai đoạn cuối (khoảng 2 tuần trước khi thi):

Bình thường thì có thể lấy question bank ra vừa học vừa ôn, nhưng sát thi thì nên làm các Exam Simulator. Bởi Exam Simulator cho mình cảm giác đang phải thi thật, có sức ép thời gian, buộc não phải hoạt động hết mức :((.

Mình đề nghị mọi người mua khoá ACloudGuru - Certified Solutions Architect - Associate 2018, và dùng: (1) Exam Simulator, (2) Scenario Quiz, (3) Mini Exam, và (4) Final Practice Exam của họ. 

Cái (1) Exam Simulator cứ mỗi lần chạy nó lại ra một bộ câu hỏi mới, có giải thích đáp án, khá ổn. Mình không đủ khả năng bảo đề thi trên đây là đúng 100%, hay sát 100% với actual exam, nhưng nó vẫn cực kỳ hữu ích để nhận ra các lỗ hổng kiến thức. 

Để tiết kiệm, tốt nhất là đăng ký và mua khoá trên (26 USD) để có quyền truy cập và làm bài thi thử. Sau 6 ngày thì cancel gói đăng ký, 100% tiền lại được hoàn trả về tài khoản. Tất nhiên là cách làm này ... không được khuyến khích. 

Hy vọng bạn nào google về bài thi chứng chỉ này sẽ bài này là thông tin tham khảo tiếng Việt có ích. Chúc tất cả thi tốt.

### Lưu ý:

Nếu google, bạn sẽ thấy nhiều người nhấn mạnh rằng chứng chỉ **AWS Certified Solutions Architect - Associate** không phải là một thứ bằng cấp giúp ta đi xin việc.