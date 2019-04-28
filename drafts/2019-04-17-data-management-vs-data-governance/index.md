---
title: 'Data Governance khác gì với Data Management'
date: 2019-04-17
author: ngminhtrung
categories:
  - data_management
tags:
  - reviewing
  - self
  - best_practices
  - programming
  - '2018'
---

Trong các xu hướng của Business Intelligence năm 2019 mà bài [này](../Advanced_Analytics/2019/04/14/BI-trend-survey-2019/) nhắc tới, cụm "(master) data management", rồi "data governance" được nhắc đến như những xu hướng quan trọng. Hai từ "management" và "governance" mà dịch sang tiếng Việt thì thành ... giống hệt nhau. Vậy ý nghĩa của hai khái niệm này có thực sự khác nhau hay không? Để trả lời câu hỏi này, bài "[Data Governance vs Data Management: What’s the Difference?](https://www.bmc.com/blogs/data-governance-data-management/)" của Chrissy Kidd đăng năm 2018 có phần giải thích tương đối dễ hiểu như dưới đây.



====

Nếu có gì được dùng để định nghĩa thành công của hoạt động kinh doanh trong thời nay, thì đó chính là thành công trong việc hiểu, sử dụng, và đưa ra chiến lược cho dữ liệu của một doanh nghiệp. 

Việc hiểu dữ liệu và quyết định cách thức làm việc với dữ liệu đem đến rất nhiều câu hỏi từ nhiều phía:
- lưu trữ dữ liệu kiểu gì?
- làm sao để có dữ liệu kịp thời và chính xác?
- liệu có thể tin được dữ liệu ta đang có?
- dữ liệu nào phù hợp nhất cho vấn đề đang đau đáu?

Trả lời cho các câu hỏi này không hề dễ, để trả lời cần biết về cả "*data management*" và "*data governance*". Mặc dù hai khái niệm này thường bị sử dụng lẫn lộn, ý nghĩa của chúng hoàn toàn khác nhau. 

## Data management: một cách thức hoạt động CNTT

Tốt nhất hãy coi "data management" là một chương trình CNTT (tương đương: một tập hợp các hoạt động CNTT) mà mục đích để tổ chức và kiểm soát nguồn dữ liệu, giúp người dùng có thể truy cập dữ liệu bất kỳ lúc nào cần một cách đáng tin cậy.

Nhìn từ góc độ quản trị, bộ phận CNTT chịu trách nhiệm cho "data management" có thể phải dựa vào một tập hợp các quy định, các lý thuyết, quy trình, và hệ thống (gồm rất nhiều công cụ) vừa tổng quan vừa chi tiết, vừa được may đo phù hợp cho công việc kinh doanh của tổ chức, giúp thu thập, đánh giá, lưu trữ, tổ chức, bảo vệ, xử lý và bảo trì dữ liệu. Trên hết, nếu dữ liệu không được đối xử một cách đúng đắn, nó hoặc bị lỗi, hoặc không thể sử dụng được nữa. 

Cần lưu ý nhất là "data management" bao trùm toàn bộ vòng đời của tài sản là dữ liệu, bắt đầu từ lúc dữ liệu được tạo cho đến khi dữ liệu được cho "nghỉ hưu".

Data management có thể bao gồm rất nhiều lĩnh vực liên quan, ví dụ như:
- Data governance and data stewardship
- Data architecture
- Data quality management
- Data warehousing
- Business intelligence and analytics
- Metadata management
- Data security management

## Data governance: một chiến lược kinh doanh

Nếu "data management" là cách vận hành của dữ liệu, thì "data governance" là chiến lược với dữ liệu. 

Data governance should feel bigger and more holistic than data management because it is: as an important business program, governance requires policy, best reached by consensus across the company.

The purpose of data governance is to provide tangible answers to how a company can determine and prioritize the financial benefits of data while mitigating the business risks of poor data. Data governance requires determining what data can be used in what scenarios – which requires determining exactly what acceptable data is: what is data, where is it collected and used, how accurate must it be, which rules must it follow, who is involved in various parts of data?

Importantly, data governance must go beyond IT and include stakeholders from across the enterprise. In order to ensure the safety, reliability, and trustworthiness of all data, governance requires that stakeholders from all business areas be involved. Consider the alternative: if each business silo approaches their data strategy differently, the end result is chaotic and, likely, not comprehensive enough to be useful.

Determining your data governance can include a wide range of processes, practices, and theories. It is likely to overlap with many data areas, like security, compliance, privacy, usability and integration. The end result may be some system that determines the decision rights and accountably of processes and individuals, like which data processes are used when, and which people can take certain actions under specific circumstances.

The ultimate goal is to determine a holistic way to control data assets, so that the company can get the absolute most value from the data.

A good way to determine data governance? It is not defined by technology. Instead, technology should support data governance through automation, scaling, and augmentation.

Data governance starts as a theory (or several), but it can become tangible through the creation of the following:

Data quality definitions, which determines the condition of the data, as well as its trustworthiness and adherence to data policies
A business glossary, which records the meaning of all data, ensuring clarity and preventing unnecessary repetition
Roles and responsibilities, which provides an organizational structure to who cares for and maintains which data
Governed data catalogs, which serves to locate and facilitate understanding of the data. More advanced catalogs may even group data into various related collections, based on how previous users have accessed the data, which can provide additional meaning and insight and organization.
Metadata creation, which links technical processes to specific data implementation, as well as anything that produces, uses, or influences data. This can even track the “lineage” of data, or the relationships of data across different sections, such as data within similar meanings, business processes data, and data specific to departments, business units, applications, other products, and even internal or external geographies.
Many experts in data governance also recommend a way for data systems to be organized to promote active participation from company employees, for instance. This may allow users to indicate when data is incorrect or fix it directly, which promotes both better-quality data but also trust that the data is strong and accurate.

Benefits of data governance
Once your data management processes are established, data governance is a logical next step because of the many benefits such guidance can provide, including:

Increasing the value of your company’s data
Decreasing costs within other subsets of data management, by knowing what you’ll focus on and what you’re choosing to skip
Increasing enterprise revenue overall
Standardizing data systems, policies, and procedures
Ensuring correct regulation and compliance procedures
Helping to solve issues with data
Promoting transparency
Establishing training and education around data
Data management and data governance are not the same things, in concept or in practice, but they are both essential to ensure the successful and valuable use of data in your company.

Tham khảo:

https://go.forrester.com/blogs/15-09-11-data_governance_and_data_management_are_not_interchangeable/