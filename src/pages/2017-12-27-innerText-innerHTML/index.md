---
id: 118
title: '[JavaScript] Chọn innerHTML, innerText hay textContent'
date: 2017-12-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - html5
  - standard
  - innerHTML
  - innerText
  - textContent
---

## Tại sao có bài viết này?
---

Từ hồi đi học cho đến bây giờ đi làm, khi cần thay đổi `text` hiển thị trong `button` (cái này dùng thường xuyên à nha), tôi luôn luôn sử dụng JavaScript để thay đổi thuộc tính `Element.innerHTML` của phần tử gắn với *button đó*. Không nhớ lý do tại sao, chắc là do google rồi chọn ngay 1 kết quả trong StackOverflow mà mình nhìn thấy, giải quyết xong rồi thôi, không nghĩ tiếp nữa. Tuy vậy, đợt rồi khi đọc được 1 bài trên StackOverflow ([link](https://stackoverflow.com/questions/7035842/how-to-change-the-buttons-text-using-javascript)), thì thấy cách dùng trên "*không được khuyên dùng vì tiềm ẩn nguy cơ bảo mật*". Wow, thật thú vị, tôi tò mò đọc tiếp và thấy ngoài `innerHTML`, thì 2 thuộc tính nữa là `innerText` và `textContent` đều có thể giúp mình đạt được mục đích, trong đó `textContent` là phương án tối ưu nhất. Bài này để tổng hợp lại một vài điểm nhớ được về 3 thuộc tính trên. 

## `innerHTML` là gì và vì sao dùng nó thì lại có nguy cơ về bảo mật?
---

**Định nghĩa**: Thuộc tính `Element.innerHTML` giúp *set*, hoặc *get* đoạn mã HTML của một phần tử nào đó trên trang web. 

**Ví dụ:** Ta có một thẻ `<h1>` sau có đoạn text được bôi đậm:

```html
<h1 id="freeCodeCamp" style="color: red"><strong>freeCodeCamp</strong> Hanoi</h1>
```
Để "get" (lấy được) nội dung của phần tử có id "freeCodeCamp" nói trên, viết code như sau:
```js
var element = document.getElementById("freeCodeCamp");

element.innerHTML
```

Kết quả trả về của đoạn code JavaScript trên là:
```html
"<strong>freeCodeCamp</strong> Hanoi"
```
Để "set" (truyền vào) nội dung mới cho phần tử này, viết như sau:
```js
element.innerHTML = "freeCodeCamp Saigon";
```

Vậy là thuộc tính này không chỉ làm việc với text đơn thuần, mà nó mục đích là để truyền vào hoặc copy các đoạn code HTML. Ấy vậy mà không ít lập trình viên (trong đó có tôi) dùng thuộc tính này để chèn thêm text vào một trang web, và cách làm này tiềm ẩn nguy cơ:
1. thao tác sai: chèn mỗi text thôi mà có khi xóa hết cả đoạn code HTML khác của phần tử vừa chèn. 
2. về bảo mật. Đương nhiên là 2 ví dụ ở trên là hoàn toàn vô hại, thậm chí là ngay cả khi sử dụng thẻ `<script>` thì vẫn không vấn đề gì bởi tiêu chuẩn HTML5 đã ngăn việc thực hiện các dòng lệnh bên trong thẻ `<script>` khi được chèn vào trang web thông qua thuộc tính `innerHTML`. Xem quy định này ở [đây](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0). 

```js
blackScript = "<script>alert('Cảnh báo cảnh báo cảnh báo!')</script>";
el.innerHTML = name; // vẫn OK trong trường hợp này
```
Lưu ý: Cách làm trên trông giống như một dạng [tấn công `cross-site scripting`](https://en.wikipedia.org/wiki/Cross-site_scripting).

Dẫu thế, dù không sử dụng thẻ `<script>`, thì người ta vẫn có cách lách bằng chèn vào những thẻ rất bình thường như thẻ `<img>` chẳng hạn để thực hiện một đoạn code nào đó chẳng liên quan để qua mắt người dùng, xem nhé:

```js
const name = "<img src='x' onerror='alert(1)'>";
```
Xem minh họa qua hình sau:

![alt text][image01]{: .center-image }

Chính bởi lý do trên, việc sử dụng `innerHTML` không hề được khuyên dùng khi chèn text đơn thuần, thay vì vậy hãy dùng `textContent`. Thuộc tính `textContent` sẽ không hiểu đoạn mã bạn truyền vào là một cú pháp HTML, mà chỉ là text 100% không hơn không kém. 

## innerText có dùng được không?
--- 

**Định nghĩa**: `Node.innerText` là một thuộc tính thể hiện nội dung text đã được "rendered" của một `node` cũng như những node bên trong nó. "[Rendered text](https://html.spec.whatwg.org/multipage/rendering.html#being-rendered)" là hình thức của text mà bạn nhìn thấy trên trình duyệt, bao gồm các kiểu style được thiết lập thông qua HTML5 hoặc CSS. Một khi sử dụng `innerText` để lấy (*get*) nội dung text của node, thì nó (tức là `innerText`) sẽ cố gắng trả về kết quả sao cho giống nhất với cách người dùng bôi đen text trên trình duyệt rồi copy vào clipboard. Cố gắng thôi nhé, còn được hay không, được đến đâu thì còn tùy!

Kết quả trả về nếu dùng `innerText` trong ví dụ trên:
```html
"freeCodeCamp Hanoi"
```

Thuộc tính trên mới được giới thiệu bởi Internet Explorer gần đây, rồi chính thức trở thành tiêu chuẩn HTML vào năm 2016, sau đó được cập nhật trên hầu hết các trình duyệt lớn khác (Chrome, Firefox, Opera, Safari).

Tuy để lấy text thuần thì `innerText` cũng đạt được kết quả tương tự với bạn `textContent`, nhưng "nặng" hơn nhìn từ khía cạnh "hiệu suất thực thi (performance)" do phải *render* text trước đó. 

Hơn nữa, không giống `innerHTML`, lập trình viên không thể chèn thẻ HTML vào node thông qua `innerText`.

Để biết thêm chi tiết về cách thức và hiệu quả của 2 phương thức `get` & `set` thông qua `innerText`, tốt nhất là đọc trực tiếp tiêu chuẩn tại  [HTML Standard - 3.2.7 The innerText IDL attribute](https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute). 

## Tại sao `textContent` là phương án tốt nhất
--- 

**Định nghĩa:** Thuộc tính `Node.textContent` chứa nội dung text của `node` và những `node` con cháu.

Kết quả trả về nếu dùng `innerText` trong ví dụ trên:
```html
"freeCodeCamp Hanoi"
```
Như vậy, với mục đích lấy text đơn thuần, `textConent` đem đến cùng một kết quả mà không có nguy cơ bảo mật như `innerHTML` bởi nó không phải đọc HTML. Hơn nữa, `textContent` chạy cũng nhẹ hơn, đem lại hiệu suất cao hơn. 

## Ơ này, `Node` và `Element` khác nhau à?
---
Lúc làm thì ai cũng cắm đầu vào làm, google, chọc chọc vào Chrome Dev kiểu gì miễn là được việc mà chẳng để tâm đến các định nghĩa. Nói về nó thì dài lắm, nói dài có khi lại nói sai. Cứ nhớ ngắn gọn là: 
- `node` là tên chung để gọi cho bất kỳ object nào trong cây DOM. Một `node` có thể là một phần tử built-in DOM như `document` hoặc `document.body`, hoặc là một thẻ HTML nào đó như `<input>` hoặc `<p>`, hoặc là một đoạn text được tạo ra bởi hệ thống để lưu trữ bên trong một phần tử khác. Nói ngắn gọn, bất kỳ 1 object DOM nào đều được coi là `node`.
- Còn `element` chỉ là 1 loại cụ thể của `node` bên cạnh rất nhiều loại khác nữa như vừa liệt kê bên trên. 

Muốn tìm hiểu thêm thì xin mời đọc ở 1 bài khác vậy, hoặc là đọc ở phần tham khảo. 

## Tóm gọn:
---
- Nếu chỉ đơn thuần thay đổi nội dung text của 1 phần tử, xin hãy ưu tiên dùng thuộc tính `textContent` trước khi nghĩ đến `innerHTML` hoặc `innerText`. 
- Trong DOM, `Elemenet` khác với `Node`, chỉ là 1 phần trong rất nhiều loại `node`.  


## Tham khảo:
---
1. innerHTML
    - [MDN Web Dev Docs - Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
    - [Don't use innerHTML](http://web.cs.ucdavis.edu/~amenta/s16/lec-4-13.pdf)
2. innerText
    - [MDN Web Dev Docs - Node.innerText](https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText) 
    - [HTML Standard - 3.2.7 The innerText IDL attribute](https://html.spec.whatwg.org/multipage/dom.html#the-innertext-idl-attribute)
3. textConent
    - [MDN Web Dev Docs - Node.textConent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
4. Difference between Node object and Element object?
    - [Difference between Node object and Element object?](https://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object)
    - [What's the Difference Between Tag, Element, Node, Object, Attribute, Property, Method?](http://xahlee.info/js/javascript_DOM_confusing_terminology.html)
  

[image01]: https://ngminhtrung.github.io/images/PostIMG/2017-12-24-JS-security-innerHTML/image01.gif "Minh họa innerHTML"