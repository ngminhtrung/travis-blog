---
id: 103
title: '[JavaScript is Sexy] Hiểu về “this” cho rõ và thuần thục các cách dùng nó '
date: 2017-09-27T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - Dịch
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

[When to use a bar chart instead of a pie chart](https://www.highcharts.com/blog/post/207-when-to-use-a-bar-chart-instead-of-a-pie-chart/?utm_content=buffera13e9&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)

Pie chart (biểu đồ hình tròn) và bar/column charts (biểu đồ  dạng cột) có lẽ là những loại biểu đồ phổ biến nhất để biểu diễn những dữ liệu dạng chuỗi thời gian (non-time-series data).

Nếu như biểu đồ dạng cột thích hợp nhất để 
The bar/column chart excels at showing discrete data while comparing one data-point vs. another, while the pie chart is the classic way to show how various parts makes up a whole.

Both make it easy to for readers compare values relative to each other. Or so I thought.

You can “easily” fit other kinds of data into each of these chart types, with mixed results. For example, the bar chart is also great for showing time series data. For example, 12 bars listed in chronological order may visualize a city’s rainfall month to month. The same layout can also be used to show rainfall on a specific month, across 12 different cities.

The pie chart, on the other hand, is only useful to show relative values.

For example, one could have 12 slices representing the relative amount of rain for each city as a fraction of the cities’ combined rainfall. It could also be used to show the relative amount of rain per month as a fraction of the cumulative rainfall for the year.

However, the achilles’ heel of the pie chart is that it is hard to compare values of adjacent points, especially with percentages in the single digits. In a column chart, you’ll see the differences right away. For that reason many would claim that a column (or bar) chart is, most often, the better choice.





[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
