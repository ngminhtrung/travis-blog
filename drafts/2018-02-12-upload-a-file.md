---
id: 132
title: 'What is a web server?'
date: 2018-01-29
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

Bài toán: Tạo một microservice nhỏ để upload file, sau khi nhấn submit thì trả về dung lượng của file. Được gợi ý dùng package [`multer`](https://www.npmjs.com/package/multer). Để làm được cái này theo tutorial tương đối đơn giản, chỉ có điều băn khoăn lưu ý của multer là: "*Multer will not process any form which is not multipart (multipart/form-data).*". Ủa vậy **multipart/form-data** là gì?  

### multipart/form-data là gì?

Là giá trị truyền vào cho attribute `enctype` của HTML form. 

### Ủa HTML form tưởng chỉ có `action` với `method`

Bình thường ta sử dụng 2 attributes `action` và `method` khai báo HTML form:
- `action`: liên quan đến địa chỉ (URL) mà dữ liệu sẽ được gửi tới sau khi nhấn submit. 
- `method`: HTTP method (POST hoặc GET), cách mà form sẽ truyền dữ liệu đi:
  - Với GET, dữ liệu được browser đặt vào trong tham số của URL rồi gửi đi
  - Với POST, dữ liệu được browser mã hóa vào phần body của request.

Nhưng 2 attributes trên chỉ đủ cho dữ liệu dạng `TEXT`, còn khi **gửi files ta cần thêm attribute `enctype` để báo cho server biết định dạng của dữ liệu sau khi convert**.

### Attribute `enctype` trông như thế nào? 

Nếu không phải gửi file, attribute `enctype` sẽ có giá trị mặc định là `application/x-www-form-urlencoded`. Hiểu nôm na là ta thông báo cho server là: "*Data điền vào form đã được gửi kèm (encoded) trong tham số của URL (URL parameters)*". 

Nhưng khi gửi file (vốn là binary data) qua HTTP (vốn giao thức định dạng text), ta cần:
- đặt `method` của form là POST. Bởi file không thể đặt vào tham số của URL. 
- đặt `enctype` là `multipart/form-data`: bởi dữ liệu và file sẽ được chia nhỏ làm nhiều phần (multiple parts).

### Ví dụ HTML form để gửi file

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">Choose a file</label>
    <input type="file" id="file" name="myFile">
  </div>
  <div>
    <button>Send the file</button>
  </div>
</form>
```

### Vậy data được mã hóa với method=post enctype="multipart/form-data" sẽ trông như thế nào?

https://www.w3.org/TR/html5/sec-forms.html#form-submission-introduction


Phần body của form khi được gửi đi trông sẽ có dạng như sau:

```
------kYFrd4jNJEgCervEContent-Disposition: form-data; name="..."

------kYFrd4jNJEgCervE
Content-Disposition: form-data; name="..."

------kYFrd4jNJEgCervE--
```

### Làm sao để tự mình kiểm chứng body chứa mã hóa của form?

Xem tại [đây](https://stackoverflow.com/a/28380690/8414827). Bản thân mình cũng chưa làm (chưa hiểu các lệnh). 

### Kết luận:

Cảm giác mới đụng đến bề mặt của những thứ liên quan đến form cũng như HTTP request. Sẽ còn quay lại tìm cách "tóm" phần encoded data trong body của form để so sánh giũa urlconded với multiparts xem như thế nào.

### Tham khảo

- [StackOverflow - What does enctype='multipart/form-data' mean?
](https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean)
- [W3 - URL-encoded form data](https://www.w3.org/TR/html5/sec-forms.html#urlencoded-form-data)
- [W3 - Multiplart form data](https://www.w3.org/TR/html5/sec-forms.html#multipart-form-data)
- [Mozilla MDN web docs - Sending form data](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)