---
id: 132
title: 'Asynchronous flow control using async'
date: 2018-01-29
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/flow_control_using_async


The controller code for some of our LocalLibrary pages will depend on the results of multiple asynchronous requests, which may be required to run either in some particular order or in parallel. In order to manage flow control, and render pages when we have all the required information available, we'll use the popular node async module.

Lưu ý: Còn có những cách khác để quản lý các công việc bất đồng bộ trong JavaScript, trong đó có cách sử dụng Promise mà JavaScript mới hỗ trợ gần đây

Async has a lot of useful methods (check out the documentation). Some of the more important functions are:

async.parallel() to execute any operations that must be performed in parallel.
async.series() for when we need to ensure that asynchronous operations are performed in series.
async.waterfall() for operations that must be run in series, with each operation depending on the results of preceding operations.


### Tại sao lại cần xử lý bất động bộ

Hầu hết các methods dùng trong Express là dạng bất đồng bộ:
- khai báo một hàm nào đó, truyền kèm theo 1 hàm callback
- hàm trên sẽ được thực hiện ngay lập tức, khi nó kết thúc thì callback sẽ được gọi. 
- theo thông lệ trong Express, hàm callback sẽ được truyền vào 2 tham số:
  - tham số thứ 1: object chứa lỗi (error)
  - tham số thứ 2: kết quả của hàm kia (nếu có)

Nếu như mọi thứ chỉ dừng lại như trên thì chẳng cần đến việc xử lý bất đồng bộ. Xem ví dụ bên dưới đây, ta viết một hàm để đếm số quyển sách thuộc bookModel có tiêu đề là "Đôi mắt". Trường hợp đếm thành công, hàm trả về 1 con số ví dụ 10 chẳng hạn, thì render ra 1 trang HTML và chèn 10 vào 1 thẻ nào đấy.
```js
exports.modelCount = function(req, res, next) {
 
  bookModel.count({ title: 'Đôi mắt' }, function (err, count) {
    // ... thực hiện việc gì đó trong trường hợp có lỗi

    // Nếu thành công, hãy trình bày kết quả dưới dạng HTML, chèn giá trị của "count" vào hàm render bên dưới 
    res.render('HTMLtemplate', { data: count } );
  });
}
```
However what if you need to make multiple asynchronous queries, and you can't render the page until all the operations have completed? A naive implementation could "daisy chain" the requests, kicking off subsequent requests in the callback of a previous request, and rendering the response in the final callback. The problem with this approach is that our requests would have to be run in series, even though it might be more efficient to run them in parallel. This could also result in complicated nested code, commonly referred to as callback hell.

A much better solution would be to execute all the requests in parallel and then have a single callback that executes when all of the queries have completed. This is the sort of flow operation that the Async module makes easy!