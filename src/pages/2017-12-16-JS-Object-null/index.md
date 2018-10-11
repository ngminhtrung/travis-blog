---
id: 116
title: '[JavaScript] Khi Object được tạo từ hư vô'
date: 2017-12-16
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - D3.js
  - Data Visualization
  - job
  - data join
---

Ghi chú: Tiêu đề hoàn toàn mang tính câu view

### Tại sao lại có bài viết này?

Một ngày đẹp giời tôi cần kiểm tra thuộc tính của 1 object trước khi thực hiện một vài thao tác khác. Theo thói quen từ lúc đi học, cú pháp rất thông dụng `obj.hasOwnProperty(tên-thuộc-tính-cần-kiểm-tra)` sẽ được dùng, trả về `true` nếu `obj` của ta đúng là có thuộc tính kia, trả về `false` trong trường hợp ngược lại. Ấy vậy mà cú pháp này bị ESlint (một công cụ linting trong JavaScript mà các công ty hay dùng) báo lỗi. Thử ví dụ sau nhé:

{% highlight javascript%}
let obj = {
  name: "Nguyen Minh Trung",
  skill: "JavaScript"
};

let hasSkill = obj.hasOwnProperty("skill");
{% endhighlight %}

 Với ESlint, dòng code trên là chưa đạt "chuẩn", một khi không sửa thì nó sẽ không cho _build_ project. Lỗi đây:

![alt text][image01]{: .center-image }

ESlint phân loại lỗi trên vào dạng ["_Disallow use of Object.prototypes builtins directly (no-prototype-builtins)_"](https://eslint.org/docs/rules/no-prototype-builtins). Phải sửa như sau:

{% highlight javascript%}
// Viết chưa chuẩn --> báo lỗi

let hasSkill = obj.hasOwnProperty("skill");

// Viết CHUẨN

let hasSkill = Object.prototype.hasOwnProperty.call(obj, "skill");
{% endhighlight %}

Chú ý là `Object` khác với `obj`. Trong ảnh ở trên tôi viết là `object`, tuy vẫn đúng nhưng để cho dễ phân biệt, tôi đã sửa lại trong bài viết này thành `obj` (còn ảnh thì lười quá để tạm).

Ví dụ này rất bình thường mà đúng ko? Có gì sai đâu? Giản dị vô cùng chẳng có gì lắt léo hay sai ngữ pháp cả. Nhưng tại sao?!

### Tại sao ESlint lại bắt lỗi "no-prototype-builtins" trên?

Thấy việc bắt lỗi này khá là kỳ quặc, tôi tra documentation của ESlint thì thấy họ ghi như sau:

> In ECMAScript 5.1, Object.create was added, which enables the creation of objects with a specified [[Prototype]]. Object.create(null) is a common pattern used to create objects that will be used as a Map. This can lead to errors when it is assumed that objects will have properties from Object.prototype. This rule prevents calling Object.prototype methods directly from an object.

Dịch nôm na có nghĩa là:

> Kể từ ECMAScript 5.1, `Object` có thể được tạo ra bằng cú pháp `Object.create()`. Object mới tạo ra sẽ có property `__proto__`, property này sẽ là **object** (object bên trong object) hay là **null** thì tùy thuộc vào tham số truyền vào lúc gọi `Object.create()` của lập trình viên. Từ đây nảy sinh ra việc lập trình viên sử dụng `Object.create(null)` để tạo `Map` (cũng là 1 dạng object, nhưng đặc biệt hơn). Điều này tiềm ẩn nguy cơ gây lỗi bởi thông thường nếu không phải là tác giả của đoạn code gốc thì chúng ta sẽ mặc nhiên cho rằng: "đã là objects thì sẽ có thuộc tính (tức là `properties`) từ `Object.prototype`, rồi cứ thế tìm cách gọi trực tiếp các methods của `Object.prototype`", dẫn đến báo lỗi. Quy định này (của ESlint) cho phép ngăn chắn các lỗi kiểu trên.

Đoạn trên đọc thì chưa hiểu gì! Chỉ biết đại loại là ESlint cho rằng ta không nên viết code như dưới đây:

{% highlight javascript%}
var hasBarProperty = foo.hasOwnProperty("bar");

var isPrototypeOfBar = foo.isPrototypeOf(bar);

var barIsEnumerable = foo.propertyIsEnumerable("bar");
{% endhighlight %}

mà nên viết là: 

{% highlight javascript%}
var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
{% endhighlight %}

### Ok, cứ tạm thế đã. Vậy cách tạo object thông qua Object.create() nghĩa là sao? Lại còn Object.create(null) nữa chứ!!!

Bình thường nhất, chúng ta đều được hướng dẫn 2 cách sau được dùng để tạo object:
- 1 là sử dụng toán tử `new` với object constructor: `new Object()`. Cách này cá nhân tôi ít dùng.
- 2 là sử dụng `object literal` (chính là 2 dấu ngoặc nhọn {     }), ví dụ: `xeHonda = {type: "AirBlade"}`.

Hóa ra vẫn còn 1 cách nữa, đó là dùng `Object.creat()`. Bạn có thể xem chi tiết về cách dùng `Object.creat()` ở [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), và một vài ưu điểm của nó ở [đây](https://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html).

Trong bài này, chúng ta tập trung vào `Object.create(null)` thôi. Thử luôn trong _Chrome Dev_ nhé:

{% highlight javascript%}
var obj1 = Object.create(null),
    obj2 = {};
{% endhighlight %}

Soi thử xem từng object chứa gì?

![alt text][image02]{: .center-image }

Lạ quá phải không!!! `obj1 = Object.create(null)` lại tạo ra 1 object trống rỗng không có tí properties nào. Bạn `obj2` tưởng là cũng trống rỗng vậy mà vẫn có property tên là `__proto__` được sinh ra. Điều này nghĩa là sao?
- Tất cả các objects được sinh ra trong JavaScript đều có tối thiểu 1 property tên là `__proto__` với các *properties* và *methods* bên trong được thừa kế từ 1 ông tổ tên là `Object`, chưa cần bạn khai báo thêm gì cả. 
- Ngoại lệ xảy ra khi bạn truyền tham số `null` như cách trên, lúc này thì object của chúng ta **thực sự trống rỗng** bởi nó không thừa kế từ bất cứ cái gì.

### Nếu đã trống rỗng như thế thì Object.create(null) sinh ra để làm gì?

Liệu mấy bác ngồi viết ECMAScript có rỗi việc không ạ? Bản thân tôi chưa có câu trả lời cho câu hỏi này. Nhưng *David Walsh* (một lập trình viên người Mỹ làm cho Mozilla) đã viết trong bài [Object.create(null)](https://davidwalsh.name/object-create-null) như sau:

> `Object.create` là một cách tuyệt vời để tạo object với prototype. Nhưng vấn đề là nó tạo ra `__proto__` thừa kế mọi properties từ ông tổ `Object`, mà ông tổ này thì hoàn toàn có thể bị chọc ngoáy sửa đổi. Bạn sẽ làm gì nếu chỉ đơn thuần muốn tạo ra 1 object mới, và không cho nó bị thay đổi từ bên ngoài?  Bạn có thể đạt được điều này với `Object.create(null)`.

Xem đoạn code sau:
{% highlight javascript%}
let obj = {}

Object.prototype.sayHello = () => {console.log("Hello")};

obj.sayHello() // return "Hello"
{% endhighlight %}

Theo Davis Walsh, anh không muốn tạo ra object tên là _obj_, rồi sau đó "bỗng dưng" _obj_ lại mọc thêm 1 method `sayHello` chỉ bởi "ở đâu đó" người khác thay đổi ông tổ  `Object` thông qua `Object.prototype`.

Một khi _obj_ được tạo bằng `Object.create(null)`, thì nó chẳng có `prototype` nữa để mà bị kế thừa từ `Object`. Thử nhé: 
{% highlight javascript%}
let obj2 = Object.create(null)

Object.prototype.sayILoveYou = () => {console.log("I love you")}

obj2.sayILoveYou() // Uncaught TypeError: obj2.sayILoveYou is not a function
{% endhighlight %}

Và *Dmitry Pashkevich* (cũng là 1 lập trình viên người Mỹ đang làm cho Lucid Chart) trong bài [Object.create(null)](https://coderwall.com/p/dmkwqa/object-create-null) đã khẳng định thêm ý của David Walsh ở trên:

> Đôi khi bạn muốn dùng một object JavaScript làm `hash map` (chỉ đơn thuần là lưu trữ dữ liệu), lúc đó bạn sẽ cần object tạo ra từ `Object.create(null)`. 
>
> Object này khác biệt so với object tạo từ `var data = {}` ở chỗ bạn sẽ nhận được 1 object sạch, không kế thừa từ bất cừ thứ gì (tức là không có prototype). Ưu điểm? Không *properties*, không *constructor*, không *toString*, không *hasOwnProperty*, v.v. để bạn được tự do sử dụng các *keys* mà bạn cần.
>
> Đương nhiên ngay cả với các objects tạo theo kiểu `var data = {}` thông thường thì bạn cũng không nên đụng đến các từ khóa đã được JavaScript sử dụng. Nhưng sẽ thế nào nếu bạn cần xây dựng một tập các phần tử (dạng *map*) với *keys* ngẫu nhiên được nhập vào bởi người dùng, hoặc từ những API của bên thứ 3? Chỗ này chính là nơi dụng võ của `Object.create(null)`!

### Bên cạnh vụ Object.create(null), còn "map", nó là gì?

Theo Mozilla Developer, object kiểu **map** chứa một hoặc nhiều các cặp "key-value". *Key* và *value* có thể mang bất kỳ giá trị nào (cho dù là object hay các primitive values). Chi tiết về mục này ở [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Do phần về *map* dài nên sẽ không được nói đến ở đây. Ngoài tài liệu bằng tiếng Anh trên, có 1 tài liệu tham khảo tiếng Việt trên freetuts tên là [Collection Maps trong ES6](https://freetuts.net/collection-maps-trong-es6-612.html) tương đối dễ hiểu. 

### ESlint đã cập nhật quy định trên ra sao?

Sau một hồi phân tích, chắc chúng ta đều đã dần nhận ra đoạn mô tả lý do ESlint chặn cách viết code thông thường. Tuy vậy, khi đọc phần [thảo luận của ESlint team](https://github.com/eslint/eslint/issues/2693), thì quy định trên chỉ mới bắt đầu được đề xuất vào tháng 6 năm 2015. Có ý kiến phản đối, có ý kiến ủng hộ, và cũng phải mất gần 1 năm (tháng 5 năm 2016), quy định này mới chính thức thành hiện thực. Team ESlint đã trải qua quá trình trao đổi qua lại khá nhiều, thậm chí là phải bàn để thống nhất cả cái tên "*no-prototype-builtins*".  

Dưới đây là một trong những ý kiến cuối cùng tôi muốn trích lại đây để chuẩn bị gói lại bài viết này:
> Toru Nagashima (mysticatea): Tôi tin rằng quy định này tương đối quan trọng bởi việc thừa kế từ null là một thứ đặc biệt trong JavaScript. Tôi đoán, những người vốn quen với lập trình trong các ngôn ngữ khác, nhưng không làm nhiều với JavaScript, sẽ khó có thể tưởng tượng về khả năng không tồn tại của obj.hasOwnProperty. Một vài thư viện phổ biến (như querystring) vẫn đang dùng Object.create(null).

### Tóm lại

- Mỗi objects khi được tạo ra, bên cạnh những methods/properties do người dùng tạo ra (gọi là "*OwnProperties*"), thì còn có sẵn những methods/properties mà JavaScript gán cho nó (chính là những *prototype.properties*). Giống như một đứa trẻ mới sinh ra, tuy bố mẹ không dạy cho nó khóc - ăn - ngủ - đái dầm - ị đùn, thì bản năng con người vẫn cho nó các hành động như vậy. Còn trong JavaScript, vừa được tạo ra thì mỗi object đã mang trong mình các methods kiểu như `.hasOwnProperties()`, `isPrototypeOf()`, .v.v. 

- Tuy vậy, có những objects mà lập trình viên cố tình tạo ra để nó không có những methods/properties có sẵn nói trên (tức là không có cả `.hasOwnProperties()`, `isPrototypeOf()`, .v.v. ). Có người gọi đây là những objects "clean" (sạch), "naked" (trần chuồng/ nuy), v.v.  Các object đó được tạo từ `Object.create(null)`, không hề có `Object.prototype`.

- Một khi objects đã "clean", đã "nake" kiểu trên, thì gọi methods như `.hasOwnProperties()` hay `isPrototypeOf()` làm sao được? sẽ bị báo lỗi ngay.

- ESlint đã tạo ra một quy định để ngăn ngừa lập trình viên sử dụng những methods kia để tránh gặp lỗi.

- Nếu đã bật ESlint khi viết code, hãy nhớ tránh dùng:
  - `Object.prototype.hasOwnProperty(prop)`, 
  - `Object.prototype.isPrototypeOf(prop)`, 
  - `Object.prototype.propertyIsEnumerable(prop)`, 

  mà nên sử dụng:
  - `Object.prototype.hasOwnProperty.call(obj, prop)`, 
  - `Object.prototype.isPrototypeOf.call(obj, prop)`, 
  - `Object.prototype.propertyIsEnumerable.call(obj, prop)`;

- Để hiểu được những gì liên quan đến quy đình này thì cần hiểu rất nhiều thứ cơ bản khác như `Object`, `prototype`, các methods để kiểm tra sự tồn tại của property nào đó trong object (như dùng `hasOwnProperties`, dùng toán tử `IN`), hiểu về `map`, v.v. Từ đó mới thấy là kiến thức nhiều chỗ hổng lởm chởm như thế nào.  

### Tham khảo thêm

- [StackOverflow - Creating Js object with Object.create(null)?](https://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull)

- [How do I access the Object.prototype method in the following logic?](https://stackoverflow.com/questions/39282873/how-do-i-access-the-object-prototype-method-in-the-following-logic)

- [Sweet Naked Objects](https://glebbahmutov.com/blog/sweet-naked-objects/)

- [Ben Nadel - Javascript's hasOwnProperty() Method Is More Consistent Than The IN Operator](https://www.bennadel.com/blog/1919-javascript-s-hasownproperty-method-is-more-consistent-than-the-in-operator.htm)

- [Ben Nadel - Using Javascript's IN Operator To Test For Object Property Existence](https://www.bennadel.com/blog/1724-using-javascript-s-in-operator-to-test-for-object-property-existence.htm)

- [Mozilla Developer - Object.prototype.__proto__](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

[image01]: https://ngminhtrung.github.io/images/PostIMG/2017-12-16-Creat-object-null/01.png "Thông báo lỗi của ESlint"

[image02]: https://ngminhtrung.github.io/images/PostIMG/2017-12-16-Creat-object-null/02.png "Chrome Dev Console"