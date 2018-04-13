---
id: 103
title: '[JavaScript is Sexy] Hiểu về “this” cho rõ và thuần thục các cách dùng nó '
date: 2017-09-27T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - General
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Sau 2 tháng học Javascript, tôi vẫn không thể thấy thoải mái và tự tin khi nhìn thấy từ khoá "this" trong các đoạn code của người và của ... bản thân. Mọi thứ cứ lờ mờ khó nắm bắt. Mà "this" dùng tương đối phổ biến ở rất nhiều code mẫu, dẫu có thể hiểu được đại khái là code mẫu hoạt động ra sao, nhưng vì không rõ bản chất nên khi muốn tự viết đoạn code đó ra thì chịu. Tôi đã tham khảo phần này trong Javascript Definitive Guide, trong Professional Javascript, hay [bài của Phạm Huy Hoàng](https://toidicodedao.com/2016/01/26/series-javascript-sida-luan-ban-ve-cai-dit-this-trong-javascript/), và [của Jell Liew](https://zellwk.com/blog/should-you-use-this/) vẫn không thấy ổn lắm. Hôm nay ngó [Javascript Is Sexy thấy tác giả (Richard Bovell) liên hệ "this"](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/) với cách dùng ngôn từ ngoài đời thực, bài viết lại liệt kê rõ ràng các trường hợp dễ nhầm lẫn. Có lẽ bài này phù hợp cho dân nhập môn như tôi, bắt đầu với cách tiệm cận này là chuẩn. Tôi đọc, ghi chú, và dịch lại bài để nhớ lâu và tiện quay lại tra cứu sau này. 

***

## Hiểu rõ JavaScript “this” và thuần thục cách dùng nó

**Đồng thời hiểu luôn trong những hoàn cảnh nào "this" bị hiểu nhầm**

*Yêu cầu: Một chút hiểu biết về JavaScript*.

Từ khoá "this" trong Javascript khiến cho cả người mới lẫn người cũ thấy khó hiểu. Để dễ tưởng tượng, hãy nghĩ đến cách chúng ta viết văn thông thường như sau: 

- Tiếng Anh:  *“John is running fast because **he** is trying to catch the train.”*
- Tiếng Việt: *"Trung đang học Javascript một cách cẩn thận bởi **hắn** muốn trở thành 1 chuyên gia về ngôn ngữ này".* 

Bạn thấy cách dùng đại từ "*he*" (và "*hắn*") ở đây ko? Rõ ràng chúng ta có thể viết là:
- “John is running fast because **John** is trying to catch the train.”
- Tiếng Việt: *"Trung đang học Javascript một cách cẩn thận bởi **Trung** muốn trở thành 1 chuyên gia về ngôn ngữ này".* 

Tuy thế trong văn viết lẫn văn nói, chẳng mấy người lặp lại John/ Trung như trên (tất nhiên là vẫn có thể dùng, nhưng nghe không lọt tai lắm, dù trong bất kỳ văn cảnh nào). Từ lối suy nghĩ như vậy, chúng ta gặp "**this**" trong Javascript như 1 cách dùng tắt, để chỉ tới một đối tượng nào đấy. Hãy xem các ví dụ sau: 

Ví dụ 1
{% highlight javascript linenos%}
var person = {
    firstName: "Hưng",
    lastName: "Đàm Vĩnh",
    fullName: function () {
        ​// Lưu ý: Ở đây "this" được dùng tương tự như "he"/ "hắn" ở 
        // trong ví dụ trên - Tạm gọi là cách 1
        console.log(this.firstName + " " + this.lastName);
    ​   // Ngoài ra t​a cũng có thể viết như sau - Tạm gọi là cách 2
        console.log(person.firstName + " " + person.lastName);
    }
}
{% endhighlight %}

Có lẽ với những người mới học, việc dùng *person.firstName* và *persona.lastName* (cách 1) dễ hiểu, trực quan hơn so với cách 2. Variable *person* đã có sẵn đó, thêm dấu "." để truy cập vào các biến bên trong, quá ngon!!! Tại sao cần thêm cách 2 làm gì? Tuy vậy, thực hành thêm 1 thời gian sẽ hiểu nhận xét của tác giả (Richard Bovell) rằng cách viết kiểu 1 mới là thằng gây nhầm lẫn. Tại sao? Nhỡ đâu đoạn code của ta chỉ là 1 phần trong 1 đoạn code lớn hơn do người khác (hoặc chính bản thân ta) viết, và 1 variable cũng tên là "*person*" đã được đặt ở global context? Trong trường hợp như vậy, chương trình sẽ trỏ đến "person" kia (tức ở global context) chứ ko phải đến person trong đoạn code ta vừa viết. Điều này đặc biệt đúng khi ta làm việc theo nhóm, và khi code viết ra ngày một lớn mà bản thân mình cũng chẳng nhớ hết bao nhiêu variable đã được đặt tên, liệu thằng sau có trùng với thằng trước không, v.v. Với Richard Bovell, sử dụng từ khoá **this** không những tăng tính "*thẩm mĩ*" (!!!) của đoạn code, mà còn khiến cho code được trình duyệt đọc một cách chính xác, đúng như ý đồ của người viết ra đoạn code đấy. 

<h3> Cơ bản về từ khoá "this" trong Javascript </h3>

Đầu tiên, cần nhớ lại rằng mọi hàm trong Javascript đều có thuộc tính (giống như mọi objects đều có thuộc tính vậy). Khi thực thi 1 hàm nào đó sẽ làm phát sinh 1 thuộc tính **this** có **giá trị của object sẽ gọi hàm đấy**. [Khó hiểu phải không?!]

**this** này LUÔN LUÔN trỏ đến (và giữ giá trị của) một object (singular object), "this" này thường được sử dụng ở trong phạm vi của function hoặc method, mặc dù người ta có thể đặt "this" ở ngoài function (trong phạm vi của global context). Lưu ý là có sự khác biệt giữa strict mode và non-strict mode. Với strict mode, **this** ứng với *undefined* trong các hàm global, và hàm không tên (anynymous/ arrow functions) vốn không được ràng buộc với 1 object nào cả. 

**this** được sử dụng trong 1 hàm F thì sẽ chứa giá trị của object gọi hàm F. Chúng ta cần **this** để truy cập vào các methods và thuộc tính (properties) của object kia, nhất là khi ta chẳng biết tên của object đó, và nhiều lúc bản thân object cũng không được đặt tên. Hiểu cách ngắn gọn thì **this** là một lối đi tắt trỏ đến object gọi hàm F. 

Thử xem ví dụ bên dưới: 

Ví dụ 2:
{% highlight javascript linenos%}
    var person = {
        firstName   :"Hà",
        lastName    :"Hồ Ngọc",
        showFullName:function () {
            console.log (this.firstName + " " + this.lastName);
            // Lưu ý: từ khoá "this" được dùng bên trong method showFullName, 
            // và method showFullName được định nghĩa bên trong object "person"
            // Do đó, "this" sẽ có giá trị của object "person" vì object "person" này 
            // sẽ gọi method showFullName()
        }
    }
    person.showFullName (); // Hà Hồ Ngọc
{% endhighlight %}

Và 1 ví dụ khác dùng **this** trong jQuery: 

Ví dụ 3: 
{% highlight javascript linenos%}
    // Đây là 1 đoạn code rất hay gặp trong jQuery
    $ ("button").click (function (event) {
        console.log ($ (this).prop ("name"));
    // $(this) sẽ mang giá trị của object button ($("button")) 
    // bởi object​ button đã gọi method click()
    });
{% endhighlight %}

Với ví dụ jQuery trên, hãy lưu ý một vài điểm sau:
1. **button** (nút bấm) là 1 phần tử DOM của trang HTML, vì vậy nó là 1 object.
2. Trong ví dụ 3 trên, vì chúng ta đặt *button* bên trong ký hiệu đô-la, ý là hàm jQuery $(), ta đã biến nó thành 1 object, nhưng là **jQuery object**.
3. Hàm jQuery $() bản chất là 1 hàm không tên (anonymous function), mà đã là hàm không tên thì không có object nào gọi nó cả, mà đã không có object nào thì lấy đâu ra chỗ để **this** trỏ đến? 
4. Dẫu vậy, $(this) vẫn có giá trị của jQuery object button ($("button")) đơn giản chỉ bởi vì các tác giả của thư viện jQuery đã định nghĩa luôn là $(this) đấy sẽ bị ràng buộc với object gọi method click(). 

<h2>Một phút "Eureka" với từ khoá “this” của JavaScript</h2>

Một khi đã hiểu nguyên lý cơ bản đầu tiên của từ khoá **this**, ta sẽ nắm được rằng: **this** của 1 hàm không được truyền giá trị nào cả cho đến khi 1 object nào đó gọi hàm ra. Trong hầu hết các trường hợp, **this** chứa giá trị của object gọi hàm. Những trường hợp ngoại lệ sẽ được nhắc đến sau. 

<h2>Sử dụng "this" ở phạm vi global</h2>

Trong phạm vi global, khi code được thực thi trong trình duyệt, thì mọi variables và hàm dạng global đều được định nghĩa trong object "*window*". Vì thế, khi dùng **this** trong hàm dạng global, nó sẽ trỏ tới (và mang giá trị) của object "window" (điều này không đúng nữa trong strict mode như đã nói ở trên). Lưu ý: object "window" là thằng quản toàn bộ các ứng dụng Javascript chạy trên nền web. 

Ví dụ 4: 
{% highlight javascript linenos%}
    var firstName = "Nhung",
        lastName = "Nguyễn Hồng";
​
    function showFullName () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong môi trường global, cùng môi trường với variables "firstName" và "lastName".
        // Do đó, "this" ở trong dây sẽ trỏ (và mang giá trị) của object "window"
        console.log (this.firstName + " " + this.lastName);
    }
​
    var person = {
        firstName   :"Hà",
        lastName    :"Trần Thu",
        
        showFullName:function () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong 1 object (tên là "person")
        // object "person" này sẽ gọi hàm "showFullName" khi có nhu cầu
        // do đó, "this" ở trong đây sẽ trỏ và mang giá trị của object "person" 
        // chứ ko phải object "window" như ở trên. 
            console.log (this.firstName + " " + this.lastName);
        }
    }
​
    showFullName (); // Nhung Nguyễn Hồng
​
    window.showFullName (); // Nhung Nguyễn Hồng
​
    person.showFullName (); // Hà Trần Thu
{% endhighlight %}

<h2>Những trường hợp mà *this* bị hiểu nhầm và trở nên rắc rối</h2>

Một vài trường hợp cụ thể khiến ta hiểu nhầm **this** là:
1. Khi mượn method (borrow method) có sử dụng **this**
2. Khi truyền 1 method sử dụng **this** cho 1 variable 
3. Khi một hàm sử dụng **thiss** lại được truyền vào 1 hàm khác dưới dạng hàm "callback". 
4. Khi **this** được dùng bên trong một closure. 

<h2> Một lưu ý quan trọng </h2>
**Một chút về "Context" trước khi tiếp tục**

> Khái niệm "context" trong JavaScript cũng tương tự như "chủ đề' trong 1 câu. Trong câu tiếng Việt “<em>Văn Cao là một nhạc sĩ, người đã sáng tác Quốc ca của Việt Nam Dân chủ Cộng hoà</em>.”, thì "chủ đề" của câu là Văn Cao, và ta có thể nói rằng "context" của câu là Văn Cao bởi toàn bộ câu này vào thời điểm nói là đang hướng cụ thể đến người nhạc sĩ này chứ không phải người/ sự vật nào khác. Ngay cả đại từ "người" cũng đang trỏ đến Văn Cao. Và giống như chúng ta có thể sử dụng dấu chấm phẩy (";") để chuyển chủ ngữ của câu, ta có thể chuyển context hiện tại của đối tượng thứ nhất sang một một đối tượng thứ hai bằng cách gọi hàm ứng với đối tượng thứ hai đó.

Xem đoạn code JavaScript bên dưới:

Ví dụ 5:

{% highlight javascript linenos%}
var person = {
   firstName   :"Sơn Tùng",
   lastName    :"MTP ",
   showFullName:function () {
    ​// Đây là "context"​ (tạm gọi là context 1) của hàm showFullName() bên trong object "person"
    // Hàm showFullName() sẽ được gọi thông qua object "person" 
    // Do đó, "this" trong hàm này sẽ trỏ đến và mang giá trị của object "person"
    console.log(this.firstName + " " + this.lastName);
 }
}
​
person.showFullName (); // Sơn Tùng MPT
​
// Nếu ta gọi showFullName() từ một object khác
​var anotherPerson = {
firstName   :"Soobin",
lastName    :"Hoàng Sơn"​
};
​
// Ở dưới đây, ta thực hiện vụ "chuyển chủ ngữ của câu", 
// Chuyển từ "context 1" sang "context 2" (ứng với object "anotherPerson") bằng cách gọi hàm ứng với đối tượng thứ hai thông qua method apply()
​// Lúc này đây, "this" sẽ trỏ và mang giá trị của đối tượng thứ 2. 
person.showFullName.apply(anotherPerson); // Soobin Hoàng Sơn
​
​// Lưu ý: mặc dù trông thì có vẻ như object "person" gọi hàm showFullName(), 
// Nhưng do dùng method apply() rồi, nên về thực tế là nó đã chuyển sang gọi thông qua object "anotherPerson"
{% endhighlight %}

Dưới đây là những trường hợp mà việc sử dụng từ khoá **this** trở nên phức tạp. Hãy cùng quan sát các ví dụ và cách xử lý.

![Các trường hợp dùng "this"][20170928-img-01.png]

### 1. Khi "this" được dùng trong hàm callback
***

Ví dụ 6:
{% highlight javascript linenos%}

 // Ta tạo 1 object đơn giản tên là "user", có method là 
 // clickHandle() để gọi ra mỗi lần ấn vào 1 nút nào đó 
 // trên trang web. 
    var user = {
    data:[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],
    clickHandler:function (event) {
    var randomNum = ((Math.random () * 2 | 0) + 1) - 1; 
    // random number between 0 and 1​
​   
    // Đoạn code bên dưới sẽ in ra màn hình console tên 
    // và tuổi của một người bất kỳ, lấy dữ liệu từ 
    //mảng "data" của object "user". 
    console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
    }
​
    // Sử dụng jQuery để gọi nút bấm trên web
    // Một khi đã đặt nút vào bên trong $(), ta biến nó 
    // thành 1 object jQuery. 
    // Đoạn code dưới sẽ trả về "undefined", bởi "this" 
    // trỏ về object $("button") (thằng đã gọi hàm click) 
    //vốn không có dữ liệu, chứ ko trỏ về object "user" (thằng có dữ liệu)
    $ ("button").click (user.clickHandler); // Cannot read property '0' of undefined
{% endhighlight %}

Cách xử lý? Do chúng ta muốn *this.data* trỏ đến mảng data, một thuộc tính của object "user", ta có thể dùng một trong các method như Bind(), Apply(), hoặc Call() để ấn định giá trị cho *this*. 

Richard Bovell đã viết 1 bài tương đối chi tiết về 3 methods trên ở đây [JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/) để ai cần tham khảo thêm thì đọc. Với ví dụ trên, để giải quyết có thể dùng method bind(). 

Thay dòng dưới đây: 

{% highlight javascript %}
 $ ("button").click(user.clickHandler);
{% endhighlight %}

thành: 

{% highlight javascript %}
    $("button").click(user.clickHandler.bind(user)); // P. Mickelson 43
{% endhighlight %}


### 2. Khi "this" được dùng bên trong closure 

***

Một trường hợp khác dễ bị hiểu sai, đó là khi có **this** trong closure. Lưu ý là closure không thể truy cập vào **this** của function bên ngoài (outer function). 

Ví dụ 7: 

{% highlight javascript linenos%}
var user = {
    tournament:"The Masters",
    data      :[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],
​
    clickHandler:function () {
    // dùng "this.data" như dưới là chuẩn, bởi "this" 
    // chỗ này trỏ đến object "user", và "data" là một 
    // thuộc tính của "user". 
​
    this.data.forEach (function (person) {
    // Tuy nhiên vào đến đây, trong hàm không tên 
    // (anonymous function), "this" không còn trỏ đến 
    // object "user" nữa. Hàm con không thể truy cập vào "this" của hàm cha. ​
   
    console.log ("What is This referring to? " + this); //[object Window]​
 
    console.log (person.name + " is playing at " + this.tournament);
    // T. Woods is playing at undefined​
    // P. Mickelson is playing at undefined​
    })
    }
    }
    user.clickHandler(); // What is "this" referring to? [object Window]
{% endhighlight %}

Vì **this** ở hàm con (hàm vô danh) không thể truy cập đến **this** của hàm cha, vì vậy mà nó bị ràng buộc vào object "window" khi không dùng strick mode. 

Giải pháp? Hãy dùng 1 cách làm thường gặp trong lập trình JavaScript, đó là gán giá trị của "this" cho 1 variable khác trước forEach.

Ví dụ 8: 

{% highlight javascript linenos%}
``` javascript
var user = {
    tournament:"The Masters",
    data      :[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],
​
    clickHandler:function (event) {
    // Trước forEach, ta hãy truyền lại giá trị của "this" (vốn đang trỏ đến object "user") cho một variable khác tên là "theUserObj". 
    var theUserObj = this;
    this.data.forEach(function(person) {
    // Ta dùng theUserObj.tournament​ thay vì this.tournament
    console.log(person.name + " is playing at " + theUserObj.tournament);
    })
    }
    }
    user.clickHandler();
    // T. Woods is playing at The Masters​
    //  P. Mickelson is playing at The Masters
```
{% endhighlight %}

Nếu đọc nhiều code mẫu, bạn sẽ thấy các lập trình viên JavaScript hay thích truyền **this** sang 1 variable tên là **that**. Cách đặt tên này ("that") không mang nhiều thông tin (dù nghe có vẻ ngồ ngộ), vì vậy một lời khuyên là hãy dùng tên gì có tính mô tả hơn, như là "theUserObj" trong ví dụ trên. 

### 3. Khi "this" đặt trong 1 method, mà method này lại được gán vào 1 variable

***

Khi ta gán 1 method vốn sử dụng **this** cho 1 variable, thì bạn **this** này bị ràng buộc vào một object khác. Xem ví dụ dưới đây: 

Ví dụ 9: 
{% highlight javascript linenos%}
// Variable "data" ngay dưới đây là 1 global variable. 
// Tạm gọi là data-g.
    var data = [
    {name:"Samantha", age:12},
    {name:"Alexis", age:14}
    ];
​
    var user = {
    // Variable "data" ở chỗ này lại là 1 thuộc tính của object "user"​
    data    :[
                {name:"T. Woods", age:37},
                {name:"P. Mickelson", age:43}
            ],
    showData:function (event) {
    
        var randomNum = ((Math.random () * 2 | 0) + 1) - 1; 
        // random number between 0 and 1​
​
        // Dòng bên dưới hiển thị ở console thông tin 
        // về 1 người bất kỳ trong mảng data.
        console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
    }
    // Gán user.showData cho 1 variable 
    var showUserData = user.showData;
    // Khi thực thi hàm showUserData, giá trị được
    // in ở console được lấy từ mảng data-g (global)
    // không phải từ mảng data trong object "user"
    showUserData (); // Samantha 12 (from the global data array)​
{% endhighlight %}

Cách nào để xử lý vụ này? Hãy *sử dụng method bind()*!.

Ví dụ 10:
{% highlight javascript linenos%}
   // Ràng buộc method showData vào object "user"
    var showUserData = user.showData.bind(user);
    // Giờ ta lấy được dữ liệu từ object "user", bởi "this" đã được chỉ định cho object này. 
    showUserData(); // P. Mickelson 43
{% endhighlight %}

### 4. Khi "this" dùng trong method đi mượn

***

Đi mượn method là một cách làm thường gặp trong lập trình JavaScript. Là một lập trình viên JavaScript, chúng ta chắc chắn sẽ gặp cách làm này nhiều lần, phải chỉnh sửa, hoặc viết lại nó. Chi tiết hơn thì bạn có thể [đọc thêm ở đây](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/).

Trong giới hạn bài viết này, ta chỉ xem xét ví dụ sau: 

Ví dụ 11: 
{% highlight javascript linenos%}
// Ta có 2 objects. Object thứ nhất có 1 method tên là 
// avg() trong khi objec thứ hai không có. 
// Để tiết kiệm thời gian, ta không đi viết lại 
// method(avg) cho object thứ hai, mà mượn nó từ object thứ nhất. 
    var gameController = {
                scores  :[20, 34, 55, 46, 77],
                avgScore:null,
                players :[
                    {name:"Công Phượng", playerID:987, age:23},
                    {name:"Công Vinh", playerID:87, age:33}
                ]
                }
​
    var appController = {
                scores  :[900, 845, 809, 950],
                avgScore:null,
                avg     :function () {
                            var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
                                    return prev + cur;
                            });
​
                            this.avgScore = sumOfScores / this.scores.length;
                    }
                }
    gameController.avgScore = appController.avg();
    // Khi chạy đoạn code ngay trên đây, thuộc tính 
    // "avgScore" của object "gameController" sẽ bằng 
    // trung bình của các scores, nhưng dữ liệu scores 
    // này lại là của object "appController". 
    // Lưu ý: Đừng chạy đoạn code đó, nó chỉ để minh hoạ; chúng ta cần giữ cho appController.avgScore = null.
{% endhighlight %}

Ví dụ trên cho thấy **this** trong method avg() sẽ không trỏ đến object "gameController", mà đến object "appController" do appController gọi hàm avg() chứ không phải là gameController. 

Cách xử lý? Sử dụng method "*apply()*" để chắc chắn rằng **this** bên trong appController.avg() trỏ đến object "gameController". 

Ví dụ 12:
{% highlight javascript linenos%}
    // Lưu ý: Chúng ta dùng method apply(), vì thế 
    // tham số thứ 2 truyền vào phải là 1 mảng
    // Mảng này sẽ được truyền cho method appController.avg() ​
    appController.avg.apply(gameController, gameController.scores);
​
    // Thuộc tính avgScore của object "gameController" đã được 
    // tính và trả về kết quả chính xác
    // Kết quả này được lưu vào avgScore của gameController
     console.log (gameController.avgScore); // 46.4​
    // còn appController.avgScore vẫn là null;
    console.log (appController.avgScore); // null
{% endhighlight %}

[Xem ví dụ trên ở JSBIN](http://jsbin.com/iwaver/1/edit)

## Thay lời kết

***

Rất hy vọng là những gì tác giả của "JavaScript Is Sexy" và phần dịch của tôi đã giúp bạn hiểu thêm về **this** trong JavaScript. Bây giờ, bạn đa có thêm những vũ khí mới (bind, apply, và call) để chinh phục **this** trong mọi trường hợp. 

Như bạn thấy, **this** bắt đầu trở nên đỏng đảnh trong những tình huống context gốc (nơi mà định nghĩa **this**) thay đổi, đặc biệt trong (1) *hàm callback*, (2) *trỏ đến **this** từ 1 object khác*, hoặc (3) *method đi mượn*. Tuy vậy, hãy luôn nhớ là **this** chỉ được truyền cho giá trị của object mà gọi được hàm (hàm này chứa xác định về **this**).

## Cập nhật 

***

- 05.10.2017: Bài khác để tham khảo sau này ["Bàn về this trong JavaScript - Làm thế nào để xác định this?"][1]
- 07.10.2017: Bài khác để tham khảo sau này ["The many faces of `this` in javascript"][2]


[1]: https://viblo.asia/p/ban-ve-this-trong-javascript-lam-the-nao-de-xac-dinh-this-GrLZDb1O5k0

[2] https://blog.pragmatists.com/the-many-faces-of-this-in-javascript-5f8be40df52e
