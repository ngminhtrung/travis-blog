---
title: 'Class Imbalance Problem'
date: 2018-11-08
author: ngminhtrung
categories:
  - selfpondering
tags:
  - advice
  - học tập
  - resolution
  - learning
  - lời khuyên
  - lookback
  - '2018'
---

Ref: http://www.chioka.in/class-imbalance-problem/

### Thế nào là "Class Imbalance Problem"?

Đây là tình huống xảy ra trong machine learning khi mà số lượng dữ liệu thuộc về class A gấp nhiều lần số lượng dữ liệu thuộc class B. Điều này rất hay xảy ra trong thực tế ở nhiều lĩnh vực như *fraud detection* (phát hiện gian lận), *anomaly detection* (phát hiện bất thường), kiểm tra y tế, phát hiện vết dầu loang, nhận diện khuôn mặt, v.v.

### Tại sao phải để tâm đến tình huống này?

Hầu hết các thuật toán machine learning hoạt động tốt nhất khi dữ liệu giữa các class tương đối cân bằng nhau về mặt số lượng. Khi không có sự đồng đều này, vấn đề sẽ xảy ra như minh họa dưới đây:

Giả sử ta được yêu cầu tìm ra giao dịch gian lận (hoặc hợp pháp) trong 1 tập dữ liệu chứa giao dịch chuyển khoản của khách hàng trong ngân hàng. Nếu dữ liệu này gồm 10000 (mười nghìn) giao dịch hợp pháp và 10 giao dịch gian lận, thì bộ phân loại (*classifier*) sẽ có xu hướng coi giao dịch gian lận là hợp pháp. Điều này có thể dễ dàng giải thích qua các con số. Coi như thuật toán sẽ cho ra 2 khả năng sau đây:
- Model 1 phân loại 7 trong 10 giao dịch gian lận là hợp pháp, và 10 trong số 10.000 giao dịch hợp pháp thành gian lận. 
- Model 2 phân loại 2 trong 10 giao dịch gian lận là hợp pháp, và 100 trong số 10.000 giao dịch hợp pháp thành gian lận. 

Nếu ta đánh giá bộ phân loại thông qua số lỗi nó mắc phải, thì rõ ràng là Model 1 tốt hơn bởi nó chỉ sai sót trong 17 trường hợp trong khi Model 2 gây ra 102 sai sót. Tuy nhiên, nếu ta muốn giảm số lượng giao dịch gian lận, ta nên chọn Model 2 bởi vì nó chỉ nhận định sai 2 trong số 10 giao dịch gian lận. Tất nhiên việc chọn Model 2 sẽ đi kèm cái giá là có những giao dịch hợp pháp bị "bắt" nhầm, và người ta vẫn chấp nhận cái giá này. Vấn đề chúng ta cần quan tâm ở đây, đó là các thuật toán machine thường sẽ chọn Model 1 hơn là Model 2. Điều này dẫn đến việc rất nhiều giao dịch gian lận sẽ bị lọt, gây tổn thất cho doanh nghiệp.

### Làm thế nào để báo cho thuật toán biết đâu là giải pháp tốt hơn?

Để báo cho thuật toán machine learning (hoặc người nghiên cứu) rằng Model 2 tốt hơn Model 1, ta cần sử dụng những metrics (thông số đo lường) tốt hơn thay vì chỉ đếm số sai sót.

Ta đưa vào khái niệm *True Positive*, *True Negative*, *False Positive* và *False Negative*:
- True Positive (TP) – Dữ liệu vốn là positive và được phân loại đúng là positive
- True Negative (TN) – Dữ liệu vốn là negative và được phân loại đúng là negative
- False Positive (FP) – Dữ liệu vốn là negative và được phân loại sai thành là positive
- False Negative (FN) – Dữ liệu vốn là positive và được phân loại sai thành là negative

Ta có bảng sau:

| Tên | Công thức | Giải thích |
|--- |--- |--- |--- |
| Tỷ lệ True Positive (TP rate) | TP/ (TP + FP) | Càng gần 1 càng tốt. TP rate = 1 khi FP = 0 |
| Tỷ lệ True Negative (TN rate) | TN/ (TN + FN) | Càng gần 1 càng tốt. TN rate = 1 khi FN = 0 |
| Tỷ lệ False Positive (FP rate) | FP/ (FP + TN) | Càng gần 0 càng tốt. FP = 0 khi FP = 0 |
| Tỷ lệ False Negative (FN rate) | FN/ (FN + TP) | Càng gần 0 càng tốt. FN = 0 khi FN = 0 |



