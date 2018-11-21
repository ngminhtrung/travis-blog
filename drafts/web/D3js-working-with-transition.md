---
id: 103
title: 'D3.js - Working with transition'
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

https://bost.ocks.org/mike/transition/

Method `selection.transition` của D3.js đã giúp người giúp rất nhiều khi muốn tạo hoạt hình với bất kỳ một DOM nào đó. Ví dụ, để đổi màu của chữ lor to red instantaneously, you can select the body element and set the color style:
```
d3.select("body").style("color", "red");
```
To instead animate the change over time, derive a transition:

d3.select("body").transition().style("color", "red");

## Transitions là một dạng của animation
---
- Transition thực ra là một *animation* sử dụng 02 key frame, đó là: *start* và *end*. 
  - *Key frame* là gì? Trong lĩnh vực sản xuất hoạt hình và phim, *key frame* là một bản vẽ giúp xác định điểm bắt đầu và kết thúc của bất kỳ *chuyển tiếp mượt mà* (smooth transition). 
    - Cứ nhìn vào cuộn phim ngày xưa với các khung chữ nhật nối tiếp nhau, đó là lý do mà bản vẽ trên được gọi là *frame* (khung) bởi nó liên quan đến vị trí của tấm hình trong cuộn phim đấy. 
    - Khi các key frames được đặt cạnh nhau theo thứ tự thì nó giúp tạo ra những chuyển động cho người xem, trong khi vị trí của key frames trong phim, video, hoặc hoạt hình giúp xác định thời điểm của chuyển động. 
    - Nếu chỉ có 2 đến 3 key frames trong 1 giây thì sẽ không tạo ra cảm giác chuyển động, người ta phải nhét vào khoảng thời gian còn lại những frames gọi là *inbetweens*. 
  - *Inbetweening* hoặc là *tweening* là một kỹ thuật chủ yếu trong lĩnh vực làm hoạt hình (bao gồm cả làm hoạt hình bằng máy tính). Đâu là kỹ thuật giúp tạo ra những khung hình trung gian (intermediate frame) giữa hai *key frame* (2 khung hình chính), để tạo cảm giác rằng khung hình thứ 1 đã phát triển một cách mượt mà thành khung hình thứ 2. *Inbetweens* là những bức hình (bức vẽ) giúp tạo ra cảm giác của chuyển động.
  - Trong lĩnh vực sản xuất hoạt hình bằng máy tính, thuật ngữ *tweening* là hay được sử dụng, và kết quả của quá trình này là một dãy các khung hình được gọi là *tween*. Những phần mềm tạo hoạt hình phức tạp có thể giúp người sử dụng xác định vật thể trong 1 tấm hình, rồi định nghĩa cách các vật thể đó chuyển động và thay đổi thông qua *tweening*. Có vài cách để giúp tạo ra ra *tweens*:
    - manually render hoặc adjust transitional frame bằng tay
    - render tự động các frames chuyển đổi sử dụng interpolation của các graphic parameters. 
  - *Interpolation* là quá trình tính toán các *tweens* dựa trên các thông số đồ họa cho trước và thuật toán nào đó.
- Key frame bắt đầu chính là trạng thái hiện tại của DOM, còn key frame kết thúc là là tập các attributes, styles và thuộc tính khác của DOM mà người dùng hướng tới. 
- Transitions vô cùng phù hợp cho quá trình chuyển đổi đến một khung nhìn mới mà không làm code trở nên phức tạp.

Chú ý: Cho hầu hết các trường hợp, hãy cân nhắc làm hoạt hình với [d3.timers](https://github.com/d3/d3-timer) hơn là dùng transition.

Cùng xem lại ví dụ về chuyển đổi sau:
```
d3.select("body").transition().style("color", "red");
```
Mặc dù chỉ giá trị kết thúc của *color* cho body được chỉ định, thì chương trình vẫn ngầm hiểu giá trị bắt đầu của nó thông qua [getComputedStyle](https://developer.mozilla.org/en-US/docs/DOM/window.getComputedStyle) hoặc [getAttribute](https://developer.mozilla.org/en-US/docs/DOM/element.getAttribute). 

Trong một số trường hợp, giá trị bắt đầu được tính không đúng như ý người dùng vì nhiều lý do. Tốt nhất là cứ chỉ ra rõ ràng giá trị bắt đầu:
```
d3.select("body")
  .style("color", "green")
  .transition()
  .style("color", "red")
```

Nếu transition có delay, thì chỉ nên chỉ ra giá trị bắt đầu khi bắt đầu chạy transition. Ta có thể làm điều này bằng việc theo dõi sự kiện *start*:
```
d3.select("body").transition()
  .delay(750)
  .each("start", function () {d3.select(this).style("color", "green");})
  .style("color", "red")
```
Lưu ý: Đây là tính năng mới trong D3 v3 so với phiên bản cũ, còn chưa rõ vơi D3 v4 có làm tương tự. Với phiên bản thấp hơn v3, sự kiện *start* sẽ được tiến hành sau khi các *tweens* được tạo.

Cách rõ ràng nhất để chỉ định giá trị bắt đầu là sử dụng [transition.styleTween](https://github.com/mbostock/d3/wiki/Transitions#wiki-styleTween). Nó giúp bỏ qua việc tính toán giá trị bắt đầu của DOM nhờ cả 2 giá trị bắt đầu - kêt thúc và cả interpolator đều xác định.
```
d3.select("body").transition()
  .styleTween("color", function() {return d3.interpolate("green", "red");});
```
Cách làm trên gợi ý cho ta về cách mà transitions làm việc bên trong. Khi ta sử dụng [transition.style](https://github.com/mbostock/d3/wiki/Transitions#wiki-style), D3 sẽ tự động tạo ra 1 style tween bằng việc nhận về giá trị bắt đầu từ DOM, và tạo ra 1 interpolator cho giá trị kết thúc. Nếu muốn ghi đè lên giá trị bắt đầu hoặc interpolatr, hãy dùng [styleTween](https://github.com/mbostock/d3/wiki/Transitions#wiki-styleTween), [attrTween](https://github.com/mbostock/d3/wiki/Transitions#wiki-attrTween), hoặc [tween](https://github.com/mbostock/d3/wiki/Transitions#wiki-tween).

## Nội suy giá trị theo thời gian
---
Khi có giá trị khởi đầu và kết thúc thì làm sao chương trình biết cách để tính các giá trị ở giữa? Để có các giá trị ở giữa giúp tạo ra quá trình chuyển đổi mượt mà, D3.js sử dụng thứ gọi là *nội suy* (interpolate). Method [d3.interpolate](https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_interpolate) tạo ra 1 bộ nội suy xử lý mỗi cặp gía trị bắt đầu và kết thúc. D3 hỗ trợ một vài loại dữ liệu thông dụng sau:
- số
- màu sắc
- dữ liệu địa lý
- xâu ký tự với con số bên trong (như là "96px").

Bộ nội suy cho xâu ký tự với con số bên trong vô cùng hữu dụng, nó áp dụng không những với "96px", mà còn [với *path*](https://bl.ocks.org/mbostock/3903818) như "M0,0L20,30", hoặc CSS font như "300 12px/100% Helvetica".

Sử dụng nội suy xâu ký tự không phải lúc nào cũng phù hợp. Ví dụ, nếu điểm khởi đầu và kết thúc của dữ liệu cho path có một số control points khác biệt, thì việc nội suy không còn ý nghĩa khi pair up numbes. Giải pháp? Cần phải "[resample the path](https://bl.ocks.org/mbostock/3916621)" trước khi tiến hành nội suy (hoặc áp dụng những thuật toán cao cấp hơn). Tương tự như vậy, với arcs, cũng cần nội suy trong hệ tọa độ cực ([polar coordinates](https://bl.ocks.org/1098617)) để các góc (*angles*) được nội suy, chứ không phải là tọa độ điểm.

Nếu muốn tạo ra bộ nội suy riêng của bản thân, ta cần 1 hàm nhận tham số t chạy từ 0 đến 1. Với t = 0, bộ nội suy trả về giá trị khởi đầu; với t = 1, trả về giá trị kết thúc; và với những giá trị ở giữa, trả về 1 giá trị đã được tính toán. Ví dụ, để nội suy giữa 2 con số:
```
function interpolateNumber(a, b) {
  return function(t) {
    return a + t * (b - a);
  }
}
```
Lưu ý: Trước khi tự xây dựng bộ nội suy của bản thân, nên tham khảo các [bộ nội suy đã có sẵn của D3](https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_interpolate).

Chú ý: Khi nội suy các số loanh quanh 0, nên để là 1e-6 thay vì 0; bởi 1e-6 là giá trị nhỏ nhất không bị định dạng ở chế độ exponential.

## Những thứ không thể nội suy
---
Không thể nội suy việc tạo hoặc xóa element. Khi sử dụng transition kết hợp với *update pattern*, cần phải tiến hành data-join đầu tiên với selections sử dụng enter và exit. Sau đó mới tiến hành transition trên mỗi tập selections con.
```js
var bar = svg.selectAll(".bar")
          .data(data, function(d), {return d.key;})
    
    bar.enter().append("rect")
      .attr("class", "bar")
      ...// initialize entering bars
    
    bar.transition()
      ...// transiting entering + updating bars

    bar.exit().transition()
      ...// transition exiting bars
      .remove()
```

For convenience, there are a few exceptions to this rule. You can transition.remove to remove an element at the end of the transition; likewise, transition.text sets the text content at the start of the transition, without interpolating. In the future, transitions may support additional non-interpolatable operations, such as classed and html.

## Vòng đời của một Transition
---

Trong concurrent programming, một trong những thứ khó nhất khi xử lý transition là transition diễn ra theo thời gian thay vì tức thì. Code không chạy theo một đường thẳng, mà chạy ... vòng vèo bởi ta gọi rất nhiều hàm callbacks. Dẫu cho người dùng có thể bỏ qua sự phức tạp trên trong rất nhiều trường hợp mà vẫn chẳng làm sao, thì ta cần phải hiểu những quy luật đang điều kiển transition để có thể tận dụng tối đa được sức mạnh của nó.

Vòng đời của mỗi transition có 4 quãng:
1. Transition được lên kế hoạch
2. Transition bắt đầu
3. Transition đang trong quá trình thực thi
4. Transition kết thúc

"Lên kế hoạch" ứng với lúc transition được tạo, chính là khi gọi [selection.transition](https://github.com/mbostock/d3/wiki/Selections#wiki-transition). This is also when you call attr, style, and other transition methods to define the ending key frame. Scheduling happens in your code (for example, in response to the user clicking a button), meaning that the code so far is fully synchronous. This makes it easier to debug, and easier to use ending values that depend on changing global state, such as a scale’s domain.

Thời điểm bắt đầu của transition dựa vào [delay()]. Nếu delay() không được xác định, thì transition sẽ bắt đầu ngay tức thì (nói vậy chứ nó bắt đầu sau khoảng vài mili giây). The start event is then dispatched, and the transition initializes its tweens, which may involve retrieving starting values from the DOM and constructing interpolators. Deferring the initialization of tweens to start is necessary because starting values aren’t known until the transition starts. Therefore, if you use attrTween, styleTween and other tween methods, keep in mind that your code will be evaluated asynchronously when the transition starts!

While the transition runs, its tweens are repeatedly invoked with values of t ranging from 0 to 1. In addition to delay and duration, transitions have easing to control timing. Easing distorts time, such as for slow-in and slow-out. Some easing functions may temporarily give values of t greater than 1 or less than 0; however, the ending time is always exactly 1 so that the ending value is set exactly when the transition ends. A transition ends based on the sum of its delay and duration. When a transition ends, the tweens are invoked a final time with t = 1, and then the end event is dispatched.



[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
