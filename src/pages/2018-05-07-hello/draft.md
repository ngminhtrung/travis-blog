---
draft: true
title: "Hello"
date: 2018-05-07
author: ngminhtrung
categories:
 - test
---

[How To Scroll](https://bost.ocks.org/mike/scroll/). Mike Bostock. November 5, 2014.

<div id="example-graph"></div><!--the graph container-->

<Helmet>
  <!-- <link  href="/assets/d3.js/d3-force-2.1.0beta1.css" rel="stylesheet" type="text/css"> -->
  <script src="https://d3js.org/d3.v3.min.js"></script>
  <!-- <script src="/assets/d3.js/d3-force-2.1.0beta1.min.js"></script> -->
  <script>
  window.onload = function (){
    window.example = netGobrechtsD3Force('example-graph')
      .debug(true) //to enable the customization wizard
      .lassoMode(true)
      //.zoomMode(true)
      .useDomParentWidth(true) //for responsive layout
      .wrapLabels(true)
      .preventLabelOverlappingOnForceEnd(true)
      .labelPlacementIterations(1000)
      .start(); //sample data is provided, when called without data
  }
  </script>
</Helmet>

Tương tác trên web dựa vào việc cuộn trang (lên/ xuống/ trái/ phải) đang trở nên ngày một phổ biến trong kỹ thuật kể truyện (đầy đủ là interactive storytelling). Có rất nhiều lý do để chúng ta sử dụng những kỹ thuật này, nhưng hãy nhớ là việc cuộn trang rất "mong manh" và dễ phát sinh ra hiệu ứng không mong muốn. Dưới đây là năm (05) quy tắc giúp việc áp dụng kỹ thuật cuộn trang một cách hiệu quả:
1. Ưu tiên "cuộn" hơn "click"
2. Cho phép cuộn "nhanh", "cuộn xuôi", "cuộn ngược".
3. Khi cuộn thì hiệu ứng phải được phản hồi tức thì và đồng nhất
4. Tránh những lỗi không mong muốn
5. Hỗ trợ các thao tác cơ bản khi lướt web dùng bàn phím 

### Ưu tiên "cuộn" hơn "click"

Hãy nhớ là khi lướt web, việc cuộn trang được lặp đi lặp lại, nó nhiều đến mức trở thành tự nhiên như hơi thở vậy. Chính bạn cũng đang kéo lên kéo xuống để đọc trang web này. Việc cuộn trang gần như chẳng phải tốn chút sức lực nào, mắt thì nhìn, tay thì vuốt touchpad hoặc chuột, không hề phải nghĩ đến vụ "phối hợp giữa tay với mắt". Còn click chuột thì sao? Click lên một tab, một nút, hoặc một vị trí nào đấy trên trang web, v.v. đều cần thêm (một chút) chú ý của người dùng. Do vậy, nếu ban đầu ta ẩn đi một vùng nội dung nào đó, thì để hiển thị vùng đó ra, việc dùng "cuộn" sẽ tốt hơn là "click chuột".

Dùng kỹ thuật cuộn trang đặc biệt hữu dụng cho việc kể chuyện bởi tính "tuyến tính" (theo mạch từ trên xuống dưới) của nó: người dùng chỉ cần cuộn 1 chiều (lên hoặc xuống). Tất cả đều đi theo 1 hướng có sẵn, không chệch sang hướng khác, bắt đầu từ trên cùng, tịnh tiến dần xuống phía cuối. Người dùng không có lựa chọn nào khác ngoài việc đi tiếp để xem nội dung mới, hoặc cuộn lùi về để xem lại nội dung cũ. Còn với "click chuột", người dùng có thể lâm vào tình huống không biết phải làm gì tiếp bởi có quá nhiều lựa chọn.

Dẫu việc "cuộn trang" đem lại hiệu quả, nhưng mắt người thường quét nhanh hơn cả viêc cuộn, do vậy tốt nhất là tránh dấu nội dung ngay từ đầu. Custom scrolling gives you a lot of freedom, but remember that browser windows come in a range of aspect ratios and sometimes it’s useful to show more content simultaneously. Also beware full-screen designs that lack any scrolling affordance: người đọc có thể không nhận ra rằng họ "được phép kéo trang xuống dưới". Vậy nên có một chỉ dẫn hoặc gợi ý nào đó, ví dụ như nội dung chỉ hiện một phần, hoặc một chỉ dẫn công khai (mũi tên đi xuống chẳng hạn), tránh trường hợp người dùng chỉ dừng lại ở cover.

<!-- <link  href="/assets/d3.js/d3-force-2.1.0beta1.css" rel="stylesheet" type="text/css"> -->
<script src="https://d3js.org/d3.v3.min.js"></script>
<!-- <script src="/assets/d3.js/d3-force-2.1.0beta1.min.js"></script> -->
<script>
window.onload = function (){
  window.example = netGobrechtsD3Force('example-graph')
    .debug(true) //to enable the customization wizard
    .lassoMode(true)
    //.zoomMode(true)
    .useDomParentWidth(true) //for responsive layout
    .wrapLabels(true)
    .preventLabelOverlappingOnForceEnd(true)
    .labelPlacementIterations(1000)
    .start(); //sample data is provided, when called without data
}
</script>