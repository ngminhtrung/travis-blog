---
title: 'Về Callback Hell'
date: 2018-02-12
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

http://callbackhell.com/

### Callback hell trông như thế nào?

Là những thứ oằn tà là vằn như thế này:

```js
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```
Là:
- những dòng code được lùi vào 1, 2, 3 đến n tab
- trông như một kim tự tháp, 
- mỗi block được kết thúc bởi `{)`
- nhìn qua tưởng nó sẽ chạy từ trên xuống dưới, dòng trên chạy xong thì sẽ đến dòng dưới. Nhưng thực tế thì không phải vậy. 

### Ok, "hell" thì hiểu, chứ callback trong "callback hell" nghĩa là gì?

Theo từ điển tiếng Anh, callback có vài nghĩa:
- bạn đang họp thì vợ gọi, nhấc máy bảo vợ "Đang bận, anh sẽ gọi lại sau", đó là callback
- bạn thấy ai gọi lỡ cho mình, bạn gọi lại, đó là callback
- hết giờ nghỉ giải lao mà bạn vẫn chưa vào, sếp bạn gọi bảo "mày vào làm tiếp đi, deadline đến đít kia kìa", đó là callback.
- tỷ lệ sinh tăng đột biến vì lỗi bao cao su, hãng Ok phải thu hồi hàng trăm nghìn sản phẩm trên thị trường, đó cũng là ... callback. 

Trong mấy nghĩa trên, cái ý "sẽ làm việc gì sau đó" là gần nhất với những gì cảm nhận được của callback trong lập trình. [Wikipedia](https://en.wikipedia.org/wiki/Callback_(computer_programming)) định nghĩa là:
> - In computer programming, a callback is any executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at a given time. This execution may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback. 
> - A callback is often back on the level of the original caller.

À vậy là:
- Callback chỉ là 1 cách gọi thôi, để chỉ đoạn "*executable code*" nào đó. Trong phần lớn các trường hợp, *executable code* đấy là đơn giản chỉ là một khai báo function.
- Với function thông thường, thì:
  - thường xuyên nhất là ta truyền tham số vào là các con số, chuỗi, mảng, object,
  - nhưng ở đây ta truyền vào cả 1 *executable code* (function callback) nói trên vào tham số. 
- Từ đó hiểu rằng, **callback là 1 function nào đó đóng vai trò là tham số truyền vào 1 function khác**.
- Tùy vào ngôn ngữ lập trình hoặc xử lý của lập trình viên, mà cái callback kia sẽ:
  - được gọi thực thi ngay lập tức. Loại này được phân vào nhóm "synchronous callback" - callbach đồng bộ.
  - được thực thi vào 1 thời điểm khác trong tương lai, không phải bây giờ. Loại này được phân vào nhòm "asynchronous callback" - callback bất đồng bộ.

### Có lẽ nào callback chỉ đơn giản là function truyền vào như một tham số của function khác?

Về định nghĩa thì đúng thế. Chỉ đơn giản như vậy. Đoạn code sau minh hoạt cho cái mà ta định nghĩa ở trên

```js
function someAction(x, y, someCallback) {
    return someCallback(x, y);
}

function calcProduct(x, y) {
    return x * y;
}

function calcSum(x, y) {
    return x + y;
}

alert(someAction(5, 15, calcProduct)); // trả về 75 = 5 x 5
alert(someAction(5, 15, calcSum)); // trả về 20 = 5 + 15
```

Ta thấy:
- function *someAction* được truyền vào tham số  ngoài x, y ra, còn có *someCallback*. Đây chính là function callback theo định nghĩa ở trên. Callback này có thể là *calcProduct*, hoặc là *calcSum* tùy lúc nó được gọi.

Ta cũng thấy rằng bình thường có điên mới viết kiểu trên, người ta cứ thế mà gọi *calcProduct* với *calcSum* trực tiếp cho ngắn gọn. 

### Vậy callback sẽ hữu dụng ở đâu?

Nếu chỉ dùng đơn giản như trên, hẳn trong JavaScript không ai quan tâm đến callback. Callback sẽ hữu dụng trong trường hợp
- function chạy trước, sau đó mới đến lượt callback
- function không nhận được giá trị trả về hữu ích để thực thi trên đó

Nói theo 1 cách khác, callback hữu dụng vì JavaScript là một thế giới không đồng bộ, người ta cần callback trong trường hợp:
- thao tác với I/O
- download files
- đọc files
- giao tiếp với database

Ví dụ ta có 2 hàm để download và resize kích thước ảnh:
```js
var photo = downloadPhoto('http://coolcats.com/cat.gif');
var resizedPhoto = resizePhoto(photo);
```
Trong trường hợp ảnh dung lượng lớn, hoặc mạng chậm, dẫn đến *downloadPhoto* chưa thực hiện xong, thì photo trở thành `undefined`. Lúc này giá trị `undefined` truyền vào *resizePhoto*, khiến cho *resizedPhoto* cũng thành `undefined` nốt.

Callback sẽ được dùng trong trường hợp này, ta truyền function *resizePhoto* vào làm tham số của *downloadPhoto*. Điều này sẽ giúp *resizePhoto* chỉ được gọi khi mà quá trình download đã kết thúc, truyền cho *resizePhoto* một tấm hình, hoặc một object mang tên "error".
```js

function downloadPhoto('photoURL', callbackfunction) {
  // đoạn code để download file dựa trên url truyền vào
}

downloadPhoto('http://coolcats.com/cat.gif', resizePhoto);

function resizePhoto(error, photo) {
  if (error) { console.error('Download bị lỗi!', error) }
  else {
    // tiến hành resize ảnh
    console.log('Ảnh đã download và resize thành công: ', photo)
  }
}

console.log('Download bắt đầu');
```
Nhìn vào đoạn code trên, ta thấy thứ tự thực hiện như sau:
- Đầu tiên, hàm *downloadPhoto* và *resizePhoto* sẽ được JavaScript engine khai báo (cho dù phần khai báo hàm *resizePhoto* có nằm bên dưới `downloadPhoto('http://coolcats.com/cat.gif', resizePhoto);`)
- Tiếp theo, hàm *downloadPhoto* sẽ được gọi, đường dẫn của ảnh và hàm *resizePhoto* được truyền vào dưới dạng tham số.
- Tiếp theo nữa, dòng chữ "Download bắt đầu" được in ra.
- Hàm *resizePhoto* sẽ chỉ được gọi khi mà *downloadPhoto* download xong (ra ảnh, hoặc ra error). Quá trình download kéo dài trong bao lâu thì thời gian *resizePhoto* phải đợi để được gọi cũng kéo dài bấy lâu.

### Vậy điều gì cần nhớ với callback?

1. Callback chỉ là cách để lưu lại việc gì cần làm vào 1 thời gian sau đó.
2. Đừng nhìn vào code mà nghĩ là nó sẽ được đọc từ trên xuống dưới. Như trong trường hợp trên, thứ tự đảo lộn nhảy tùm lum.

### Vậy khi callback biến thành hell thì phải xử lý thế nào?

Có 3 nguyên tắc:
1. Viết code ngắn gọn, tường minh
2. Module hóa
3. Xử lý từng lỗi phát sinh

Từng nguyên tắc được minh họa qua ví dụ sau:

1. **Viết code ngắn gọn, tường minh**.

    Đây một đoạn code JavaScript sử dụng thư viện *browser-request* để tạo 1 AJAX request đến server. Có lẽ đoạn code này dùng để đọc form, khi người dùng nhấn nút submit thì thông tin của ô `input` sẽ được ghi nhận, truyền vào function *request*, function *request* này lại có 1 callback không đặt tên để xử lý trường *status* ngoài trang web khi đã có kết quả gửi trả về từ server. Nhìn ban đầu thì nó đúng là "hell" thật.

    ```js
    var form = document.querySelector('form')
    form.onsubmit = function (submitEvent) {
      var name = document.querySelector('input').value
      request({
        uri: "http://example.com/upload",
        body: name,
        method: "POST"
      }, function (err, response, body) {
        var statusMessage = document.querySelector('.status')
        if (err) return statusMessage.value = err
        statusMessage.value = body
      })
    }
    ```

    Sau khi áp dụng nguyên tắc 1 "Viết code ngắn gọn, mọi function có tên rõ ràng, tách bạch các chức năng", tức là đặt tên cho 2 function không tên, code mới trông như sau, dễ hiểu hơn hẳn:

    ```js
    document.querySelector('form').onsubmit = formSubmit

    function formSubmit (submitEvent) {
      var name = document.querySelector('input').value
      request({
        uri: "http://example.com/upload",
        body: name,
        method: "POST"
      }, postResponse)
    }

    function postResponse (err, response, body) {
      var statusMessage = document.querySelector('.status')
      if (err) return statusMessage.value = err
      statusMessage.value = body
    }
    ```

    Lưu ý là dù khai báo của *formSubmit* và *postResponse* bị đặt xuống dưới cùng, thì do cơ chế hoisting, JavaScript vẫn tìm đến phần khai báo này đầu tiên trước khi gọi hàm.

2. **Module hóa**:

    Tạo 1 file `formUploader.js` chứa 2 function quan trọng ở trên, rồi nhúng vào file code chính.

    File `formUploader.js`:
    ```js
    module.exports.submit = formSubmit

    function formSubmit (submitEvent) {
      var name = document.querySelector('input').value
      request({
        uri: "http://example.com/upload",
        body: name,
        method: "POST"
      }, postResponse)
    }

    function postResponse (err, response, body) {
      var statusMessage = document.querySelector('.status')
      if (err) return statusMessage.value = err
      statusMessage.value = body
    }
    ```

    File `index.js`:
    ```js
    var formUploader = require('formuploader')
    document.querySelector('form').onsubmit = formUploader.submit;

    ```
    Cách module hóa như trên sẽ:
    - giúp cho lập trình viên mới (mới học, hoặc đã có kinh nghiệm nhưng mới vào dự án) hiểu luồng logic nhanh hơn, không bị phân tâm bởi quá nhiều tiểu tiết tình huống rẽ ngang dọc.
    - module `formUploader` có thể được tái sử dụng ở những phần khác, tránh việc copy paste đi lại chỗ này chỗ khác.


3. **Xử lý từng lỗi phát sinh**:

Lỗi? Từ "lỗi" ở đây ám chỉ những thứ gì?
- lỗi do viết sai cú pháp sai --> do ông lập trình viên
- lỗi runtime, dù code chạy nhưng vẫn còn 1 đống bug --> do cha lập trình viên
- lỗi liên quan đến platform, ví dụ không có quyền truy cập file, ổ cứng lỗi, mạng bị cá mập cắn, ... --> phần này đang nhắm đến loại lỗi này (platform errors).

Nếu như quy tắc 1 và quy tắc 2 sẽ giúp đoạn code của ta sáng sủa tường minh hơn, thì quy tắc 3 này chủ yếu khiến cho việc thực thi code ổn định hơn.

Tại sao phải nghĩ đến platform error? Vì ai biết được điều gì sẽ xảy ra vào ngày mai, đưa việc cho callback bảo nó làm, nhưng biết đâu có chuyện gì xảy ra ở đâu đó trong bóng tối, callback mất hút, ta lâm vào thế bị động. Do vậy luôn cần để tâm đến việc "tóm" lấy lỗi, đưa nó ra ánh sáng.

Trong thế giới của Node.js, error luôn là tham số đàu tiên được truyền vào callback, chứ không phải là kết quả thành công. Hãy xem lại ví dụ về downloadPhoto:
```js
downloadPhoto('http://coolcats.com/cat.gif', resizePhoto);

function resizePhoto(error, photo) {
  if (error) { console.error('Download bị lỗi!', error) }
  else {
    // tiến hành resize ảnh
    console.log('Ảnh đã download và resize thành công: ', photo)
  }
}
```
Tại sao lại đưa error lên đầu? Thói quen của người Việt là cái tốt khoe ra (cho lên trước), xấu xa thì đậy lại (cho ra sau). Nhưng cách viết trên thể hiện đúng tư duy của các bạn Tây, có sao nói vậy, đưa error lên đầu để khuyến khích bản thân cần phải nghĩ đến việc xử lý xong vấn đề rồi mới đi chơi.

### Kết luận:

1. Đã hiểu thêm về callback và callback hell
2. Đã biết thêm 3 quy tắc và lý do đằng sau mỗi quy tắc để tránh rơi vào tình trạng callback hell.
3. Tác giả của bài viết gốc cho rằng callback là 1 trong những khái niệm quan trọng nhất trong Node.js. Trường hợp muốn đọc chi tiết hơn, tham khảo ở [đây](https://github.com/maxogden/art-of-node#callbacks)
4. Là cơ sở để đọc tiếp về async, await, và promise.
