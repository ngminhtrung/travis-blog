---
id: 103
title: '[D3.js] Cách thức các methods trong module "selection" hoạt động'
date: 2017-09-27
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---


Lưu ý:

- Bài gốc [How Selections Work của Mike Bostock](https://bost.ocks.org/mike/selection/) sử dụng d3.js v3. Khi phát hành d3.js v4, chính Mike đã sửa rất nhiều thứ, những gì viết dưới đây không còn áp dụng được cho d3.js v4 nữa. Tuy vậy, việc hiểu kỹ d3.js v3 cũng là nền tảng để hiểu v4, chưa kể việc còn một lượng lớn ví dụ sử dụng v3. Lúc cần viết lại từ v3 lên v4, thì việc hiểu sự khác biệt này sẽ giúp việc viết lại hiệu quả hơn. 

- Khi thực hành theo bài này, tốt nhất hãy vào bài gốc trên (tiếng Anh), mở cửa sổ Chrome Console để gõ các lệnh thì sẽ thu lại được kết quả trùng khớp với các giải thích, cũng như minh họa của Mike. Khi mở cửa sổ Console mà bạn gặp dòng sau "*Hooray, you opened the JavaScript console. Have fun!*" thì có nghĩa là bạn đang ở đúng nơi phải đến.

## Selection là subclass của array (trong d3 v3)

### D3 v3:

Bạn có thể nghĩ rằng selection là mảng (array) của những phần tử DOM. SAI. Thực chất, selection là một lớp con (subclass) của array; subclass này có những methods để giúp tác động đến các phần tử được lựa chọn, ví dụ như thiết lập các attributes và styles. Ngoài ra, vì là một lớp con của array, nên nó cũng thừa kế những methods nguyên thủy của array, ví dụ như `array.forEach` và `array.map`. Dẫu vậy, thường thì người dùng sẽ không cần phải sử dụng những methods nguyên thủy kia bởi D3 đã cung cấp sẵn những giải pháp thay thế, ví dụ như `selection.each`. Một vài methods nguyên thủy sẽ được giữ nguyên tên, nhưng bị ghi đè lên, chủ yếu là để bổ sung thêm tính năng mới, ví dụ như methods `selection.filter` và `selection.sort`.)

Lưu ý: JavaScript chưa hỗ trợ trực tiếp array subclasses, do đó subclass được thêm vào array thông qua [prototype chain injection](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/).

### D3 v4:

Selections no longer subclass Array using prototype chain injection; they are now plain objects, improving performance. The internal fields (selection._groups, selection._parents) are private; please use the documented public API to manipulate selections. The new selection.nodes method generates an array of all nodes in a selection.

## Nhóm các phần tử (Grouping Elements)

Một lý do khác để khẳng định selections không phải là mảng (array) bởi vì selectiosn là mảng của mảng các phần tử: mỗi selection là một mảng của nhiều nhóm, mỗi nhóm lại là một mảng của các phần tử. Hay xem vi dụ sau, sử dụng d3.select để trả về một selection với 1 nhóm chứa các phần tử được select:

```js
var selection = d3.select("body");
```
Hãy thử câu lệnh trên với 1 trang web bất kỳ (như trang này) trong JavaScript console (của Chrome, Firefox, hay bất kỳ trình duyệt này), sau đó xem selection, selection[0] và selection[0][0] là gì. Mặc dù thông qua D3.js API người ta có thể truy cập trực tiếp vào một node như ví dụ vừa rồi, tuy nhiên D3.js khuyến khích dùng selection.node. 

`d3.selectAll` sẽ trả về 1 selection, trong đó có 1 group chứa nhiều phần tử. Ví dụ:

```js
d3.selectAll("h2")`
```

Selections trả về bởi `d3.select `và `d3.selectAll` chỉ có duy nhất 1 group.  Cách duy nhất để selection có nhiều groups là sử dụng `selection.selectAll`. Ví dụ, nếu cần select toàn bộ các rows của 1 table, rồi select tiếp toàn bộ các cells của từng row, người ta sẽ làm như sau:

```js
d3.selectAll("tr").selectAll("td");
```

Với selectAll, mọi phần tử trong selection đầu tiên sẽ trở thành một group trong selection thứ hai; mỗi group sẽ lại chứa các phần tử con. Nếu muốn mỗi cell của row phải có 1 phần tử `<span>`, ta có thể gọi selectAll lần thứ 3, lần này selection trả về 16 group:

Mỗi group có một thuộc tính tên là `parentNode` trong đó lưu thông tin của phần tử cha chia sẻ bởi các phần tử con. Ví dụ có 16 `<span>`, cứ 4 span lại thuộc về một cell nào đó, thì thuộc tính `parentNode` của 1 trong 16 grup kia phải lưu thông tin để biết span nào thuộc cell nào. 

shared parent of all the group’s elements. The parent node is set when the group is created. Thus, if you call d3.selectAll("tr")​.selectAll("td"), the returned selection contains groups of td elements, whose parents are tr elements. For selections returned by d3.select and d3.selectAll, the parent element is the document element.

Most of the time, you can safely ignore that selections are grouped. When you use a function to define a selection.attr or selection.style, the function is called for each element; the main difference with grouping is that the second argument to your function (i) is the within-group index rather than the within-selection index.

## Non-grouping Operations

Chỉ duy nhất `selectAll` là có thể thay đổi đến nhóm; trong khi `select` bảo toàn nhóm đang hiện hữ. Method `select` còn truyền data từ parent sang child, trong khi `selectAll` không như vậy (dẫn đến nhu cầu cần có data-join)!

Method `append` và `insert` là phần bọc bên trên của `select`, nhu vậy nó đồng thời vừa bảo toàn nhó, vừa truyền được data. Xem ví dụ minh họa sau cho một document có 4 sections:

```js
d3.selectAll("section");
```

Nếu ta append một phần tử *paragraph* vào mỗi section, thì kết quả trả về (selection mới) sẽ là 1 group đơn có 4 phần tử `<p>` bên trong.

Note that the parentNode for this selection is still the document element because selection.selectAll has not been called to regroup the selection.

## Null Elements

Groups có thể chứa `null` để thông báo rằng nó có những phần tử đang bị khuyết. Trong hầu hết các thao tác, null sẽ bị bỏ qua; ví dụ D3 sẽ bỏ qua phần tử null khi thiết lập styles và attributes.

Phần tử null sẽ xuất hiện khi mà selection.select không thể tìm thấy phần tử thỏa mãn yêu cầu đầu vào (selector). Method select buộc phải bảo toàn cấu trúc nhóm, như vậy nó có thể điền phần tử null vào đó. Ví dụ, nếu chỉ có 2 section cuối cùng là có `aside`:

d3.selectAll("section").select("aside");

Bởi vì với nhóm, thì bạn thường bỏ qua phần tử null, nhưng hãy lưu ý cách mà nó bảo toàn cấu trúc nhóm trong một selection và index nội bộ nhóm.

## Bound to Data

Có lẽ hơi ngạc nhiên một chút với người dùng, đó là data lại không phải là một thuộc tính của selection, mà lại là thuộc tính của các phần tử của nó. Điều này có nghĩa là khi người dùng bind data vào một selection, data sẽ được lưu trong DOM thay vì lưu trong selection: data được đặt vào trong thuộc tính __data__ của mỗi phần tử. Nếu một phần tử thiếu thuộc sitnhs này, thì nghĩa là giá trị data tương ứng của nó là undefined. Data vì thế được coi là bảo toàn, trong khi selection chỉ mang tính quá độ: bạn có thể select thêm một lần nữa các elements từ DOM, và thấy các elements này vẫn giữ nguyên data của lần liên kết trước.

Data được liên kết vào các elements theo 1 trong các cách sau:
- tham gia với groups of elements thông qua `selection.data`.
- được gán vào từng elementd đơn lẻ thông qua `selection.datum`.
- thừa kế từ element cha thông qua append, insert, hoặc select.

Mặc dù việc gán data trực tiếp vào element thông qua _data_ là thừa bởi ta có thể làm việc này thông qua `selection.datum`, ví dụ sau vẫn được thực hiện để minh họa cách dữ liệu liên kết với element:

`document.body.__data__ = 42;`

Cú pháp tương đương dùng với `selection.datum`:
```js
d3.select("body").datum(42);
```
Nếu bây giờ append một element vào body, thì phẩn tử con kia sẽ tự động được thừa kế data từ phần tử cha (tức là body):
```js
d3.select("body").datum(42).append("h1");
```

## Data là gì? 

Data trong D3 có thể là bất kỳ array nào chứa values. Ví dụ, một array toàn số: 
```js
var numbers = [4, 5, 18, 23, 42];
```

Hoặc một array toàn objects:
```js
var letters = [
  {name: "A", frequency: .08167},
  {name: "B", frequency: .01492},
  {name: "C", frequency: .02780},
  {name: "D", frequency: .04253},
  {name: "E", frequency: .12702}
];
```
Thậm chí một array của array:
```js
var matrix = [
  [ 0,  1,  2,  3],
  [ 4,  5,  6,  7],
  [ 8,  9, 10, 11],
  [12, 13, 14, 15]
];
```
We can mirror the visual representation of selections to represent data. Here’s a plain array of five numbers:

Just as selection.style takes either a constant string to define a uniform style property (e.g., "red") for every selected element, or a function to compute a dynamic style per-element (function(d) { return d.color; }), selection.data có thể nhận vào hoặc là 1 constant, hoặc là 1 function.

Mặc dù vậy, không giống như các method selection khác, `selection.data ` xác định data theo nhóm chứ không theo từng phần tử đơn lẻ: data được biểu diễn như một mảng các values cho group, hoặc là một function trả về 1 array. Như vậy, một selection dạng group sẽ có data dạng group tương ứng. 

Lưu ý: Do có 4 groups trong selection, function sẽ được gọi 4 lần, trả về 4 arrays (mỗi array 1 lần gọi). Mỗi array trả về cũng có 4 values, nhưng 4 hay 5 hay bao nhiêu values đi nữa thì lại phụ thuộc vào data gốc ban đầu (matrix trong trường hợp này).

Đường xanh blue trong giản đồ có ý nghĩa là data function trả về một array được linked. Your data function is passed the datum of the group’s parentNode (d) and the group’s index (i), and returns whatever array of data you want to join to that group. Thus, data is typically expressed as a function of parent data, facilitating the creation of hierarchical DOM elements from hierarchical data.

For selections with only a single group, you can pass the corresponding single array to selection.data directly; you only need a function when binding different data to different groups.


## The Key to Enlightenment

Để kết hợp data với elements, chúng ta cần biết là data nào ứng với element nào. Điều này được thực hiện thông qua việc cặp đôi các keys. Key đơn giản chỉ là 1 chuỗi để nhận dạng, như là 1 cái tên; khi key của data và key của element bằng nhau, thì chương trình biết là data này phải gắn vào element kia. 

Cách dễ nhất để thiết lập key là thông qua index: 
The simplest method of assigning keys is by index: the first datum and the first element have the key “0”, the second datum and element have the key “1”, and so on. Joining an array of numbers to a matching array of paragraph elements therefore looks like this, with keys shown in green:

Kết hợp thông qua index là cách tiện nhất nếu tập dữ liệu và tập elements có chung một thứ tự sắp xệp. Trong trường hợp ngược lại, việc dùng index không đem lại hiệu quả. Lúc này, cần tạo một key function như là tham số thứ 2 cho `selection.data`. Key function sẽ trả về giá trị key cho 1 dữ liệu hoặc element nào đó. Ví dụ, nếu data là một array của objects, mỗi object có một thuộc tính với key *name*, thì key function có thể trả về name kia:

## Enter, Update và Exit

Khi liên kết elements với dữ liệu thông qua key, sẽ có 3 trường hợp xảy ra:
- Update - Có những element tương ứng với dữ liệu.
- Enter - Có những element không tương ứng với dữ liệu.
- Exit - có những dữ liệu không tương ứng với element.

Đây là ba trường hợp của selections được trả về lần lượt bởi `selection.data`, `selection.enter` và `selection.exit`. Để minh họa, hãy hình dung ta có 1 biểu đồ dạng cột (bar chart) củ 5 ký tự đầu tiên của bảng chữ cái (ABCDE), rồi ta cần chuyển dữ liệu này thành 5 nguyên âm nổi tiếng (YEAOI). Bạn có thể sử dụng key function to maintain association of letters to bars across the transition, resulting in the following data join:

Hai trong số những chứ cái đã hiện (A và E) là phụ âm. Do vậy, những cột này được đặt trong *update selection*, in order of the new data:
```js
var div = d3.selectAll("div").data(vowels, name);
```

Các cột còn lại ứng chữ cái khác (B, C và D) là phụ âm, như vậy không hề có dữ liệu tương ứng trong tập dữ liệu mới. Những cột (hay element) này sẽ được đặt trong *exit selection*. Lưu ý rằng *exit selection* giữ nguyên thứ tự của selection gốc, điều này đôi khi có ý khi cần biến thành hoạt hình trước khi xóa đi:
```js
div.exit();
```
Cuối cùng, với 3 phụ âm (Y, O và I) của tập dữ liệu mới chưa được hiển thị, cũng không có element nào tương ứng. Các phụ âm này tạo thành `enter selection`:
```js
div.enter();
```
Trong khi *update* và *exit* là những selection thông thường, thì *enter* lại là một lớp con của selection. Điều này cần thiết bởi nó tượng trưng cho các elements còn chưa tồn tại. Một selection *enter* chứa những "placeholders" chứ không phải là DOM; những placeholders đơn giản chỉ là objects với thuộc tính __data__. Việc thực thi `enter.select` do đó đặc biệt ở chỗ các nodes được chèn vào group cha, thay thế placeholder. Đó là lý do quan trọng phải gọi `selection.selectAll` trước khi tiến hành data join: nó sẽ thiết lập node cha cho việc thêm vào elements.

## Merging Enter & Update

Thao tác update thường thấy nhất khi tiến hành data join là append elements thuộc selection *enter*, và loại bỏ đi các elements thuộc selection *exit*, đồng thời thay đổi attributes, styles cũng như các thuộc tính khác của elements thuộc selection *update*. Điều này dẫn đến một khả năng thuộc tính của elements bên *update* và elements bên *enter* bị chồng chéo.

To reduce duplicate code, enter.append has a convenient side-effect: it replaces null elements in the update selection with the newly-created elements from the enter selection. Thus, after enter.append, the update selection is modified to contain both entering and updating elements. The update selection subsequently contains all currently-displayed elements:



[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
