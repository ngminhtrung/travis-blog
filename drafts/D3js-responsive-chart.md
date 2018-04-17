---
id: 103
title: 'ES6 - var let const - và chuyện thằng sau chửi thằng đi trước'
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

https://blog.webkid.io/responsive-chart-usability-d3/


### Tạo dữ liệu

Tranh thủ đang dùng Node.js, tạo 1 script đơn giản để tạo file `data.csv` chứa ngày tháng và giá trị ứng với mỗi ngày tháng tạo ra. 

```js
// filename: create-data.js
const fs = require('fs');
const startDate = new Date('2018-1-1');
const endDate = new Date('2018-6-1');
var csv = 'date,value\n';

for(let i = startDate; i < endDate; startDate.setDate(startDate.getDate() + 10)) {
  csv += '' + startDate.toString() + ',' + Math.random() + '\n';
}

fs.writeFileSync('data.csv', csv);
```
Chạy script trên với lệnh
```
node create-data.js
```

Kết quả là file `data.csv` trông tương tự như sau:
```
date,value
Mon Jan 01 2018 00:00:00 GMT+0700 (+07),0.5881655415699047
Thu Jan 11 2018 00:00:00 GMT+0700 (+07),0.7872003498865929
Sun Jan 21 2018 00:00:00 GMT+0700 (+07),0.8779602438394103
Wed Jan 31 2018 00:00:00 GMT+0700 (+07),0.5908995275807101
```

### Vẽ một chart đơn giản (dạng đường)

Cần tạo 3 files sau:

1. File `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width" />
  <title>D3 Line Chart</title>
  <link rel="stylesheet" href="style.css">
  <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
</head>
<body>
  <div id="chart"></div>
  <script src="chart.js"></script>
</body>
</html>
```

2. File `chart.js`:
```js
var Chart = (function(window,d3) {

  var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height;

  d3.csv('data.csv', init); //load data, then initialize chart
  
  //called once the data is loaded
  function init(csv) {
    data = csv;

    //initialize scales
    xExtent = d3.extent(data, function(d,i) { return new Date(d.date) });
    yExtent = d3.extent(data, function(d,i) { return d.value });
    x = d3.time.scale().domain(xExtent);
    y = d3.scale.linear().domain(yExtent);

    //initialize axis
    xAxis = d3.svg.axis().orient('bottom');
    yAxis = d3.svg.axis().orient('left');

    //the path generator for the line chart
    line = d3.svg.line()
      .x(function(d) { return x(new Date(d.date)) })
      .y(function(d) { return y(d.value) });

    //initialize svg
    svg = d3.select('#chart').append('svg');
    chartWrapper = svg.append('g');
    path = chartWrapper.append('path').datum(data).classed('line', true);
    chartWrapper.append('g').classed('x axis', true);
    chartWrapper.append('g').classed('y axis', true);

    //render the chart
    render();
  }

  function render() {

    //get dimensions based on window size
    updateDimensions(window.innerWidth);
    
    //update x and y scales to new dimensions
    x.range([0, width]);
    y.range([height, 0]);

    //update svg elements to new dimensions
    svg
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);
    chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //update the axis and line
    xAxis.scale(x);
    yAxis.scale(y);
    
    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);

    path.attr('d', line);
  }

  function updateDimensions(winWidth) {
    margin.top = 20;
    margin.right = 50;
    margin.left = 50;
    margin.bottom = 50;

    width = winWidth - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
  }

  return {
    render : render
  }

})(window,d3);
```

File `chart.js` sẽ thực hiện 3 việc:
- Đầu tiên: nhập dữ liệu từ file csv
- Tiếp theo: khởi tạo tất cả các biến cần dùng dể tạo và hiển thị chart. Đây chính là hàm `init()`
- Cuối cùng: render ra chart bằng hàm `render()` dựa trên kích thước hiện tại của viewport.

Lưu ý: Hàm `init()` chỉ được chạy một lần với mục đích tạo đường, chuẩn bị sẵn cho quá trình rendering sắp diễn ra. Trong khi đó, hàm `render()` lại có thể được gọi nhiều lần, và sẽ tạo ra chart tùy theo kích thước của viewport và các tham số khác. 

3. File `style.css`:

```css
body {
  font: 12px sans-serif;
  margin: 0;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}
```

Để tránh vụ cross-domain request (gọi file `data.csv`), cần tạo `http-server` để chạy `index.html`.

### Render chart dựa trên `resize`

Để giúp cho chart luôn vừa vặn với màn hình khi người dùng thay đổi kích thước của cửa sổ trình duyệt, một cách có thể làm là:
- theo dõi và bắt sự kiện `resize`
- nếu sự kiện trên xảy ra, vẽ lại (re-render) chart.

Mẩu code dùng cho việc này:
```js
window.addEventlistener('resize', Chart.render);
```

### Sử dụng tỷ lệ thay vì chiều cao cố định

Để giữa cho tỷ lệ chiều cao/ chiều rộng của chart luôn cố định, có thể thay đổi 1 dòng trong `updateDimensions` thành:

```js
height = 0.7 * width (// aspect ratio là 0.7)
```
