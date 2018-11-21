---
id: 103
title: 'Title'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

https://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

Is it ever possible that (a ==1 && a== 2 && a==3) could evaluate to true, in JavaScript?

This is interview question asked by a major tech company. It happened 2 weeks back, but I'm still trying to find the answer. I know we never write such code in our day to day job, but I'm curious.

snacky [1:22 PM]
Như thế, vụ `a == 1 && a == 2 && a == 3` có thể xảy ra vì trong trường hợp này, nó rơi vào case so sánh một `Object` và một `Number` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using)
.
Khi đó thì JS sẽ gọi hàm `ToPrimitive(a)`, thực tế là hàm `a.toString` hoăc `a.valueOf`, và nếu ta implement `a` như này:

```i = 0;
a = { toString: () => ++i };
// hoặc
a = { valueOf: () => ++i };
```

Thì giá trị `i` tăng dần sau 3 phép so sánh:

```(a == 1) // i tăng lên 2
(a == 2) // dẫn đến cái này đúng, và i tăng lên 3
(a == 3) // dẫn đến cái này đúng, và i tăng lên 4
```
(edited)
Mozilla Developer Network
Equality comparisons and sameness
There are four equality algorithms in ES2015:

Kinh nghiệm rút ra là khi được hỏi câu hỏi này, phải xét về trường hợp phép so sánh `==` hoạt động như thế nào. Và xem tính chất đó có thể bị can thiệp như thế nào.

Quả thật là sự lợi hại của một dynamic programming language (~ngôn ngữ lập trình quy hoạch động~ :facepal

và đây cũng là 1 lý do để dùng `===` vì nót ít "flexible" hơn `==`, nên nó an toàn hơn

namnn [1:44 PM]
ko phải js mà cả ngôn ngữ nào dùng `==` đều chậm hơn `===`

[1:45 PM]
nếu true ko sao, false nó so sánh các kiểu với nhau. Mất nhiều phép tính

[1:45 PM]
giả sử a==b

[1:46 PM]
đầu tiên nó lấy a (int) compare với b (int)

[1:46 PM]
nếu fale nó lại lấy a (string) compare b (int)

[1:46 PM]
cứ thế. ngôn ngữ nào càng nhiều kiểu dữ liệu thì mất càng nhiều phép tính

[1:47 PM]
đếu khi true thì nó sẽ không so sánh nữa

snacky [1:47 PM]
đâu phải nhỉ


namnn [1:47 PM]
hoặc nó sẽ chạy qua 1 loạt kiểu dữ liệu rồi mới trả về false


snacky [1:47 PM]
`==` nó matching theo type, nếu type khác nhau thì nó làm như cái bảng trong cái link e mới gửi đấy

[1:47 PM]
lúc đó nó convert thẳng bằng cách dùng `toString` hoặc `valueOf` luôn

[1:48 PM]
còn `===` thì cứ mặc định khác type là nó false rồi


namnn [1:51 PM]
thì việc `==` nó phải mất công chuyển đổi kiểu dữ liệu mà

[1:51 PM]
việc `===` nó đâu mất công đoạn chuyển đổi đấy


snacky [1:52 PM]
uhm vụ này thì công nhận, chỉ có khúc convert cho tới hết của bác là e thấy ko đúng thôi

[1:52 PM]
còn @Giang Nguyen

[1:52 PM]
vào đây nào

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
