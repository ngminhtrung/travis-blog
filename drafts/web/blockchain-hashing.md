---
id: 103
title: '[Blockchain] Về hash'
date: 2017-09-27T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - Blockchain
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

Về has

[What Is Hashing? Under The Hood Of Blockchain, an in-depth guide by BlockGeeks](https://blockgeeks.com/guides/what-is-hashing/)

Như bài viết tổng quan về `hash` đã đề cập, *hashing* là một khái niệm kỹ thuật quan trọng trong *blockchain*. Do kỹ thuật này tương đối xa lạ với những người ngoại đạo không được học chính quy ngành Khoa học Máy tính, tôi muốn dịch và bổ sung những giải thích của cá nhân giúp thêm nhiều người hiểu về nó. 

### [Nhắc lại] Hashing là gì?

Nói một cách ngắn gọn, `hashing` là phép biến một chuỗi đầu có độ dài bất kỳ (input) thành một chuỗi mới có độ dài cố định (output). Trong trường hợp của đồng tiền mật mã như Bitcoin, dữ liệu về giao dịch chính là thông số đầu vào, dữ liệu này được truyền vào một hàm băm (ví dụ Bitcoin sử dụng hàm băm SHA-256), kết quả trả về là một chuỗi có độ dài cố định (trường hợp của Bitcoin là 256 ký tự). Lưu ý: SHA-256 là viết tắt của **S**ecure **H**ashing **A**lgorithm 256.

Ví dụ sau (sử dụng command line trong Linux, Mint distro) để tạo ra một *SHA-256 hash*:

```
echo -n Welcome | sha256sum | awk '{print $1}'
0e2226b5235f0ff94a276eb4d07a3bfea74b7e3b8b85e9efca6c18430f041bf8
ngminhtrung@ngminhtrung-Inspiron-7570 ~/W/G/ngminhtrung.github.io> 
echo -n Trung | sha256sum | awk '{print $1}'
83080cf917ea74e4ac2134ed1194012fabf2a15c59b835cccc175ce1e9f63e57
ngminhtrung@ngminhtrung-Inspiron-7570 ~/W/G/ngminhtrung.github.io> 
ngminhtrung@ngminhtrung-Inspiron-7570 ~/W/G/ngminhtrung.github.io> 
echo -n trung | sha256sum | awk '{print $1}'
83324160d43bdb327e555b6be8ce654e8c693e95c0a4f10817499bb9e0224a1d
```


Lưu ý:
- Lệnh trong linux: Linux sha256sum command https://www.computerhope.com/unix/sha256sum.htm hoặc http://man7.org/linux/man-pages/man1/sha256sum.1.html
- Công cụ online để tính SHA-256: https://www.movable-type.co.uk/scripts/sha256.html
- Thư viện node.js để tính SHA-256: https://www.npmjs.com/package/crypto-js
- Về SHA-2 https://en.wikipedia.org/wiki/SHA-2
- Re-Hashed: The Difference Between SHA-1, SHA-2 and SHA-256 Hash Algorithms  https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/

Như bạn thấy, trong trường hợp của SHA-256, không cần biết dữ liệu đầu vào dài ngắn như thế nào, dữ liệu trả về ở đầu ra luôn có độ dài cố định là 256 ký tự. Điều này vô cùng quan trọng khi chúng ta cần làm việc với một lượng lớn dữ liệu và giao dịch. Vì vậy, một cách căn bản thì thay vì phải ghi nhớ dữ liệu đầu vào vốn rất nhiều, chúng ta chỉ cần ghi nhớ giá trị `hash` và lưu dấu vết (!!!). Trước khi bàn tiếp, hãy xem các đặc tính cần có của một hàm băm khi dùng trong lĩnh vực *blockchain*.

### Các đặc tính của hàm băm trong blockchain

Như đã nói ở bài trước, hàm băm trong blockchain đặc biệt hơn hàm băm thường, nó được gọi là "cryptographic hash function" (hàm băm mật mã học). Với hàm băm mật mã học, nó cần thỏa mãn một vài điều kiện sau để được coi là an toàn. 

#### Yêu cầu 1: Hàm băm đó phải thuộc dạng "Deterministic"

Yêu cầu này có nghĩa là với cùng 1 giá trị đầu vào, dù bạn có cho nó chạy qua hàm băm bao nhiêu lần đi chăng nữa, thì tất cả các giá trị đầu ra phải giống nhau. Cái này nghe thì có vẻ đương nhiên, nhưng do tính chặt chẽ của toán học nên người ta vẫn phải nêu ra. Hơn nữa, một khi yêu cầu này không thỏa mãn thì sẽ dẫn đến một khả năng là cùng một đầu vào, sẽ tương ứng với vài giá trị đầu ra, lúc đó thì kiểm soát làm sao được. 

Lưu ý: Không rõ là có hữu ích hay không, cứ để 1 đường dẫn đến bài viết về [các mô hình toán học trên Wikipedia](https://en.wikipedia.org/wiki/Mathematical_model), trong đó nói về cặp "Determinisic với Probabilistic) để có một hình dung rộng hơn về một khái niệm toán sử dụng trong blockchain. 

#### Yêu cầu 2: Hăm băm đó phải có tốc độ tính toán nhanh

Hàm băm này phải có khả năng trả về giá trị hash từ dữ liệu đầu vào trong một khoảng thời gian ngắn. Ngắn thế nào thì sẽ nói tiếp sau. Còn đương nhiên nó phải càng ngắn càng tốt rồi. 

#### Yêu cầu 3: Hăm băm đó phải có khả năng chống ánh xạ ngược 

Thuật ngữ tiếng Anh gốc là "Pre-Image Resistance". Có lẽ mấy bạn học chuyên ngành mật mã hoặc thuật toán không xa lạ với thuật ngữ gốc này, còn người ngoài, chắc phải thêm vài bước giải thích. 

Thế này nhé, cụm "*Pre-image Resistance*" bao gồm 2 từ đơn: (1) *Pre-image* (hoặc *preimage*) tạm gọi là "*ảnh ngược*", và (2). *Resistance* mang nghĩa là *chống lại*. 

Từ thứ (2) thì dễ rồi, để hiểu từ thứ (1) thì phải xuất phát từ khái niệm "*ánh xạ*" trong toán học (xem [Wikipedia tiếng Việt](https://vi.wikipedia.org/wiki/%C3%81nh_x%E1%BA%A1), hoặc [Wikipedia tiếng Anh mục Inverse Image](https://en.wikipedia.org/wiki/Image_(mathematics))).

Khả năng chống ánh xạ ngược có nghĩa là với hàm băm được dùng, một khi chỉ biết giá trị đầu ra (`hash`), thì "khó" (khó trong ngoặc kép) mà tìm được giá trị đầu vào. Lưu ý lần nữa là ở đây ta dùng từ "khó" (tiếng Anh dùng từ *infeasible*) chứ không dùng từ "bất khả thi" (*impossible*) bởi không có gì trên đời là không thể (về mặt lý thuyết).

Ví dụ về trường hợp không thỏa mãn yêu cầu trên: Giả sử bạn chơi trò tung xúc xắc 6 cạnh nhưng không được biết là con số nào ứng với cạnh ngửa lên. Chỉ có quản trò biết, và thay vì nói cho bạn con số kia, hắn lại "*băm*" (`hash`) con số đó và đưa cho bạn kết quả đã băm. Làm thế nào để biết được con số kia? Đơn giả thôi, xúc xắc có 6 số từ 1 đến 6, bạn biết thuật toán hàm băm là gì rồi, mời bạn ngồi lập bảng để tính giá trị băm từ 1 đến 6, sau đó so sánh với giá trị băm mà thằng cha kia đưa, đối chiếu với bảng, thế là tìm được số của cạnh lật ngửa. 

Trường hợp trên thì dễ quá rồi. Nhưng thử tưởng tượng thay vì tung xúc xác 6 cạnh, bạn phải tung xúc xắc có 100 triệu cạnh (hơi hoang tưởng 1 chút), thì cách làm trên áp dụng được hay không? Có, người ta gọi đó là "brute-force method", một dạng thử đúng sai lấy toàn bộ các khả năng đầu vào theo quy luật sắp xếp to dần chẳng hạn, lần lượt băm giá trị ứng với từng khả năng, băm đến khi tìm được giá trị ứng với giá trị `hash` kia thì thôi. Không dám nói bừa là mất bao lâu, nhưng có lẽ đơn vị là năm (10 năm, 100 năm trở lên). 

[image01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
