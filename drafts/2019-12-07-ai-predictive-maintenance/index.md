---
title: 'Google Cloud và Predictive Maintenance'
date: 2018-12-07
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

Điểm báo và suy ngẫm.

Một trong những chủ đề được quan tâm trong trí tuệ nhân tạo, đó là làm sao ứng dụng AI/ML trong lĩnh vực sản xuất, cụ thể ở đây là dự đoán thời điểm hỏng hóc thiết bị, từ đó đưa ra kế hoạch sửa chữa - thay thế kịp thời, tránh làm gián đoạn chu trình làm việc. Từ khoá tiếng Anh ở đây là "*predictive maintenance*".

Trong series 3 bài của mình, Google đã trình bày cách họ tiếp cận với các ý sau:
- Cách tiếp cận tổng quan thông qua bài "[A strategy for implementing industrial predictive maintenance](https://cloud.google.com/blog/products/data-analytics/strategy-implementing-industrial-predictive-maintenance-part-i)": 
  - Giới thiệu tổng quan "predictive maintenance" là gì, 
  - lợi ích khi tiến hành việc này, 
  - các công nghệ nào giúp thực hiện (Big Data, Cloud Computing, IoT, v.v.)
  -  Một framework để thiết kế giải pháp, minh hoạ thông qua các use case
  - Dữ liệu cần có
- Quy trình từng bước cần làm thông qua "[A process for implementing industrial predictive maintenance](https://cloud.google.com/blog/products/data-analytics/a-process-for-implementing-industrial-predictive-maintenance-part-ii)". Các bước này cũng không khác nhiều quy trình của 1 bài toán Data Science (như có Data Exploration, Feature Engineering, Modeling, Evaluation, v.v.)
- Các công nghệ của Google Cloud có thể giúp giải bài toán này qua bài "[A solution for implementing industrial predictive maintenance](https://cloud.google.com/blog/products/ai-machine-learning/solution-implementing-industrial-predictive-maintenance-part-iii)": như Cloud IoT, BigQuery, App Engine, Cloud IoT Edge, v.v.