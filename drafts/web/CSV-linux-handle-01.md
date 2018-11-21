---
id: 103
title: '[Linux] Sử dụng Command Line để xử lý file CSV'
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

Nguồn: [Working with CSVs on the Command Line](http://bconnelly.net/working-with-csvs-on-the-command-line/)

Trước khi vào phần chính, cần nhớ qua những lệnh sau sẽ được dùng để thao tác với CSV.

## BẢNG DANH SÁCH CÁC LỆNH SỬ DỤNG ĐỂ THAO TÁC VỚI TEXT VÀ CSV
--- 

| Lệnh  | Mô tả |
|---    |---    |
|`awk`    | AWK là ngôn ngữ lập trình (và lệnh) vô cùng hiệu quả cho việc xử lý text ([xem hướng dẫn](http://www.linuxmanpages.com/man1/awk.1.php)) |
| `cat`   | con**cat**enates (nối chuỗi) và in files ([xem hướng dẫn](http://www.linuxmanpages.com/man1/cat.1.php)) |
| `cut`   | xóa bỏ bytes, ký tự, hoặc fields (trường) được chỉ định trong files ([xem hướng dẫn](http://www.linuxmanpages.com/man1/cut.1.php)) |
| `grep`  | tìm những dòng matching (hoặc không matching) dựa trên 1 pattern cho trước ([xem hướng dẫn](http://www.linuxmanpages.com/man1/grep.1.php)) |
| `head`  | xuất ra phần đầu tiên của 1 file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/head.1.php))  |
| `sed`   | thực hiện các xử lý đơn giản đối với text trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/sed.1.php)) |
| `tail`  | xuất ra phần cuối của 1 file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/tail.1.php))  |
| `tr`    | thay đổi (dịch chuyển - **tr**anslate) các ký tự trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/tr.1.php)) |
| `wc`    | đếm số ký tự, từ, hoặc dòng trong file ([xem hướng dẫn](http://www.linuxmanpages.com/man1/wc.1.php)) |

## Về Piping (đường ống) và Redirection (chuyển hướng) trong Linux
---

Để bắt đầu với việc xử lý CSV, ta cần hiểu về nguyên lý *đường ống* và *chuyển hướng* trong Linux, bởi nó sẽ giúp ta hiểu cách thức viêt tức câu lệnh. 

Hãy nhớ là hầu hết các lệnh tồn tại trong chế độ dòng lệnh đều được phát triển với cùng 1 triết lý: làm 1 việc duy nhất và làm cho chuẩn. Sức mạnh thực sự của câu lệnh đến từ việc các câu lệnh có thể được "dắt dây" (nối) với nhau để thực hiện các nhiệm vụ phức tạp. Một khi đã biết một tập các câu lệnh nào đấy thì người dùng có thể kế hợp lại với nhau để làm bất kỳ điều gì. 

### Xuất ra file sử dụng câu lệnh điều hướng

Bình thường khi gõ lệnh thì hầu hết kết quả sẽ được in ngay ra màn hình. Tuy nhiên, có nhiều tình huống người dùng cần in kết quả ra 1 file, để sau đó sử dụng tiếp vào 1 việc khác (chứ lúc đó không cần copy paste vào 1 editor, save, rename, mất thời gian). Cái này gọi là *điều hướng* (tức là đổi hướng, thay vì cho ra màn hình, thì cho ra file).

Với câu lệnh điều hướng (output redirection), bạn có thể xuất kết quả của dòng lệnh ra file sử dụng ký tự `>`. Ví dụ: khi dùng lệnh `ls` để in ra danh sách các folder có trong folder đang làm việc, thay vì chỉ để xuất kết quả ra màn hình, ta có thể gọi:
```
ls > danhsach.txt
```
sau đó dùng `vim` (hoặc bất kỳ editor nào, như tôi đang dùng `gedit`) để mở. Trong file danhsach.txt sẽ chứa danh sách các folder để ta sử dụng cho mục đích khác. 

Lưu ý: 
- Nếu file phía đầu ra chưa tồn tại, thì `>` sẽ tạo ra một file mới
- Nếu file phía đầu ra đã tồn tại, thì `>` sẽ ghi đè lên file cũ.
- Nếu không muốn bị ghi đè, mà ghi thêm vào file cũ, thì dùng `>>` thay vì `>`.

### Kết nối các câu lệnh thông qua Pipes (đường ống)

Pipes (đường ống), được ký hiệu bởi ký tự `|` (dấu sổ dọc), cho phép kết quả xuất ra của chương trình này sẽ được gửi đến làm đầu vào của 1 chương trình khác. Ưu điểm? Thay vì phải xuất ra hết file này đến file khác, rồi gọi lại chúng ở từng câu lệnh, thì bây giờ tất cả chỉ cần đặt trong cùng 1 dòng lệnh, tự chúng sẽ tung hứng dữ liệu/ kết quả qua lại để  làm việc. Ta chỉ ngồi cuối ... đường ống đợi sung rụng thôi. 

Ví dụ: Nếu muốn đếm số dòng trong file *danhsach.txt* (chứa danh sách folder) nói trên, nếu theo cách thông thường, cần gọi `ls > danhsach.txt` đầu tiên, sau đó gọi tiếp `wc -l danhsach.txt`. Cần 2 dòng lệnh. Cần lưu tên file ra riêng, rồi gọi lại lần nữa. Sử dụng phương pháp ống nói trên, 2 nhập thành 1 như sau:
```
ls | wc - l
```
Quá ư là ngắn gọn mà vẫn đạt được cùng 1 kết quả!!!!

## Xóa thông tin dư thừa trong file CSV
---

### Xóa các dòng ghi chú (`comment`) trong file CSV

Comments (ghi chú/ bình luận) là thông tin phụ được lưu luôn trong file CSV cho dù nó không có ý nghĩa về mặt số liệu. Tác giả của file CSV đôi khi muốn lưu vài thứ cá nhân của họ vào, như là tên của người thu thập dữ liệu, ngày tháng, dụng cụ thí nghiệm, một vài điều đặc biệt khác cần lưu tâm. Tuy các comment được phân biệt với dữ liệu thông qua ký tự `#` nhưng không phải chương trình đọc CSV nào cũng phân biệt được và xử lý tốt. Vậy nên nhiều lúc trước khi phân tích dữ liệu, ta cần loại bỏ mấy phần ghi chú này đi. 

Ví dụ với file CSV tên là *input.csv* sau:
```
Temperature,Row,Column,Luminescence
# Luminescence of evolved strain
# Collected by Harvey I. Vibrio - 2012/06/27

26.3,0,0,7444.945
26.3,0,1,4845.375
26.3,0,2,4056.362
# Look at this luminescence!!!
26.3,0,3,4883.137
26.3,0,4,3593.289
26.3,0,5,2645.281
26.3,1,2,10507.588
```
Nhiệm vụ: loại bỏ comment, tống những dòng còn lại vào 1 file mới. Câu lệnh như sau:
```
grep -v "^#" input.csv > input-nocomments.csv
```

### Loại bỏ đầu mục (`header`)
Header (đầu mục) thường ám chỉ tên gọi của từng cột. Header xuất hiện ngay ở đầu của file, với các tên được ngăn cách nhau bằng dấu phẩy. Việc loại bỏ header có lợi ích khi cần gộp nhiều file CSV lại với nhau, hoặc đơn giản là chương trình đọc CSV đang dùng quá khắt khe. Ví dụ như R yêu cầu phần header phải là dòng đầu tiên của file, và dòng tiếp theo không được là comment. 

Vẫn tiếp tục với ví dụ trên, nhiệm vụ giờ là loại bỏ header ở dòng đầu tiên, ta thực hiện nó với lệnh `cat` và `sed`:
```
cat input.csv | sed "1 d" > input-noheader.csv
```
Chuỗi câu lệnh trên có tác dụng:
- `cat` giúp in nội dung của file *input.csv*, truyền cho `sed`.
- `sed` xóa dòng đầu tiên của file, trong đó tham số `d` viết tắt của **d**elete (xóa), và `1` nghĩa là số dòng muốn xóa (tính từ dòng đầu tiên). Muốn xóa 3 dòng thì thay `1 d` thành `3 d`.
- Ký tự `>` giúp điều hướng, xuất kết quả cuối cùng ra file *input-noheader.csv*.

Nếu muốn xóa cả comment, thì kết hợp với lệnh `grep` ở trên, ta có:
```
cat input.csv | grep -v "^#" | sed "1 d" > input-nocomment-noheader.csv
```

### Thay đổi `delimiter` (dấu phân tách)

Ta có thể loại bỏ những dấu phân cách trong file bằng lệnh `tr` (viết tắt của **tr**anslate). Ví dụ, để thay thế những delimiter dạng *tab* trong file *input.tsv* thành *input.csv* (phân cách bởi dấu phẩy), ta viết:
```
cat input.tsv | tr "\\t" "," > output.csv
```
Lệnh `tr "\\t" ","` có nghĩa là thay thế những ký tự dạng *tab* (đại diện bởi `\\t`) thành ký tự "*,*" (đại diện bởi `,`).

Ngược lại, ta có thể chuyển đổi 1 file CSV thành TSV bằng câu lệnh
```
cat input.csv | tr "," "\\t" > output.tsv
```

> Lưu ý: Vấn đề sẽ phức tạp hơn nếu các con số cũng chứa dấu phẩy. Điều này sẽ được bàn ở 1 bài khác. Nhưng nó chung, nếu data cũng đã chứa dấu phẩy, thì tốt nhất là dùng TSV chứ không dùng CSV, còn không phải sử dụng một vài đoạn lệnh phức tạp hơn để phân biệt các cột. 

## Lấy thông tin về tập dữ liệu
---
Trước khi làm việc với dữ liệu, có thể bạn sẽ muốn tìm hiểu qua một chút về dữ liệu này, như nó lớn như thế nào, trong đó có dữ liệu loại gì. Phần dưới đây sẽ giới thiệu 1 vài cách để lấy thông tin kiểu này.

### Xem những dòng đầu tiên của file
Cái này nghe hơi kỳ kỳ, tại sao lại cần xem những dòng đầu tiên của file? Nghĩ lại thì cũng có vẻ đúng. Giả sử ta nhận được 1 file vài trăm nghìn dòng, kích thước lớn, nội dung bên trong ra sao chưa biết, thì mở 1 phát cả file lên sẽ là ... dại :P. Tốt nhất chỉ mở khoảng 10 - 20 dòng đầu thôi, xem nó thế nào đã. Ở đây sử dụng lệnh `head`.  Ví dụ
```
head input.csv
```
sẽ hiển thị 01 dòng đầu tiên của file *input.csv*. Muốn xem thêm 7 dòng (tức à từ 1 đến 17), hãy thêm tham số `-n 7`:
```
head -n 7 input.csv
```
### Đếm số dòng có comment
Cái này dễ:
```
grep "#" input.csv | wc -l
```
### Đếm số dòng 
Nhiệm vụ: đếm số dòng không phải comment, không phải header (dòng 1):
```js
cat input.csv | grep -v "^#" | sed "1 d" | wc - l
```
Ghi chú: Câu lệnh trên là từ bài gốc của Brian Connelly. Không hiểu tại sao lại cần `cat input.csv` ở đây. Tôi đã thử với cả 2 phương án có và không có `cat input.csv` cho file mẫu bên trên đều ra cùng 1 kết quả là 9.

### Xác định số cột
Việc xác định số cột sẽ được tính dựa vào những dòng không phải comment.
```
cat input.csv | grep -v "^#" | awk "{print NF}" FS=, | uniq
```
Chuỗi lệnh trên có tác dụng
- `cat input.csv` in ra toàn bộ file *input.csv*, tống sang lệnh `grep`
- `grep -v "^#"` giúp loại bỏ những dòng có comment, gom những dòng còn lại làm 1 ròi tống sang `awk`.
- `awk "{print NF}" FS=,` sẽ báo lại số trường được phân tách bởi dầu phẩy ("`,`") (chính là tham số `FS`) ở mỗi dòng. Kết quả trả về được gửi sang `uniq`
- `uniq` sẽ báo lại số lượng cột trong file. Đây là con số "*duy nhất*", do về lý thuyết, mỗi dòng phải có cùng một số lượng dữ liệu tương ứng với các trường. Nếu đúng thế, `uniq` sẽ chỉ trả về 1 số. Nếu có nhiều hơn 1 số được trả về, nghĩa là nó ko còn duy nhất, nghĩa là có dòng có nhiều/ ít hơn cột so với dòng khác, thì sẽ có vấn đề cần phải kiểm tra lại.

Ghi chú: Sau khi thử thêm, xóa dữ liệu trong file *input.css* và chạy lệnh trên thì thấy kết quả ra có gì sai sai. Sẽ kiểm tra lại vụ này.

Một cách khác:
- Xóa header và comment, rồi chỉ lấy dòng đầu tiên trong dữ liệu còn lại
- Xóa hết các ký tự, chỉ để lại dấu phẩy `,` (sử dụng RegEx `'s/[^,]//g'`)
- Đếm số dấu phẩy (sử dụng `wc -c` với `c` viết tắt của **c**haracters). 

```
cat input.csv | grep -v "^#" | sed "1 d" | head - 1 | sed 's/[^,]//g' | wc - c
```

Mặc dù số dấu phẩy ít hơn số cột, nhưng lệnh `wc - c` tính hteem cả `\n` (ký tự xuống dòng).

## Gộp nhiều file CSV
---

### Gộp DÒNG của hai file CSV trở lên

Giả sử có 3 file *input1.csv*, *input2.csv*, và *input3.csv*, muốn gộp lại thành 1 file chung duy nhất theo chiều dọc (tức là file sau được chèn vào đuôi file trước), ta sử dụng `cat`:
```
cat input1.csv input2.csv input3.csv > combined.csv
```
Điều quan trọng là phải đảm bảo mỗi file có số lượng cột là như nhau, các cột được sắp xếp theo một thứ tự giống nhau.

Trường hợp mỗi file đều có có header, cách dễ nhất là loại bỏ dòng header của từng file rồi nhập vào file kế tiếp sử dụng lệnh `>>`. 
```js
cat input1.csv  > combined.csv
cat input2.csv | sed "1 d" >> combined.csv
cat input3.csv | sed "1 d" >> combined.csv
```
Lưu ý: Ta vẫn giữ nguyên header của *input1.csv* để nó trở thành header của *combined.csv*.

### Gộp CỘT của nhiều file CSV
Giả sử có 2 file *input1.csv* và *input2.csv* muốn gộp lại thành 1 file duy nhất theo chiều ngang (tức là cột của file sau sẽ được đặt bên cạnh của cột file trước), ta sử dụng `paste`:
```
paste -d, input1.csv input2.csv > combined.csv
```
Ở đây, tham số `-d` sẽ thông báo cho `paste` là nội dung trong 2 file *input1.csv* và *input2.csv* sẽ được phân cách (**d**eliminated) bởi dấu phẩy ("`,`"). Phải có `-d` bởi mặc định `paste` sẽ phân cách các cột bằng `tab`.

Điều quan trọng là phải đảm bảo thứ tự dữ liệu theo dòng trong mỗi file phải giống nhau, tức là dữ liệu ở dòng số 8 chẳng hạn của *input1.csv* phải tương ứng với dữ liệu ở dòng số 8 của *input2.csv*.

## Trích xuất một phần dữ liệu
---
### Lấy ra chính xác một vài dòng trong file
### Extracting Rows Based on Some Value
### Lấy ra một cột nào đó

## Làm việc với file CSV nén
---
### Nén file CSV với bzip2

### Xử lý file CSV bị nén bởi bzip2

### Nén file CSV với gzip

### Xử lý file CSV bị nén bởi gzip



## Câu lệnh cơ bản

Giờ thì ta bắt tay vào với việc xử lý file. Nhưng, lại nhưng, muốn xử lý file thì phải hiểu một chút về 2 câu lệnh sau: (1) `grep`, và (2) `wc`.
- `grep` dùng để so sánh các đoạn trong file xem có giống (hoặc không giống) với điều kiện ta mong muốn hay không, sau đó lọc thứ ta cần ra.
- `wc` dùng để đếm số từ, ký tự, hoặc dòng trong file

### Sử dụng `grep` cơ bản
 
Waaa, google "*về lệnh `grep`*" phát thấy xuất hiện bao nhiêu bài viết bằng tiếng Việt về nó. Đủ hiểu là lệnh này quan trọng và phổ biến như thế nào. Nếu muốn biết, ta có thể tra hướng dẫn về `grep` thông qua `man grep`. Nếu muốn đọc tóm gọn, mời mở bài ["Tìm hiểu về lệnh grep trong Linux" ở Viblo.asia](https://viblo.asia/p/tim-hieu-ve-lenh-grep-trong-linux-DZrGNNDdGVB). Có mấy mục sau để nhớ nhanh:

1. Tìm một chuỗi trong một file
2. Tìm chuỗi trong nhiều file cùng lúc
3. Tìm kiếm không phân biệt hoa thường
4. Tìm kiếm theo regular expression
5. Tìm chính xác với grep -w
6. Hiển thị thêm dòng trước, sau, xung quanh dòng chứa kết qủa
7. Tìm tất cả các file ở tất cả các thư mục con
8. Tìm kiếm ngược
9. Đếm số kết qủa
10. Chỉ hiển thị tên file
11. Hiển thị số thứ tự của dòng kết qủa

Còn ở bài này, do đang theo mạch xử lý CSV của Brian Connelly, hãy nhớ về câu lệnh giúp xóa tất cả những dòng bắt đầu bởi dấu `#` (đánh dầu comment trong CSV) của *file_01.csv* rồi xuất ra 1 file mới tên là *file_01_no_comments.csv* như sau:
```
grep -v "^#" file_01.csv > file_01_no_comments.csv
```
trong đó:
-  `-v` để ra lệnh cho `grep` tìm kiếm dạng loại trừ (tìm kiếm ngược). Thay vì tìm những dòng có `#` thì bây giờ tìm những dòng không có `#`. Đơn giản.
- `^#` chính là tham số đầu vào (1 pattern) để `grep` hiểu ta muốn tìm theo điều kiện gì. Đây cũng chính là *regular expression*, trong đó `^` nghĩa là "*hãy tìm từ đầu của dòng/ file*", kết hợp với `#` tức là "*hãy tìm những dòng bắt đầu bởi #*".

### Sử dụng `wc` cơ bản

Lệnh `wc` cũng phổ biến không kém, google cái ra một loạt bài hướng dẫn bằng tiếng Việt, như là "[Hướng dẫn sử dụng lệnh wc và ví dụ trên Linux - CuongQuach](https://cuongquach.com/huong-dan-su-dung-lenh-wc-linux.html)", hoặc "[Lệnh wc trong Linux - JustPassion](http://www.justpassion.net/tech/programming/bash-shell/lenh-wc-trong-linux.html)". Tốt nhất là đọc phần `man wc` để có thông tin chi tiết, không thì cứ xem mấy bài kia là xong, nhanh gọn. 

Với nội dung CSV này, tạm thời cứ nhớ lệnh `wc -l danhsach.txt` sẽ trả về số dòng trong file *danhsach.txt*. Chấm hết? Chưa!
- Tham số `-l` là viết tắt của **l**ine (dòng)
- Chuyển sang đếm từ? viết thành `wc - w` trong đó `w` viết tắt của **w**ord (từ)

Ngoài ra nó còn có thể:
- đếm số lượng bytes (với `-c`) hoặc ký tự (với `-m`)
- hiển thị dòng text dài nhất

Lưu ý: Ngoài `wc`, còn [3 lệnh nữa đều cho biết số dòng trong 1 file text](https://cuongquach.com/4-chuong-trinh-lenh-de-biet-luong-dong-cua-1-file-text.html), đó là `awk`, `sed`, và `mapfile` . Nhưng ưu nhược điểm từng thằng ra sao, lúc nào dùng thằng nào thì chưa rõ. Sẽ tìm hiểu sau.


## Tham khảo
---

Dưới đây có những bài vừa là tham khảo (đã đọc), vừa là bookmark (lưu để có thể tìm hiểu sau này).
- [Piping và chuyển hướng câu lệnh trong Linux](https://viblo.asia/p/piping-va-chuyen-huong-cau-lenh-trong-linux-bJzKmk4Ol9N)
https://www.joeldare.com/wiki/using_awk_on_csv_files
https://stackoverflow.com/questions/27549368/linux-how-to-manipulate-csv-file
- [Linux Tutorial - 10. Grep and Regular Expressions](https://ryanstutorials.net/linuxtutorial/grep.php)
- [ Using Grep & Regular Expressions to Search for Text Patterns in Linux](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux)
- [How to count number of columns in CSV file using bash shell](https://linuxconfig.org/how-to-count-number-of-columns-in-csv-file-using-bash-shell)

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
