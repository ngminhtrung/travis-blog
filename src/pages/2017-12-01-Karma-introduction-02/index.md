---
id: 111
title: 'Sự ra đời của Karma và thế giới của testing tool vào quãng 2013 (phần 2)'
date: 2017-12-01
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - testing
  - mocha
  - assertion library
  - karma
---

# 2. Tại sao lại là Testing (Kiểm thử)?

Test Driven Development (TDD) vẫn là cách hữu hiệu nhất để phát triển phần mềm, ít nhất là đối với tôi. Có lý do gì để nói như vậy? Hãy thử điểm qua các lợi ích mà TDD đem lại. 

_Lưu ý_: TDD ý nghĩa gôc là việc viết test trước khi bắt tay vào viết code. Còn trong bài viết này, TDD thiên về việc viết những đoạn code có khả năng test (testable code) và tự động hoá quá trình kiểm thử. Lập trình viên viết test trước hoặc sau khi viết code chỉ là thứ yếu. Tuy vậy, thường thì viết test đầu tiên bao giờ cũng giúp tạo ra test có nội dung chất lượng hơn. 

## 2.1. Viết test giúp tạo ra bằng chứng là Code được viết Chuẩn

Chúng ta vẫn luôn test code của mình, nhưng việc test đó có đem lại hiệu quả gì hơn không thì chưa rõ. Khi lập trình viên thay đổi chỗ nào đó trong code, rồi chạy ứng dụng để xem thay đổi có đem lại kết quả mong muôn hay không, thì đó gọi là manual testing (phép kiểm thử thủ công). Thậm chí việc release code cho 1 nhóm nhỏ người dùng cũng gọi là testing. Lý do chính đằng sau các hành động này đơn giản chỉ là để chứng minh code làm việc đúng như kỳ vọng. TDD chính là việc khiến cho quá trình trên trở thành tự động. Điều này vô cùng quan trọng, nó có nghĩa là chúng ta có thể thực hiện test thường xuyên hơn, và rồi cảm thấy tự tin về những điều mình đang làm. 

## 2.2. Viết test sẽ giúp ta tránh "tắm hai lần trên 1 dòng sông" (avoiding regression)

Đại ý rằng ta sẽ tránh được việt thấy những thứ ghét bẩn trên cơ thể vốn đã trôi đi vào ngày hôm trước, giờ xuất hiện lại. Đây là một trong những lý do hay được nhắc tới nhất khi sử dụng TDD. Khi lập trình sẽ nảy sinh những lỗi được gọi là "regression bug", đó là lỗi lặp đi lặp lại mỗi lần test do chúng ta thường không nhìn thấy những mỗi quan hệ lằng nhằng trong code của mình. Rõ ràng ta làm một vài thay đổi với code ở dòng XXX, vốn chẳng liên quan gì đến những chỗ còn lại, nên ta thấy không cần phải test lại vài trường hợp cũ đã passed. Vậy mà tự dưng giờ cái lỗi khó chịu đã được sửa để passed giờ xuất hiện lại không đúng lúc. Nếu sử dụng TDD và test tự động, việc bỏ qua test sẽ không thể xảy ra (hoặc xảy ra với xác suất thấp), căn bản bởi vì việc test giờ dễ dàng quá, nhấn một cái là chạy cả loạt từ đầu đến cuối chứ không cần phải nhớ, rồi chạy từng cái thủ công như trước. Một khi việc test trở nên dễ dàng và nhanh chóng, ta cũng sẽ thấy tự tin sau khi tạo ra bất kỳ thay đổi nào trong code. 

# 2.3. Có được phản hồi nhanh chóng

Để luôn sáng tạo và năng suất, thì công việc của bạn luôn cần được phản hồi một cách nhanh chóng. Mỗi lần bạn tạo ra thay đổi, bạn có nhu cầu nhìn thấy kết quả ngay lập tức. Ví dụ nhé, một hoạ sĩ khi vẽ trên tờ giấy, chỉ một nét bút thôi là anh ta thấy đường kẻ đó như thế nào, vừa mắt hay không, vừa mắt thì để lại, xấu thì xoá đi hoặc sửa chữa. Anh ta luôn nhìn thấy kết quả của việc mình vừa làm trong tức thời, giúp việc đưa ra quyết định cho hành động tiếp theo chỉ trong tích tắc. Còn khi lập trình, nhất là sử dụng các ngôn ngữ biên dịch, thì điều trên không còn đúng nữa. Lập trình viên thay đổi gì đó, rồi anh ta phải đợi để biên dịch mã, rồi chãy nó. Quá trình này tương đối chập, nso làm chậm cả quá trình làm việc, khiến ta ... mất hứng. JavaScript là một ngôn ngữ thông dịch, browswer đọc file JavaScript tương đối nhanh, ít nhất là so với việc biên dịch code C++, tuy vậy mọi thứ vẫn có thể nhanh hơn. Việc thực hiện các unit test có thể nhanh hơn việc chuyển từ trình soạn thảo (text editor) sang browswer rất nhiều, nhanh hơn cả thời gian chờ đợi page được tải lại. Các unit test có thể diễn ra trong một vài mili giây, lập trình viên thậm chí còn chẳng phải chuyển khỏi cửa sổ soạn thảo mà vẫn nhìn thấy kết quả chạy test ngay lập tức. 

# 2.4. Quá trình tối ưu code được an toàn hơn

Tối ưu code là một phần rất quan trọng của quy trình phát triển phần mềm. Bạn có thể là một kiến trúc sư tài năng, nhưng công trình của bạn sẽ không thể tồn tại mãi mãi. Thường thì công trình sẽ vô cùng hoàn hảo lúc đầu, nhưng sau đó thì nhu cầu của toà nhà thay đổi theo thời gian, khiến cho công trình ấy không còn phù hợp nữa. Điều này hoàn toàn tự nhiên và bình thường. Cách duy nhất để bắt kịp với thay đổi, đó là luôn tối ưu và cải tạo công trình của chúng ta. Tuy vậy, không may mắn là tối ưu và cải tạo luôn đi kèm rủi ro, nó có biến những đoạn code đang chạy trong hiện tại từ lợn lành thành lợn què, vì thế mà nhiều người không dám làm gì cả. Vậy người ta cần thêm thứ gì ở đây? Chính là test, bởi test cho lập trình viên sự tự tin. Test chứng minh liệu đoạn code có làm việc chuẩn xác hay không sau một đợt "đại phẫu". Sự tự tin này vô cùng quan trọng, bởi nó giúp nâng tinh thần của lập trình viên và động viên họ tiếp tục sự nghiệp tối ưu và thay đổi. 

# 2.5. Hệ thống hoá tài liệu

Một tài liệt test viết tốt sẽ giúp truyền đạt thông tin về cách sử dụng code trong khi test, và người ta sẽ sử dụng tài liệu đó thành một phần của tài liệu kỹ thuật cho sản phẩm. Một trong những ưu điểm lớn nhất của tài liệu test so với các tài liệu truyền thống, đó là nó không bao giờ lỗi thời. Miễn là các tests đều PASSED, thì tài liệu test sẽ luôn được cập nhật. [Lưu ý: một trong những công cụ tạo tạo ra tài liệu kỹ thuật tốt từ quá trình test chính là Jasmine]

# 2.6. Thiết kế Code sẽ khoa học hơn

Việc test không chỉ nằm ở việc viết kịch bản test. Nó còn là việc viết những đoạn code có thể test được. 

Để có thể thực hiện được unit test, chúng ta phải có khả năng lôi một module nhỏ nào đó ra (unit) để test độc lập thay vì chạy cả hệ thống. Điều này vô cùng quan trọng, bởi việc chạy cả hệ thống sẽ vô cùng tốt thời gian, khiến cho việc test thành chậm chạp. Và chúng ta cũng cần gọi unit đó ra nhiều lần, với nhiều cấu hình khác nhau, để kiểm tra xem unit đó có vận hành chính xác trong mọi tình huống hay không. Nếu không có cả khả năng trích xuất unit kia, việc kiểm tra với nhiều kịch bản trở thành bất khả thi. Từ nhu cầu này dẫn đến một hình thức viết code mà các module phụ thuộc vào nhau ít nhất, cái nào phụ thuộc cái nào đều được minh bạch. [Lưu ý: nguyên gốc tiếng Anh là **a loosely coupled code with explicit dependencies**. A loosely coupled system is one in which each of its components has very little or no knowledge of other components]

Hiển nhiên là một vài phần của hệ thống sẽ tốn thời gian để thiết lập và thực thi hơn các phần khác. Ví dụ, việc truy cập vào tài nguyên thông qua network sẽ mất thời gian hơn việc tính toán đơn thuần. Do vậy, rất cần tách biệt các thành phần "nhanh" với "chậm", để có thể kiểm tra các phần "nhanh" mà không bị phụ thuộc vào thành phần "chậm". Đối với việc phát triển web, ta cần tách những phần logic thuần JavaScript ra khỏi những đoạn tương tác với DOM. Đó chính là các quy tắc liên quan đến "**better separation of concerns (tách bạch các nhiệm vụ)**", chẳng hạn như tách việc hiển thị  (view) ra khỏi logic, dựa trên trên nguyên lý "**single responsibility (mỗi người một trách nhiệm)**", "thân ai thằng đó lo". 