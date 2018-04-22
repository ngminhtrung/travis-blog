---
title: 'Bước đầu làm quen với Higher-Order Function trong lập trình hàm'
date: 2018-04-22
author: ngminhtrung
categories:
  - functional-programing
tags:
  - javascript
  - front-end
  - HOF
  - functional
  - programing
---

Cách đây 6 tháng tôi vẫn còn chưa biết gì về Functional Programming, đọc báo thấy mấy bài phản đối phong cách lập trình kiểu này. Vậy mà bây giờ, sau khi tiếp xúc với ReactJS, bắt đầu tìm hiểu về Functional Programming, lại thấy có vài cách viết code tương đồng với những gì tôi đã nhìn và làm với D3.js. Hôm nay đọc về "*Higher-order function*", cảm giác có chút phấn khích, nên quyết ghi chú vài dòng về nó.

### Higher-order function là gì?

Bình thường khi định nghĩa hàm, ta thường để hàm nhận tham số là các value, hoặc object, rồi trả về hoặc values, hoặc object. Nói nôm na, là hàm ăn value/ object, rồi đẻ ra value/ object. 

Với "**Higher-Order Function (HOF)**", tham số kia có thể làm hàm, và kết quả trả về lại là một hàm khác. Vậy vụ này khác rồi, **hàm ăn hàm, rồi đẻ ra hàm**. 

Ví dụ từ quyển [Functional Programming in JavaScript của Luis Atencio](https://www.manning.com/books/functional-programming-in-javascript) nhé:

```javascript
// "operation" có nghĩa là "phép toán" trong Toán học 
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const multiplier = (a, b) => a * b;

applyOperation(2, 3, multiplier); // output: 6;
```

Bình thường, nếu được giao nhiệm vụ tạo hàm nhân hai số, mình chỉ dừng lại ở việc viết hàm `multiplier()`. Nhưng ở đây, hàm `multiplier()` lại chỉ là tham số cho hàm `applyOperation()`, có mức độ khái quát hóa cao hơn. Nếu sau này cần áp dụng phép chia chẳng hạn, ta chỉ cần khai báo `const divider = (a, b) => a / b;`, rồi gọi `applyOperation(2, 3, divider)` (tạm bỏ qua vụ chia cho `0`). 

Hàm `applyOperation()` nhìn từ góc độ khái quát, thì nó ở trên `multiplier()`, hay `divider()` một bậc. Đó là lý do tại sao nó gọi là "higher-order" (chém thế thôi, tôi đoán vậy). 

### Cách viết truyền thống (có thể) là vấn đề cho người ... đến sau

Nếu chỉ dừng đến đây thì tất cả sẽ thắc mắc là HOF chẳng có lợi ích gì, cứ theo truyền thống mà khai báo hàm nhận tham số là value hay object thôi. Tuy nhiên, hãy xem ví dụ phức tạp hơn một chút sau, để thấy HOF giúp ta gì. 

Giả sử ta có 1 mảng chứa 3 object (`[person1, person2, person3]`), mỗi object mô tả 1 người, bao gồm Donal Trump, Kim Jong Un, và Sơn Tùng MTP. Mỗi object có 1 property là "country". Việc của ta là viết 1 hàm để:
1. Việc 1: tìm trong mảng trên, đồng chí nào có "country" là "Vietnam", 
2. Việc 2: in ra object tương ứng của đồng chí đó. 

Nếu theo cách viết truyền thống, ta sẽ viết như sau:

```javascript
function printPeopleInVietNam(people) {
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
    if (thisPerson.country === "Vietnam") {
      console.log(thisPerson);
    }
  }
}

const listOfPeople = [person1, person2, person3];

printPeopleInVietNam(listOfPeople); // output: Son Tung MTP
```

Trường hợp muốn tổng quan hóa, tìm theo 1 nước khác thay vì cố định là Việt Nam thì sao? Thì đổi lại hàm `printPeopleInVietNam()` thành `printPeople()`. Hàm này không chỉ nhận tham số `people`, mà còn nhận tham số `country` nữa.

```javascript
function printPeopleInACountry(people, country) {
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
    if (thisPerson.country === country) {
      console.log(thisPerson);
    }
  }
}

const listOfPeople = [person1, person2, person3];

printPeopleInACountry(listOfPeople, "Vietnam"); // output: Son Tung MTP
```

Viết như thế trên lại dẫn đến vài câu hỏi:
- nó đã tổng quan hóa đủ chưa? Giả sử sau này (hoặc ta, hoặc cậu developer vào sau ta) muốn thay đổi:
  - Việc 1: Không tìm theo country nữa, mà lọc theo độ tuổi từ 35 - 40?
  - Việc 2: không `console.log()` nữa, mà `console.error()` cơ. Hoặc cùng là in ra, nhưng in bằng `alert()`, hoặc hiện vào 1 thẻ nào đấy trong HTML?
- Khi cần thay đổi, ta sẽ làm như thế nào? 
  - đọc từng dòng code để hiểu logic, 
  - xem đoạn nào tác động đến đoạn nào (tất cả đều lồng vào nhau chặt chẽ)
  - vừa điều chỉnh vừa kiểm tra từng tí một?

Nếu cả project chỉ có 1 vài trăm dòng code, thì làm trên không sao. Nhưng khi nó bắt đầu với chỉ từ 10 ngàn dòng thôi, việc đọc hiểu lại code cũ là cả 1 vấn đề (với chính tác giả của nó) chưa nói đến việc sửa nó.

### Higher-order function giúp code mạch lạc hơn, hỗ trợ người ... đến sau

Vậy thử sửa lại đoạn code trên một chút thành:

```javascript
function printPeople(people, action) {
  for (let i=0; i < people.length; i++) {
    action(people[i]);
  }
}

function action(person) {
  if(person.country === "Vietnam") {
    console.log(person);
  }
}

printPeople(listOfPeople, action);
```

À, bắt đầu trong sáng hơn. Hàm `printPeople()` nhận vào hàm `action()`, để trả về chính hàm `action()` đó, nhưng thực thi trên từng phần tử trong `people`. Nếu muốn thay đổi, ta biết ngay chỗ cần thay đổi là nội bộ hàm `action()`, bỏ qua phần `printPeople()`. Việc cô lập phần code phải xử lý này vừa khiến công việc nhanh hơn, lại ít tiềm ẩn nguy cơ gây lỗi hơn. Ta có thể sửa `action()` thành `filterAge()`, `filterGender()` tùy vào nhu cầu, rồi lại truyền vào `printPeople()`.

Tuy nhiên viết như vậy vẫn chưa rõ nghĩa, ta mới cô lập được "việc 1", mà chưa cô lập được "việc 2". Đừng nghĩ là "nó chỉ đơn thuần là `console.log()` thôi mà!" Nhỡ sao này nó lại là cả đoạn code gì phức tạp vài chục dòng thì sao?

Tác giả Luis Atencio gợi ý viết theo pattern như sau:

```javascript
function printPeople(people, selector, action) {
  people.forEach(function(person) { // "forEach" thay cho vòng lặp dùng "for"
    if (selector(person)) {
      printer(person);
    }  
  });
}

const inVietnam = person => person.country === 'Vietnam';

printPeople(people, inVietnam, console.log);
```

Viết thế này thì quá rõ ràng rồi:
- Chưa quan tâm đến đoạn bên trên, vừa nhìn vào dòng cuối `printPeople(people, inVietnam, console.log);`, bất kỳ ai sẽ hiểu mục đích của function này làm gì: "Lục tìm trong đám *people* xem có ai *inVietnam* không thì *console.log* đồng chí đó ra. 
- Muốn lọc ở Mỹ thay vì Việt Nam? viết thêm `const inUS = person => person.country === "US"` rồi truyền vào `printPeople()`. 
- Muốn không phải là `console.log()` object kia ra, mà là gán tên người vào thẻ HTML có `id` là "WhoAmI", thì viết 1 hàm `printToHTML()`, rồi lại truyền vào `printPeople()`:
    ```javascript
    const printToHTML = person => {
      document.querySelector("#WhoAmI").textContent = person.name;
    }

    printPeople(people, inUS, printToHTML);
    ```

Wow! Mạch lạc, có ngữ nghĩa, dễ tìm phần mình cần điều chỉnh, dễ test cho từng phần nhỏ một. Tham số truyền vào cho `printPeople()` đi theo trình tự logic (có thể nói là 1 pattern cần nhớ, nếu không muốn nói cần học thuộc lòng trong giai đoạn đầu):
1. Cung cấp "nhóm" cần khảo sát --> chính là `people`
2. Khoanh vùng đối tượng cần xử lý --> chính là nhờ `selector`. 
3. Áp dụng hành động gì đó với đối tượng khoanh vùng --> chính là nhờ `action`

Tôi cứ nghĩ là tác giả dừng đến đây, hóa ra vẫn còn một phương án nữa, ấn tượng nhất, đó là:

```javascript
people.filter(inCountry("Vietnam")).map(console.log);
```

Yeah, nếu viết được như thế trên thì không còn gì để nói nữa. Nhưng tác giả dùng thêm một khái niệm là "lense", quá phức tạp ở đây.

### Kết luận:

Higher-order function quả thực đem đến 1 luồng gió mới giúp ta viết code mạch lạc, rõ ràng hơn. Nhưng nó cũng yêu cầu ta phải tư duy theo kiểu khác. Tư duy theo kiểu gì? làm thế nào có được tư duy trên? Tạm thời ta cứ bằng lòng với "thinking pattern" 3 bước như nói ở trên, chia tách, viết hàm dựa theo đúng pattern đó khi thấy điều kiện cho phép (tự cảm nhận). Sẽ cần thực hành, va vấp nhiều hơn để trở nên thuần thục hơn với functional programing nói chung và HOF nói riêng, và kết hợp nhuần nhuyễn với lập trình hướng đối tượng, lập trình phương thức truyền thống. 