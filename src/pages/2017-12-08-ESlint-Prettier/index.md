---
id: 114
title: 'ESlint, Prettier và VS Code'
date: 2017-12-08
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - linting
  - linter
  - style
  - eslint
  - prettier
---

Cuối cùng cái ngày định mệnh đó cũng đã đến. Tôi đã code xong phần của mình, trong dự án đầu tiên của cuộc đời lập trình viên. Không gì sung sướng bằng việc ngắm code của mình chạy ngon lành trên máy. Còn giờ là lúc commit lên git để team leader review, rồi merge vào codebase. Nhưng đời không dễ như mơ, làm theo hướng dẫn của đồng nghiệp, động tác đầu tiên trước khi `commit` là `npm run build` để kiểm tra xem code của tôi có vấn đề gì ko. Tự nhủ trong lòng đã test kỹ càng, thì có vấn đề thế quái nào được. Ấy vậy mà vừa dứt Enter, dễ có phải đến vài trăm dòng xổ ra bắt lỗi từng li từng tí của không dưới 5 file ```JavaScript```. Đại loại cứ cái gì tôi đụng vào là có lỗi. Lỗi gì? Giời ơi toàn lỗi giời ơi đất hỡi:
- Không lùi vào đủ 5 ```tab``` mà chỉ có 4 ```tab```
- Sau ký tự cuối cùng của dòng vẫn còn khoảng trắng (`space`)
- Dùng `var` thay vì dùng `let`, dùng `let` thay vì `const` ở những chỗ mà giá trị của biến chỉ được gán một lần. 
- Sau khai báo `let` và `const` không có dòng trống.
- Dùng cách viết function thông thường thay vì dùng arrow function (hàm mũi tên).
- Sử dụng `console.log`
- v.v.

Rất tiếc là lúc đấy quá hoảng loạn tôi đã không chụp lại màn hình để các bạn mới vào nghề hiểu được cái sự "_vài trăm dòng báo lỗi_" nó kinh hoàng như thế nào.

Quay ra hỏi đồng nghiệp là chuyện vớ vẩn gì đang xảy ra!!!!. Nhận được cái nhìn đầy thương cảm, được giải thích rằng codebase của công ty đã tích hợp với [`ESlint`](https://eslint.org/), một công cụ để kiểm tra định dạng và chất lượng code theo `ES6`, để đảm bảo rằng code của từng người trước khi đưa lên server phải được sửa cho thống nhất với quy chuẩn. Quy chuẩn (JavaScript Style Guide) ở công ty này là theo [quy chuẩn của Airbnb](https://github.com/airbnb/javascript). Lòng ngậm ngùi, không có cách nào khác là phải sửa code của mình bởi đấy là quy định bắt buộc. 

Sau khoảng gần 1h ngồi sửa từng lỗi một theo thông báo chạy ra từ `npm run build`, tôi bắt đầu nản. Bởi có nhiều lỗi khiến mình phải xóa dòng, mà xóa dòng thì chỉ mục của phần thông báo lỗi kia lại không dùng được nữa (số dòng bị lệch). Vậy là tôi thử google, tìm được cách cài `ESlint` như một extension vào [`Visual Studio code`](https://code.visualstudio.com/), từ đó dù chưa chạy `npm run build` thì `vs code` cũng tự báo ngay cho tôi trên cửa sổ soạn thảo những chỗ định dạng cần phải thay đổi. Thậm chí sau khi `turn on` chế độ "_sửa ngay sau khi nhấn Save_", rất nhiều lỗi đã được `vs code` _auto fix_, rất tiện. Với sự giúp đỡ của `ESlint extension` này, tôi xử lý được toàn bộ các lỗi còn lại trong vòng 30 phút, thay vì dành cả chiều cho nó. Một cảm giác thật dễ chịu. 

Nhân vụ này, tôi thử tìm hiểu về `ESlint` xem nó là gì. Và khi `ESlint` còn chưa xong, lại lòi ra thêm 1 anh tên là [`Prettier`](https://prettier.io/), cho nên tôi viết luôn vào bài này để tiện so sánh 2 công cụ đắc lực cho anh em lập trình. Dưới đây là chi tiết các câu hỏi mà tôi đặt ra khi tìm hiểu về 2 cộng cụ đó. 

## ESlint là gì?
---
![logo ESlint][img01]

ESLint là một chương trình mã nguồn mở, theo thuật ngữ tiếng Anh là _JavaScript **linting utility**_ do Nicholas C. Zakas viết ra vào tháng Sáu 2013. _Code linting_ là một dạng phân tích tĩnh (_static analysis_) thường được sử dụng để tìm những patterns hoặc code có vấn đề. Việc đánh giá code có vấn đề hay không sẽ căn cứ vào những quy chuẩn về cách viết code đã thống nhất từ trước (trong nội bộ nhóm, nội bộ công ty, hay ngành nhỏ). Hầu hết các ngôn ngữ lập trình đều có các công cụ _code linters_ riêng, và trình biên dịch của ngôn ngữ đó thường đi kèm việc _linting_ ngay trong quá trình biên dịch.

[Source: ESLint Documentation - About](https://eslint.org/docs/about/)

## Linting utility là gì?
---
Trong lĩnh vực lập trình máy tính, _lint_ là một ứng dụng Unix giúp cảnh báo các vấn đề khi viết code của ngôn cữ _C_. Nói rộng ra, _lint_ hoặc _linter_ là công cụ giúp phát hiện và cảnh báo các sai sót khi viết ngôn ngữ lập trình, bao gồm cả các vấn đề liên quan đến định dạng (như dấu chấm phẩy, xuống dòng, lùi vào đầu dòng, v.v.). Các công cụ này thường thực hiện phép _phân tích tĩnh (static analysis)_ các đoạn code.

Rộng hơn nữa, _Lint_ còn được sử dụng để phân tích các khác biệt về mặt cú pháp trong lập trình, đặc biệt với các ngôn ngữ thông dịch như JavaScript và Python. Ví dụ nhé: các công cụ lint hiện đại thường giúp lập trình viên kiểm tra xem định dạng code của họ có nằm trong quy định chung của ngành/ của công ty/ của nhóm hay không. Bởi vì những ngôn ngữ thông dịch kia thiếu một quá trình biên dịch giúp phát hiện lỗi trước khi thực thi, cho nên các công cụ lint hoạt động như một chương trình debug đơn giản cho các lỗi thông thường (viết sai cú pháp chẳng hạn), hoặc cho các lỗi khó mà tìm thấy (thuật ngữ cho loại lỗi này là _heisenbugs_).

[Source: Wikipedia - lint (software)](https://en.wikipedia.org/wiki/Lint_(software))

### Phân tích tĩnh (static analysis) là gì?
---
_Phân tích tĩnh_ là phép phân tích xem một chương trình sẽ hoạt động như thế nào trong khi không hề thực thi chương trình đó. Cách phân tích này khác với phép _phân tích động (dynamic analysis)_ cần phải chạy chương trình thì mới biết nó hoạt động ra sao. Thuật ngữ _phân tích tĩnh_ thường được dùng cho các phép phân tích bằng công cụ tự động với mục đích review code (và còn một vài mục đích khác như programing understanding, program comprehension).

[Source: Wikipedia - Static program analysis](https://en.wikipedia.org/wiki/Static_program_analysis)

## Lợi ích của ESlint là gì?
---
- Giúp ngăn ngữ một vài loại bug, bao gồm cả những loại bug đem loại rất nhiều phiền hà cho quá trình gỡ lỗi, khiến chương trình không chạy được.
- Tiết kiệm thời gian của lập trình viên.
- Giúp việc viết code ngon lành hơn.
- Dễ dàng sử dụng.

## Vậy ESlint giúp xử lý vấn đề gì của code của chúng ta?
---
Chương trình này sẽ giúp cảnh báo các kiểu viết code trông "không hợp nhãn" về cả phía con người lẫn phía trình biên dịch của JavaScript.

- Vấn đề #1: _Code chạy ngon lành lúc phát triển, còn khi release sản phẩm thì lỗi_. Tại sao? Ví dụ nhé: Giả sử bạn thiếu một dấu chấm phẩy trong đoạn code JavaScript thì việc chạy chương trình trên browser vẫn ổn. Nhưng lúc _minified_ đoạn code đó để đóng gói sản phẩm, thì mấy công cụ giúp _minification_ lại không báo cho bạn biết dấu chấm phẩy nào bị thiếu. Một khi code đã bị _minified_, thì trình duyệt lúc này lại đỏng đảnh không chấp nhận lỗi nào, bao gồm cái lỗi mà nó vốn bỏ qua với code nguyên bản.

- Vấn đề #2: _Xung đột phạm vi biến (Scope)_. Ví dụ nhé: Chắc chắn code của bạn sẽ có 1 đống biến đặt tên là "id", "name", hoặc "value". Không chỉ bạn, mà ai trong nhóm của bạn cũng đặt tên như thế. Ok, một ngày đẹp trời, đứa đồng nghiệp trong nhóm vô tư bắt đầu việc khai báo biến với từ khóa _var_, thế là biến của hắn có nguy cơ ghi đè giá trị lên biến cùng tên của bạn, thế có nguy hiểm không? Bởi lúc mà chương trình lỗi thì không hiểu là cái lỗi chết tiệt đó nó ở chỗ nào. Điều này sẽ xảy ra. Và người ta thì sẽ luôn luôn quên mất là không được dùng _var_. Bạn cũng thế. Thế giới vẫn quay và bạn vẫn sẽ luôn ngồi tìm và sửa bug.   
- Vấn đề #3..N: Còn nhiều còn nhiều nữa.

Việc "_linkting_" code JavaScript còn giúp bạn tránh được các lỗ hổng bảo mật thông dụng (như XSS), vấn đề liên quan đến "viết code sao cho dễ đọc dễ nhìn", v.v.

[Source: Javascript Linting: What Developers Need to Know](http://mikecavaliere.com/javascript-linting-what-developers-need-to-know/)

## Cách dùng ESLint với vs code?
---
Có các cách sử dụng ESlint nào?
- Trong code editor
- Command line
- Build process

![ESlint alert][img02]

![ESlint alert][img03]

![ESlint alert][img04]

![ESlint alert][img05]

![ESlint alert][img06]

## Sử dụng ESlint phức tạp không?
---
Nếu cài đặt ESlint như một extension với VS Code thì khá dễ. Nhưng cài cho node.js và chạy trên toàn bộ project thì trông có vẻ phức tạp với người mới. 

## Ngoài ESlint ra còn có công cụ nào tương tự?
---
## Prettier là ông nào?
---
> Note: Trong tiếng Anh, _pretty_ (tính từ) nghĩa là đẹp, còn _prettier_ (tính từ so sánh) nghĩa là (một cái gì đó) đẹp "hơn". 

**Prettier** là một công cụ giúp format code của bạn cho _đẹp_ hơn. _Đẹp_ ở đây hoàn toàn mang quan điểm chủ quan của tác giả chương trình này (thế nên nó mới được gọi là "_an opinionated code formatter_"). Chương trình này sẽ yêu cầu code của bạn phải theo một format nhất định và thống nhất, thực hiện qua quá trình "parsing" và "re-printing" toàn bộ code của bạn dựa trên những quy tắc nào đó, ví dụ ngắt dòng, thêm/ bớt ngoặc tròn ngoặc nhọn khi cần.

### Vậy chạy **Prettier** xong thì trông nó như thế nào?
---
Code ban đầu:

{% highlight javascript linenos%}
foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());
{% endhighlight %}

Code sau khi được Prettier parse và re-print:

{% highlight javascript linenos%}
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
{% endhighlight %}

![Prettier before after][img10]


[Source: Prettier - Opinionated Code Formatter](https://github.com/prettier/prettier/blob/master/README.md#how-does-it-compare-to-eslint-or-tslint-stylelint)

## Parsing code là gì?
---
Theo Kyle Sympson (tác giả của "You Don't Know JS"), **parsing** là một _"quá trình phân tích cú pháp cho đoạn code"_ thực hiện bởi trình biên dịch. Quá trình này lấy đầu vào là 1 _chuỗi các tokens_, ghép chúng lên các nhánh trông như dạng cây, mục đích là để biểu diễn cấu trúc ngữ pháp của chương trình. Do trông như hình cây, nên cách biểu diễn này được gọi là <b>A</b>bstract <b>S</b>yntax <b>T</b>ree (viết tắt là "**AST**", dịch nôm là "_Cây Cú pháp Trừu tượng_"). 

Vậy _tokens_ là gì? Hiểu nhanh nhất là với đoạn `var a = 2;` thì trình biên dịch sẽ chia đoạn đó ra thành các phần tử nhỏ hơn, bao gồm `var`, `a`, `=`, `2`, và `;`. Mỗi phần tử "có nghĩa" kia, khi đã chia nhỏ nhất có thể, thì được gọi là 1 **token**. Quá trình _parsing_ sẽ giúp "treo" các _tokens_ kia lên _cây_ AST, trông nó sẽ giống như hình minh họa dưới đây. 

Hình minh họa cho **AST** bên dưới lấy từ bài "_An Introduction to Speculative Optimization in V8_" (Ponyfoo.com)

Đoạn code trước khi được _parsing_:
{% highlight javascript linenos%}
 function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
{% endhighlight %}

Cây Cấu trúc Trừu tượng (AST) hình thành bởi đoạn code kia sẽ trông như sau:

![parsing code][img08]

Source:
- [An Introduction to Speculative Optimization in V8](https://ponyfoo.com/articles/an-introduction-to-speculative-optimization-in-v8)
- [You Don't Know JS - Scope and Closure](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)

## Re-printing code là gì?
---
Tạm hiểu _re-printing code_ là chương trình **Prettier** sau khi lấy toàn bộ code, cho đi qua quá trình **parsing**, thu lại được một cây AST nhìn từ góc độ của trình biên dịch JavaScript, từ đó "_in ra_" cây AST đó vào trình soạn thảo. Việc này sẽ giúp việc trình bày code trong trình soạn thảo có cấu trúc giống với cách mà trình biên dịch nhận thức.

## Tại sao cần Prettier?
---
1. _Xây dựng và cưỡng chế việc sử dụng 1 định dạng code chung_

Ghi chú: Trong văn cảnh của xã hội Việt Nam hiện tại (2017), từ _"cưỡng chế" (enforce)_ nghe không được tích cực cho lắm. Nhưng với môi trường làm lập trình, thuật ngữ này được hiểu một cách trung tính hơn. 

Với Prettier, động lực lớn nhất để chương trình này ra đời chính là để chấm dứt mọi tranh cãnh liên quan đến định dạng (hay là cách) viết code. Cho đến lúc này, hầu hết các lập trình viên đều đồng ý với nhau rằng tất cả nên viết code theo một quy ước chung. Việc này mặc dù đem lại hiệu quả cho công việc của nhóm, nhưng cũng mất thời gian, không phải là thứ gì thú vị, và nhiều khi rất ức chế (vì thường ai cũng có xu hướng viết code để chạy được, vậy mà vẫn bị "nhắc nhở" phải viết code kiểu thế này chứ không phải thế kia).

2. _Giúp đỡ những người mới_

Theo một cách rất tự nhiên, chính những người có kinh nghiệm với JavaScript và quen thuộc với hệ thống source code của công ty lại là người giới thiệu và sử dụng Prettier. Tuy nhiên, người hưởng lợi nhất ở đây lại là những tân binh (tân binh đối với hệ thống source code của công ty). Ai đó lại cho rằng Prettier chỉ hữu ích với người mới với kinh nghiệm hạn chế, nhưng thực ra nó có ích với cả những người giàu kinh nghiệm mới gia nhập công ty, vốn quen với cách code ở hệ thống cũ, hoặc quen với ngôn ngữ lập trình khác.

3. _Giúp tập trung vào việc viết code thay vì mất thời gian vào ngồi căn chỉnh định dạng code_

Với một lập trình viên chuyên nghiệp, ngoài thời gian viết code thì thời gian chỉnh sửa code để "trông cho đẹp, chuẩn" cũng không hề nhỏ, và tốn sức lực. Một khi Prettier được tích hợp vào trình soạn thảo, mỗi lần nhấn Save là đoạn code đã được format đúng theo quy định. 

4. _Dễ dàng được cộng đồng lập trình chấp nhận_

Prettier tổng hợp và sử dụng những quy chuẩn code ít bị tranh cãi nhất trong cộng đồng, điều này giúp tránh đi những xung động không cần thiết, code mới dễ dàng được chấp thuận bởi đồng nghiệp. 

5. _Format lại toàn bộ source code hiện tại_

6. _Thể hiện đẳng cấp theo kịp thời đại_

[Source: Why Prettier?](https://prettier.io/docs/en/why-prettier.html)

## Có ESlint rồi còn cần Prettier để làm gì?
---
Nhìn vào hình bên dưới, có thể thấy mặc dù **Prettier** có dẫm chân vào 1 mảng mà **ESlint** đang làm, nhưng trong khi **ESlint** chỉ dừng ở mức độ cảnh báo, thì **Prettier** lại "hành độ", trả lại code đã được format theo chuẩn. Bản chất cơ chế hoạt động của 2 bên cũng khác nhau, nếu như **ESlint** dùng cơ chế "static analysis" thì **Prettier** lại "parsing code" vào JavaScript engine rồi in lại ra editor.  

![ESlint vs Prettier][img09]

## Quan điểm của tác giả Prettier về thế nào là "code đẹp"?
---
Muốn được coi là "đẹp" thì code phải thỏa mãn những tiêu chuẩn sau:

- Phải thống nhất: 
- Phải chuẩn: code được format theo định dạng của hàm thì phải thực thi như một hàm. 
- Phải có khoảng trắng, chỗ nào là lùi đầu dòng, bao nhiêu tab, etc. Không nên mỗi đoạn code một kiểu. 
- Phải có chuỗi đặt trong ngoặc kép.
- Phải có ngoặc đơn với số lượng tối thiểu
- Phải có dòng trống
- Phải viết objects với properities và values ở nhiều dòng

Prettier không quan tâm đến những gì?
- Biết ngoặc đơn hoặc ngoặc kém thành "template literals" (`${}`) hoặc ngược lại.
- Thêm, bớt dấu `{}` và `return` trong trường hợp không bắt buộc
- Biến `?:` thành `if then else`.

[Source: Prettier- Rationale?](https://prettier.io/docs/en/rationale.html)

## Có cách nào để chạy Prettier?
---
Prettier có thể được chạy qua những cách sau:
- Trong trình soạn thảo sau mỗi lần nhấn "save"
- Đính kèm vào quy định commit code 
- Trong mỗi trường dòng lệnh để xử lý hệ thống source code hiện tại.

Để cài Prettier cho Visual Studio Code, bạn có thể đọc ở link sau: https://github.com/prettier/prettier-vscode

Hoặc truy cập trực tiếp vào [Visual Studio - Marketplace: Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) để cài Prettier vào như 1 extension


## Tham khảo chung
---
- [Hackernoon - How linting and ESLint improve code quality](https://hackernoon.com/how-linting-and-eslint-improve-code-quality-fa83d2469efe)
- [Configure Prettier and ESLint in Visual Studio Code
](https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/)
- [Medium - Even faster code formatting using ESLint](https://medium.com/@netczuk/even-faster-code-formatting-using-eslint-22b80d061461)
- [Medium - Your last ESLint config](https://medium.com/@netczuk/your-last-eslint-config-9e35bace2f99)
- [Configure ESLint In Visual Studio Code](http://shripalsoni.com/blog/configure-eslint-in-visual-studio-code/)

[img01]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-01.png
[img02]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-02.png
[img03]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-03.png
[img04]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-04.png
[img05]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-05.png
[img06]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-06.png
[img07]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-07.png
[img08]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-08.png
[img09]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-09.png
[img10]: https://ngminhtrung.github.io/images/PostIMG/20171208-img-10.png

