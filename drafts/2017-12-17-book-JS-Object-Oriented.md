

## Về tác giả Nicholas C. Zakas:
- Từng là software engineer tại Yahoo! (vị trí principal front-end engineer), Box
- Tác giả viết sách và diễn giả về chủ đề JavaScript
- Sách đã viết:
    - Maintainable JavaScript (O’Reilly Media, 2012)
    - Professional JavaScript for Web Developers (Wrox, 2012)
- Tác giả của: ESlint


## Dịch tóm tắt sách

### Chương 1 - Primitive và Reference Types

- Mặc dù JavaScript (tính đến thời điểm xuất bản sách năm 2014) không có khái niệm về "classes", nó vẫn có hai loại types là **primitive** và **reference**.
- Mỗi variable hoặc data được gắn với 1 trong 2 loại type nói trên. 
- *Primitive types* dùng để lưu các dữ liệu đơn giản 
- *Reference types* dùng để lưu các objects, vốn đơn thuần chỉ là những tham chiếu đến các vị trí khác nhau trong bộ nhớ. 
- Điều hay ho chính là JavaScript cho phép người dùng làm việc với primitive type giống như với reference type để giúp việc viết code trở nên nhất quán. 
- Với các ngôn ngữ lập trình khác, primitive type được lưu ở trên *stack*, còn refernce type được lưu ở trong *heap*, thì JavaScript lại xử lý vấn đề theo một cách khác: Nó lưu thông tin về *scope* của variables với 1 object đặc biệt gọi là `variable object`. 
    - Primitive values được lưu trực tiếp trên `variable object`.
    - Reference values được đặt như một con trở (pointer) trong `variable object`, đóng vai trò là tham chiếu đến vị trí trong bộ nhớ nơi mà object được lưu. 
- Có 05 primitive types, bao gồm: `strings`, `numbers`, `Booleans`, `null`, và `undefined`.
    - Người dùng có thể dùng `typeof` để kiểm tra primitive type của data, ngoại trừ `null`
    - Riêng với `null`, để kiểm tra, cần so sánh trực tiếp variable/ data với `null`. 
- Reference type là thứ gần nhất với "class" trong JavaScript, mỗi object là 1 instance của reference type. 
    - Mỗi object có thể được tạo thông qua toán tử `new` hoặc sử dụng `reference literal` (chính là dấu [], {}, hoặc ())
    - Để truy cập properties hoặc methods, lập trình viên có thể dùng *dot notation" (chính là dấu "."), hoặc *bracket notation* (chính là [ ])
- Function là objects trong JavaScript, có thể được xác định thông qua toán tử `typeof`. 

### Chương 2 - Functions

- Function trong JavaScript độc đáo ở chỗ nó cũng là những objects, nghĩa là có thể truy cập, copy, ghi đè, nói chung là có thể xử lý như xử lý value của bất kỳ object nào. 
- Điểm khác biệt lớn nhất giữa *function* và các *objects* khác ở chỗ *function* có một property đặc biệt, [[Call]], có chứa mô tả để thực thi function. 
- Toán tử `typeof` tìm kiểm property đặc biệt trên để quyết định xem đây có phải là function hay không. 
- Về mặt khai báo, có hai cách tạo function: *declaration* và *expression*. 
    - *Function declaration* có chứa tên function ở bên phải của từ khóa `function`, và được *hoisted* lên trên cùng của context mà function đó được định nghĩa. 
    - *Function expression* được dùng để gán giá trị vào expression, function parameters, hoặc để trả về giá trị của một function khác. 
    