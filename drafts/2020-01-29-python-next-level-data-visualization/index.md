---
title: 'The Next Level of Data Visualization in Python'
date: 2019-01-29
author: ngminhtrung
categories:
  - dataviz
tags:
  - reviewing
  - self
  - best_practices
  - programming
  - '2018'
---

Link gốc: https://towardsdatascience.com/the-next-level-of-data-visualization-in-python-dd6e99039d5e

## Tổng quan về Plotly 

`plotply` là một Python package, một thư viện mã nguồn mở được xây dựng trên `plotly.js`, mà `plotly.js` lại được xây dựa vào `d3.js`. 

Chúng ta sẽ sử dụng một lớp bọc bên ngoài `plotly` tên là `cufflinks`, vốn được thiết kế để làm việc với dataframe Pandas. Như vậy, toàn bộ stack của chúng ta sẽ là: cufflinks > plotly > plotly.js > d3.js. Việc này đồng nghĩa với việc ta tận dụng được hiệu quả khi code bằng Python, trong khi nhận được tính [tương tác tuyện vời của d3js](https://github.com/d3/d3/wiki/Gallery).

(Plotly itself is a graphics company with several products and open-source tools. The Python library is free to use, and we can make unlimited charts in offline mode plus up to 25 charts in online mode to share with the world.)

All the work in this article was done in a Jupyter Notebook with plotly + cufflinks running in offline mode. After installing plotly and cufflinks with pip install cufflinks plotly import the following to run in Jupyter: