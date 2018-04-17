---
title: "Uncontrolled vs Controlled forms trong ReactJS"
date: 2018-04-17
author: ngminhtrung
categories: 
- ReactJS
tags:
- javascript
- reactjs
- form
- controlled
- uncontrolled
---

Khi học ReactJS qua một số courses/ tutorials online, ta sẽ gặp kha khá lần phải tương tác với *form*. Cũng phải thôi, form là một trong những nơi giao tiếp giữa người dùng với máy, nên nó đóng vai trò quan trọng cần quan tâm. Vấn đề ở đây là mỗi một tutorial lại dùng 1 kiểu truyền dữ liệu của form, khiến cho người mới có thể bỡ ngỡ. Vừa hiểu được cách này, sang cách kia lại quên, và đôi khi dùng lẫn cả 2 một cách vô thức.

Vậy cụ thể có những loại form nào trong ReactJS? Có 2 dạng:
- Dạng "**uncontrolled**" form (nhắc đến trong mục [Quick Start/ Form của ReactJS](https://reactjs.org/docs/forms.html))
- Dạng "**controlled**" form (nhắc đến trong mục [Advanced Guided/ Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html))

Bài viết này không nhằm giải thích việc tạo form cũng như các tham số chi tiết. Bài viết chỉ là một tổng kết nhỏ về 2 dạng form này, sử dụng mẫu form đơn giản ít input nhất để minh họa. 

Ghi chú: Bài này dựa khoảng 90% vào bài [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/))

### Trông 2 dạng form này như thế nào? 

Với ai chưa đụng vào form, bước đầu tiên là hãy quan sát 2 loại forms hiển thị ở codepen bên dưới đây. Có thể dễ dàng thấy là:

|Form           | Mô tả |
|---             |---   |
| Bên trái, form dạng "**Uncontrolled**"| Dù ta đã nhập 2 ô "firstName" và "lastName", nhưng chữ "fullName" chỉ hiện ra sau khi click nút Submit.|
| Bên phải, form dạng "**Controlled**" | Dù nút Submit đã bị vô hiệu hóa, thì chỉ cần gõ vào 1 (hoặc cả 2) ô "firstName", ô "lastName", form sẽ tự tổng hợp ra "fullName".|

<p data-height="265" data-theme-id="0" data-slug-hash="VxZagY" data-default-tab="js,result" data-user="ngminhtrung" data-embed-version="2" data-pen-title="ReactJS - Form - Controlled and Uncontrolled form (inputs)" class="codepen">See the Pen <a href="https://codepen.io/ngminhtrung/pen/VxZagY/">ReactJS - Form - Controlled and Uncontrolled form (inputs)</a>

Yeah, vậy là ít nhất ta đã có cảm giác thế nào là **controlled**, thế nào là **uncontrolled**. Cảm giác đó là gì? Hãy liên hệ với những thứ bên ngoài cho dễ nhớ.

| Form "uncontrolled"   | Form "controlled" |
|---                    |---                |
|Là **pull**, giống tít ngày xưa muốn tải email mới về, ta phải vào ứng dụng, nhấn Refresh, thì thông tin mới được load về. Ở đây ta phải ấn "Submit" thì data mới được trả về. | Là **push**, thời bây giờ, không cần thao tác, một khi được phép, server sẽ đẩy email mới về máy ta liên tục, chính là vụ không cần nhấn Submit.|
|Là cô y tá trực ở bên ngoài, chỉ khi bệnh nhân kéo cái dây "cấp cứu" thì mới nhảy bổ vào hỏi han có chuyện gì. |Vẫn là cô y tá kia, giờ bằng một cách nào đấy (như cắm cảm biến chằng chịt vào bệnh nhân), nên bệnh nhân bắt đầu buồn tè là cô cũng biết. |

### Nguyên lý hoạt động của 2 dạng form ra sao?

Đọc docs, hoặc xem code để biết thêm chi tiết. Đại loại là:

Với **uncontrolled** form, hướng làm là: 
- Sử dụng `ref` để lấy dữ liệu
- Sử dụng `onClick` handler để trigger hàm `handleSubmitClick`. Bên trong hàm `handleSubmitClick` (khai báo chỗ khác), ta muốn làm gì là việc của ta. 
- Do tính thụ động của `onClick`, ta chỉ có giá trị mới trong input khi click vào 1 thứ gì đó.

Cách này trông đơn giản, và trong sáng.

```html
<input type="text" placeholder="first name" ref={input => this.firstName = input} />
<input type="text" placeholder="family name" ref={input => this.familyName = input} />
<button onClick={this.handleSubmitClick}>Submit</button>
```

Với **controlled** form, hướng làm là:
- Sử dụng `onChange` handler để trigger hàm `handleNameChange`. Trong `handleNameChange`, ta cập nhật giá trị trong từng ô input thông qua `setState()`.
- Do tính chất luôn phản ứng trước bất kỳ thay đổi trong input của `onChange`, kết hợp với `setState()`, ta luôn có được giá trị mới nhất của input mà chẳng phải đụng tay chân.

```html
<input type="text" placeholder="first name" name="firstName" onChange={this.handleNameChange} />
<input type="text" placeholder="family name" name="familyName" onChange={this.handleNameChange} />
```

### Ưu nhược điểm của từng dạng form?

Cần nghiên cứu thêm. Nhưng cảm nhận cá nhân là cách `uncontrolled` form dùng `ref` không phổ biến, không được ưu tiên sử dụng.

### Lúc nào dùng form dạng nào?

Dựa vào những mô tả bên trên, ta có thể hiểu một phần gợi ý của tác giả bài viết gốc thể hiện qua bảng dưới. 

Ghi chú:
- Dấu ✔️ nghĩa là dùng được
- Dấu ❌ nghĩa là không dùng được

|Tính năng cần  | uncontrolled  | controlled    |
|---            |---            |---            |
|Nhận giá trị 1 lần | ✔️        | ✔️            |
|Kiểm tra (validate) dữ liệu **sau** khi submit | ✔️ | ✔️ |
|Kiểm tra dữ liệu tức thời sau khi gõ xong | ❌ | ✔️ |
|Disable nút submit tùy theo điều kiện | ❌ | ✔️ |
|Ép buộc format cho dữ liệu nhập vào | ❌ | ✔️ |
|Một data, nhiều input | ❌ | ✔️ |
|Nhập dữ liệu động | ❌ | ✔️ |

### Kết luận:

- Việc dùng dạng form gì sẽ tùy vào yêu cầu của bài toán.
- Cần thực hành tiếp với các dạng form phức tạp hơn để tự cảm nhận ưu nhược điểm, chỗ nào nên dùng cái nào.
- Những link để đọc sau này:
    - [React.js Forms: Controlled Components](https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/)
    - [Controlled forms in React](https://medium.com/byte-sized-react/controlled-forms-in-react-68e59362a119)

### Ghi chú:

Trong phần "controlled" form, "fullName" cần được tạo ra từ 1 hoặc cả 2 inputs "firstName" và "familyName". Lúc đầu nghĩ việc này bình thường. Làm một hồi, thấy nó đòi hỏi việc dùng 2 lần `setState()` bên trong hàm `handleNameChange()`. 

Lúc đầu đoạn này được viết là:

```js 
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      familyName: '',
      fullName: ''
    };
  }
  
  handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
      fullName: this.state.firstName + this.state.familyName 
    });
  }
```

Kết quả không đúng như ý muốn. Lý do? Vì lúc này hoặc `this.state.firstName`, hoặc `this.state.familyName` chưa được cập nhật, cho nên "fullName" sẽ nhận giá trị bị lỡ mất 1 nhịp. 

Sửa lại đoạn trên như dưới đây có được không? Tách riêng ra 2 `setState()`:

```js
  handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
    this.setState({}
      fullName: this.state.firstName + this.state.familyName 
    });
  }
```

Kết quả vẫn không đúng như ý muốn. Lý do? Bởi ReactJS thực thi đống `setState()` theo batch. Xem ở [đây](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)

Vậy nên làm thế này? Đơn giản nhất là dùng callback, lồng `setState()` vào bên trong thằng `setState()` ban đầu.

```js 
  handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => {
      this.setState({
      fullName: `${this.state.firstName} ${this.state.familyName}`
    })
    });
  }
```

Bài toán được giải quyết.