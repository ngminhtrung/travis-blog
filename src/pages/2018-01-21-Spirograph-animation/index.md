---
id: 126
title: 'Vẽ Spirograph bằng D3.js'
date: 2018-01-21
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3.js
  - spirograph
  - animation
  - transition
  - path
---

Chắc hồi trẻ con ai cũng đã từng một lần nghịch 1 cái thước "sáng tạo" tên là "**Spirograph**" (*/ˈspīrəˌɡraf/*). Khi ấy ta đặt 1 vòng tròn nhỏ có bánh răng ngoài vào bên trong 1 vòng tròn to có bánh răng trong, rồi lấy bút chọc vào 1 lỗ bất kỳ của vòng tròn nhỏ, rồi bắt đầu xoay, xoay, xoay đến khi trên tờ giấy hiện lên những đường đối xứng đẹp mắt. Nhân lúc phải tìm hiểu về animate (hoạt hóa) nét vẽ trong D3.js (đối với `svg`), tôi thực hành luôn với *Spirograph* để vừa bớt nhàm chán, vừa là tìm hiểu luôn về nguyên lý của cái thước đầy sáng tạo của tuổi thơ. 

Ảnh minh họa lấy từ Amazon:

![alt text][image01]{: .center-image }

## Spirograph là gì?
---
Về *spirograph*, ta có thể tham khảo [chi tiết hơn trên Wikipedia](https://en.wikipedia.org/wiki/Spirograph). Ngắn gọn thì nó là 1 đồ chơi hình học, giúp tạo ra những đường cong đối xứng với tên gọi kỹ thuật là *hypotrochoid* và *epitrochoid*. Thứ đồ chơi này được phát minh bởi một kỹ sư người Anh tên là Denys Fisher, và được bán lần đầu tiên vào năm 1965. Phần công thức toán phía sau *spirograph* được viết từ những năm 1881 đến 1900 bởi nhà toán học tên là Bruno Abakanowicz. Sau đó đồ chơi kia mới dần hình thành với bánh răng để người ta có thể tạo ra chuyển động quay của hình tròn thứ 2 xunh quanh (hoặc bên trong) hình tròn thứ 1. 

Hãy xem ảnh minh hoạt chuyển động của *Spirograph* và một vài mẫu vẽ ra từ loại đồ chơi (thước) này. Ảnh lấy từ Wikipedia. 

![alt text][image02]{: .center-image }

![alt text][image03]{: .center-image }

## Công thức toán để vẽ Spirograph?
---
Phần giải thích về công thức toán khá dài, ai quan tâm có thể đọc trong bài Wikipedia trên. Còn đơn giản thì chỉ cần áp dụng công thức sau (chiếu trên hệ tọa độ X, Y, trong đó điểm (0,0) là tâm đường tròn chính):

![alt text][image04]{: .center-image }

1. Nếu đường tròn 2 quay bên **ngoài** đường tròn chính (đường tròn 1)
  ```
  x = (R+r)*cos(t) - p*cos(((R+r)/r)*t)
  y = (R+r)*sin(t) - p*sin(((R+r)/r)*t)
  ```

2. Nếu đường tròn 2 quay bên **trong** đường tròn chính (đường tròn 1)
```
x = (R-r)*cos(t) + p*cos(((R-r)/r)*t)
y = (R-r)*sin(t) - p*sin(((R-r)/r)*t)
```

trong đó:
- **R**: bán kính của đường tròn chính (đường tròn 1). Đường tròn này cố định. 
- **r**: bán kính của đường tròn thứ 2, quay xung quanh hoặc bên trong đường tròn chính. Chú ý: trong code bên dưới, ta truyền vào *k* là tỷ lệ giữa *R/r* chứ không truyền trực tiếp *r*. Mục đích là để khảo sát mối quan hệ giữa R/r đối với hình dạng spirograph được tạo ra. 
- **ρ**: là khoảng cách tính từ tâm đường tròn 2 đến "điểm chấm bút" (chính là cái lỗ mà ta chọc bút vào ngoài đời thường), từ đó tạo ra nét vẽ. Trong ảnh bên dưới dây, điểm chọc bút được ký hiệu là *điểm A*. Chú ý: Trong code bên dưới, *ρ* được gọi là *holeOffsetDistance*.

Để vẽ tính được x, y, thì cần truyền vào tham số của R, r, và p, với *t* chạy từ 0 cho đến 2Π (tức là trọn 1 vòng tròn), tính theo đơn vị *radian*. Vụ chạy *t* này thì chỉ cần dùng 1 vòng lặp `for` là xong. 

## Sample code JavaScript để vẽ spirograph 
---
Sample code để tính tọa độ x, y theo t là:
```js
function createSpirograph(fixedCircleRadius, k, holeOffsetDistance, t) {
    const R = fixedCircleRadius;
    const r = R / k;
    const ρ = holeOffsetDistance;
    const x;
    const y;
    // đường tròn 2 chạy bên trong đường tròn chính
    x = (R - r) * Math.cos(t) + ρ * Math.cos(((R - r) / r) * t),
    y = (R - r) * Math.sin(t) - ρ * Math.sin(((R - r) / r) * t)
};
```
Lần lượt thay vào các giá trị R, k, và holeOffsetDistance khác nhau, ta sẽ tạo ra các spirograph với hình thù khác nhau.

![alt text][image05]{: .center-image }

![alt text][image06]{: .center-image }

## Sử dụng D3.js và SVG để vẽ và hoạt hình hóa spirograph
---
Spirograph có thể vẽ bằng JavaScript thuần với `canvas`. Ai muốn vẽ theo cách này có thể tham khảo ở bài [JavaScript Spirograph](https://maissan.net/articles/javascript-spirograph) viết bởi Chris Maisan (1 anh chàng web developer người Canada, hiện đang làm việc ở Mỹ).

Còn trong phạm vi bài này, ta sẽ dùng **D3.js** (thư viện JS viết tắt của **D**ata-**D**riven **D**ocument) và vẽ với `SVG`. Bài này sẽ áp dụng luôn D3.js và SVG, ai chưa biết về 2 khái niệm này có thể đọc ở [trang chủ D3.js](https://d3js.org/) và [bài về SVG của bạn Huy Trần](https://kipalog.com/posts/Su-dung-file-SVG-cho-website). Hoạt hóa nghĩa là nó sẽ trông như hình dưới đây:

![alt text][image07]{: .center-image }

Code flow cho vụ vẽ và tạo hoạt hình sẽ như sau:

1. Vẽ `path` cho đường spirograph: Vụ này khá đơn giản, có thể xem sample code để hiểu. Chủ yếu là sử dụng `d3.path()` với các lệnh như `path.lineTo()` va `path.moveTo()`.

2. Hoạt hóa cho `path` nói trên:

    Để làm hoạt hình vẽ một đường (`path`) liền nét không khó như lúc mới nhìn, không có gì là ma thuật ở đây, tất cả chỉ là sử dụng mẹo dựa trên những attributes sẵn có của SVG, đó là [`stroke-dasharray`](https://developer.mozilla.org/en-US//Web/SVG/Attribute/stroke-dasharray) và `stroke-dashoffset`. Cách làm bao gồm 3 bước lớn:

    - Bước 1: Nhân đôi đoạn `path` mà ta cần vẽ thông qua `stroke-dasharray`, đoạn 1 để "visible" (kiểu như `opacity = 1`), đoạn 2 để "invisible" (kiểu như `opacity = 0`).
    - Bước 2: Offset (tức là dịch chuyển toàn bộ các `path` trên) sang trái 1 khoảng đúng bằng độ dài của path thông qua `stroke-dashoffset`.
    - Bước 3: Chạy [d3.transition](https://github.com/d3/d3-transition) trong 1 khoảng thời gian xác định (dài ngắn do người dùng) với mục đích là khi chạy đến phút cuối thì offset = 0. Điều này sẽ khiến cho phần path visible sẽ được dịch chuyển ngược lại từ trái (ứng với offset = độ dài path) sang phải (ứng với offset = 0).

    Ví dụ cho 3 bước trên với trường hợp vẽ 1 đường nối điểm (0,0) và (200, 200). Tham khảo code chi tiết ở [link JSfiddle này](http://jsfiddle.net/ngminhtrung/96QSs/187/).

```js
// Khởi tạo một đường thẳng nối giữa điểm (0,0) và điểm (200,200)
let path = d3
  .select("svg")
  .append("path")
  .style("stroke-width", "5px")
  .style("stroke", "lightyellow")
  .attr({
    d: "M0,0L200,200",
    stroke: "#000"
  });

// Tính độ dài của path
let totalLength = path.node().getTotalLength();

path
  .style("stroke-dasharray", totalLength + " " + totalLength) // nhân đôi path, 1 visible, 1 invisible
  .style("stroke-dashoffset", totalLength) // dịch toàn bộ path sang bên trái 1 khoảng bằng độ dài path
  .transition()
  .duration(3000)
  .ease("linear") // đặt transition chạy trong 3000ms
  .style("stroke-dashoffset", 0); // mỗi lần chạy transition là khoảng offset lại giảm đi một chút, giảm về đến 0, tạo cảm giác đường thẳng đang chạy
```

Nếu muốn tham khảo, bạn có thể xem ở đây:
- File HTML cho phần này:
- Source code của phần này:

## Kết luận
---
Vậy với một thí nghiệm ngắn vừa rồi, ta đã đi qua:
- một chút về *spirograph*, lịch sử cũng như công thức toán đứng sau nó
- dùng D3.js để vẽ *spirograph* thông qua `d3.path()`.
- dùng d3.js để hoạt hóa đường *spirograph* thông qua thuộc tính `stroke-dasharray`, `stroke-dashoffset` và `d3.transition()`.
- thí nghiệm vẽ *spirograph* với các thông số khác nhau.

Còn nhiều thứ có thể hoàn thiện thêm cho bài này, bao gồm:
- sử dụng JavaScript thuần và `canvas` để vẽ thay vì dùng D3.js và `svg`. So sánh ưu nhược điểm của `canvas` và `svg`.
- tô màu cho *spirograph* cho đẹp hơn (thay vì dùng 01 màu cho toàn bộ như hiện nay)
- tìm thêm các thông số khác cho hình thù mới, độc đáo hơn.
- chồng các spirograph để kết hợp tạo ra hình mới
- việc hoạt hóa path có thể thông qua `d3-interpolate`. Tìm hiểu và so sánh.

## Tham khảo và bookmark
---
Những bài dưới đây có bài là tham khảo, có bài đơn thuần là bookmark để tra cứu sau này:

- [Maissan - JavaScript Spirograph](https://maissan.net/articles/javascript-spirograph) 
- [Mathematische-basteleine - Spirograph](http://www.mathematische-basteleien.de/spirographs.htm)
- [WordSmith - Spirograph](http://www.wordsmith.org/anu/java/spirograph.html#display)
- [5pjs - Spirograph](https://p5js.org/examples/simulate-spirograph.html)
- [Htmlspirograph](http://htmlspirograph.com)
- [Nathanfriend.io - Inspirograph](http://nathanfriend.io/inspirograph/)
- [Visual Cinnamon - Animating Dashed Line in d3.js with Spirographs](https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3.html)
- [bl.ocks.org - Animate path in D3](http://bl.ocks.org/duopixel/4063326)
- [Bocoup - Improving D3 path animation](https://bocoup.com/blog/improving-d3-path-animation)
- [big elephants - Notes on Animating Line Charts with D3](http://big-elephants.com/2014-06/unrolling-line-charts-d3js/)
- [Visual.ly - Creating animations and transition with d3.js](https://visual.ly/blog/creating-animations-and-transitions-with-d3-js/)

[image01]: https://travisnguyen.net/images/PostIMG/spirograph/image01.jpg "Bộ thước Spirograph"

[image02]: https://travisnguyen.net/images/PostIMG/spirograph/image02.jpg "Một vài hình vẽ Spirograph""

[image03]: https://travisnguyen.net/images/PostIMG/spirograph/image03.gif "Minh họa cách thước Spirograph hoạt động"

[image04]: https://travisnguyen.net/images/PostIMG/spirograph/image04.png "Hình vẽ Spirograph trên trục tọa độ"

[image05]: https://travisnguyen.net/images/PostIMG/spirograph/image05.png "Sample 01 Spirograph"

[image06]: https://travisnguyen.net/images/PostIMG/spirograph/image06.png "Sample 02 Spirograph"

[image07]: https://travisnguyen.net/images/PostIMG/spirograph/image07.gif "Animating Spirograph"