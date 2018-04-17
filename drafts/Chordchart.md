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
```js
    var matrix = [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
    ];

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        outerRadius = Math.min(width, height) * 0.5 - 40,
        innerRadius = outerRadius - 30;

    var formatValue = d3.formatPrefix(",.0", 1e3);

    var chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
        console.log("Here is chord: ");
        console.log(chord);

    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

        console.log(arc);

    var ribbon = d3.ribbon()
        .radius(innerRadius);

        console.log(ribbon);

    var color = d3.scaleOrdinal()
        .domain(d3.range(4))
        .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .datum(chord(matrix));
```

Kết quả:

```html
<svg width="960" height="960">
  <g transform="translate(480,480)"></g>
</svg>
```

Xem phần tử `<g>` thông qua Google Console, thuộc tính `__data__` đã được thêm vào, là 1 array có độ dài bằng 10, mỗi phần tử là 1 object. Mỗi object này chính là 1 *chord* trả về bởi *chord(matrix)*. Mỗi chord tượng trưng cho luồng đi từ nút *i* (index) đến nút *j* (subindex). Số lượng chords (hay độ dài của array) chính là *tổ hợp chập 2 của `n`* cộng với `n` (do mỗi phần tử có khả năng chập với chính nó). 

Nếu có 4 nút, tức n = 4 --> số lượng objects trong array là: (4! / (2! * (4-2)!)) + 4 = 10.

Ví dụ của mỗi *chord* như sau:

```js
__data__[0]: {
  source: {
    index: 0,
    subindex: 0,
    startAngle: 0,
    endAngle: 0.7284614405347555,
    value: 11975 // ứng với luồng từ nút [0] đến nút [0]
  },
  target: {
    index: 0,
    subindex: 0,
    startAngle: 0,
    endAngle: 0.7284614405347555,
    value: 11975
  }
}

__data__[1]: {
  source: {
    index: 0,
    subindex: 1,
    startAngle: 1.2708382425228875,
    endAngle: 1.6279820519074009,
    value: 5871 // ứng với luồng từ nút [0] đến nút [1]
  },
  target: {
    index: 1,
    subindex: 0,
    startAngle: 2.964393248816668,
    endAngle: 3.0830761941597418,
    value: 1951 // ứng với luồng từ nút [1] đến nút [0]
  }
}
```
và chứa `__data__groups` là 1 array gồm 4 object. Mỗi object chính là 1 cánh cung trên đường tròn của chord layout, và cũng tương ứng với 1 row của matrix ban đầu.

```js
__data__groups[0]: {
    index: 0
    startAngle: 0,
    endAngle: 1.8024478065173115,
    value: 29630
}

__data__groups[1]: {
    index:1
    startAngle: 1.8524478065173116,
    endAngle: 3.0830761941597418,
    value: 2030
}

__data__groups[2]: {
    index: 2
    startAngle: 3.1330761941597416,
    endAngle: 5.583991554422396,
    value: 40290
}

__data__groups[3]: {
    index: 3
    startAngle: 5.633991554422396,
    endAngle: 6.233185307179585,
    value: 9850
}
```




[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
