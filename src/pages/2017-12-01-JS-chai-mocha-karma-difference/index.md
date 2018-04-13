---
id: 110
title: 'Sự khác nhau giữa test runner, testing framework, assertion library, và testing plugin? '
date: 2017-12-01
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - javascript
tags:
  - javascript
  - testing
  - mocha
  - assertion library
  - karma
---

Nếu tưởng tượng _Khoa học Máy tính (Computer Science)_ là một thế giới mới mà bạn đang khám phá, thì mỗi lĩnh vực trong đó lại là những thế giới con cũng phức tạp không kém, với trùng trùng điệp điệp các khái niệm, thuật ngữ và công cụ phức tạp. Lần này tôi lạc vào 1 thế giới khác - "_Software Testing (Kiểm thử Phần mềm)_", chạm vào chỉ một phần nhỏ (nếu không nói là phần rìa) của nó là **T**est **D**riven **D**evelopment sử dụng **Mocha**, **Chai.js** để test các ứng dụng **JavaScript**. 

Có lẽ có nhiều cách để phân loại (trừu tượng hóa) các cấp độ trong kiểm thử phần mềm, ở đây, tôi chỉ giới hạn vào một góc nhìn rằng các phép kiểm thử ứng dụng **JavaScript** được chia ra làm 4 cấp, xếp theo thứ tự thấp dần như sau:
1. **Test Runner** (hay là Test Enviroment như _karma_)
2. **Testing Frameworks** (như _mocha_ hay _jasmine_)
3. **Assertion Libraries** (như là _should.js_, _chai.js_)
4. **Testing plugin** (như là _sinon_)

Để cho dễ hiểu, các khái niệm trên không được trình bày theo thứ tự mà đảo đi một chút. 

# **Assertion libraries**

**Assertion libraries** là những thư viện giúp lập trình viên xác minh tính đúng đắn của một đoạn code nào đó. Nó đơn giản là giúp bạn viết các phép kiểm tra một cách dễ dàng hơn, sử dụng ngôn ngữ gần với ngôn ngữ nói hơn, thay vì viết hàng nghìn câu lệnh _if_.

Hãy xem ví dụ sau (sử dụng _should.js_ và module _assert_ của Node.js):

``` js
var output = mycode.writeSomething();
output.should.equal('Việt Nam'); //đoạn này dùng "should.js"
assert.eq(output, 'Việt Nam'); //đoạn này dùng "node.js assert"

// Nếu không sử dụng "should.js" hoặc "node.js assert" 
// thì bạn vẫn sống khỏe, bằng cách sử dụng các mệnh đề "if" truyền thống:
var output = mycode.doSomething();
if (output !== 'Việt Nam') {
  throw new Error('Mong muốn output trả về "Việt Nam", nhưng lại nhận về '+output);
}
```
Từ ví dụ trên, chúng ta có thể thấy là các _testing statements (mệnh đề kiểm tra)_ hoàn toàn có thể viết bằng JavaScript thuần, không cần phải sử dụng các "assertion libraries". Các libraries này chỉ giúp chúng ta viết cú pháp theo ngôn ngữ nói, còn lại sau đó nó vẫn cần chuyển về JavaScript thuần. 

Vậy **việc dùng assertion libraries có lợi ích gì**? Do cách viết cú pháp theo ngôn ngữ nói, việc đọc các đoạn mã testing trở nên dễ hiểu hơn nhiều. Từ đó, hiệu quả giao tiếp giữa các đội (đội lập trình với đội testing), hoặc với khách hàng được nâng cao khi nói về testing. Đội testing có thể sẽ bớt vất vả khi viết testing code, tập trung vào chuyên môn của họ (là kỹ thuật test).

# Vậy còn **Testing frameworks**? 

**Testing frameworks** dùng để tổ chức và thực thi các phép kiểm tra viết bởi **assertion libraries**. _Mocha_ và _Jasmine_ là hai lựa chọn phổ biến với lập trình viên JavaScript (thực ra 2 bạn này cũng gần gần giống nhau). Ví dụ sau minh họa việc dùng _mocha_ với _shoud.js_: 

``` js
describe('mycode.doSomething', function() { // mocha
  it ('in ra từ "Việt Nam"', function() {   // mocha

    var output = mycode.doSomething();      // shoud.js
    output.should.equal('Việt Nam');        // shoud.js    
  
  });
  
  it ('trả về lỗi nếu truyền vào ham số', function() {  // mocha
  
    var output = mycode.doSomething('a input'); // shoud.js
    output.should.be.an.Error;                  // shoud.js
  
  });
});
```

# **Testing Environments** là gì?

Với người mới, khái niệm này tương đối khó hiểu. Theo định nghĩa, nó là môi trường mà lập trình viên chạy toàn bộ việc kiểm thử trong đó. Môi trường này chứa các thành phần liên quan đến phần mềm, phần cứng, và network đã được cấu hình sẵn để giúp việc thực thi việc kiểm thử. Việc cấu hình phải giúp biến môi trường test thành gần như tương đồng với môi trường thực mà sản phẩm sẽ chạy sau này. Chỉ có như thế thì việc test mới giúp lập trình viên phát hiện ra các lỗi của chương trình.

Ví dụ về cấu hình cho Test Enviroment để kiểm tra một ứng dụng web:
```js
Web Server - IIS/Apache
Database - MS SQL
OS - Windows/ Linux
Browser - IE 9 /FireFox Quantum
Java version : version 6
```

# Testing Plugin

Testing plugins là những phần mở rộng giúp gia tăng tính năng cho các test assertion.  Đoạn code sau cho thấy tính năng của 1 plugin cho _Chai.js_ tên là _Sinon.js_, giúp tạo mocks, stubs<sup>[1](#footnote1_stub)</sup> và fake servers: 

```js
describe('API integration', function(){
  var server, setupStub, JSONresponse;

  beforeEach(function() {
    setupStub = sinon.stub(todo, 'setup');
    server = sinon.fakeServer.create();
  });

  it('todo.setup receives an array of todos when todo.init is called', function () {
  });

  afterEach(function() {
    server.restore();
    setupStub.restore();
  });
});
```
# Kết luận

Dẫu chưa chỉ ra hết các đặc tính, việc phân loại như trên cũng giúp những lập trình viên mới nắm bắt được bản chất của từng công cụ. Ranh giới của từng công cụ riêng lẻ sẽ còn phải thảo luận thêm (ví dụ như Mocha vừa là testing framework, vừa là testing enviroment). Các vấn đề này sẽ được thảo luận trong những bài tiếp theo.

<a name="footnote1_stub">1</a>: _Nếu bạn là một lập trình viên web thì kiểu gì bạn cũng cần kết nối đến API của bên thứ 3 (như của Twilio, GitHub, Twitter, hoặc Mailgun), hoặc là kết nối đến các microservice khác của chính bạn. Dẫu vậy, khi làm unit test, thì ngược lại, bạn không muốn tạo HTTP requests đến các dịch vụ kia. Thay vì thế, bạn lại thích các tạo các “fake” request, và nhận về một "stub", từ đó đánh lừa hệ thống là request đã được tạo._ 




# Tham khảo
- [Assertion (software development)](https://en.wikipedia.org/wiki/Assertion_(software_development))
- [What's the difference between assertion library, testing framework and testing environment in javascript?](https://stackoverflow.com/questions/25678063/whats-the-difference-between-assertion-library-testing-framework-and-testing-e)
- [4 Classifications of Testing Software](http://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/)
- [What is Test Environment?](https://www.tutorialspoint.com/software_testing_dictionary/test_environment.htm)

