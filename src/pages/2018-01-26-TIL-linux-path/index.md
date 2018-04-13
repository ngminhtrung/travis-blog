---
id: 130
title: 'Linux - $PATH để làm gì?'
date: 2018-01-26
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - path
  - fish
  - TIL
  - todayilearn
  - shell
---

Ghi chú: Series Today I Learn trong vòng 100 ngày thử thách bản thân.

Từ lúc đụng vào Linux, đi đâu cũng thấy `$PATH`. Vừa cài chương trình tên `jrnl` vào máy, mà gõ báo lỗi `command not found`, người ta hướng dẫn là phải kiểm tra và thay đổi `$PATH`. Thôi đành mất công tìm hiểu chút để thoát khỏi cảnh cứ copy lệnh của người khác mà chẳng hiểu gì.

Lưu ý: Các lệnh bên dưới được thực hiện trên máy dùng [*shell* `fish`](http://travisnguyen.net/linux/2018/01/09/fish-shell-on-linux/).

## `$PATH` là gì?
---
Để trả lời cho câu hỏi này, hãy tưởng tượng mỗi lần ta gõ 1 lệnh nào đó, ví dụ `ls` chẳng hạn (viết tắt của **l**i**s**t, dùng để in danh sách folder), thì hệ điều hành sẽ tìm file thực thi (binary) của chương trình mang tên `ls` ở đâu? Nếu gõ thẳng ra là `/bin/ls` thì chẳng nói, vì lúc đó ta đã bảo trực tiếp cho hệ điều hành sộc vào folder `/bin` là sẽ thấy `ls`. Còn không nói cụ thể, thì chẳng nhẽ sẽ tìm ở toàn bộ các folder trên máy? Lúc này đây ta cần lưu lại đường dẫn đến các chương trình ở 1 nơi nào đó để hệ điều hành biết mà giới hạn chỗ đi tìm. Biến $PATH chính là nơi để lưu lại đường dẫn trên, mà không chỉ một, mà có thể có nhiều đường dẫn, bởi người dùng có thể chứa chương trình ở nhiều folder khác nhau. 

Lưu ý: `$PATH`, không phải `$path`, hay `$Path`.

## Muốn xem `$PATH` chứa gì phải làm sao?
---
Muốn biết xem có những đường dẫn nào lưu trong `$PATH` của máy mình, gõ lệnh sau trong terminal
```
echo $PATH
```
kết quả sẽ tương tự như sau
```
/home/tên-account-của-bạn/bin /home/tên-account-của-bạn/.local/bin /usr/local/sbin /usr/local/bin /usr/sbin /usr/bin /sbin /bin /usr/games /usr/local/games
```
Lưu ý:  Không giống các *shell* khác, trong `fish`, `$PATH` là một danh sách với đường dẫn ngăn cách nhau bởi dấu cách `␣`, không phải dấu dấu hai chấm `:`.

Nhưng trông khó nhìn nhể? Muốn cho thông tin hiện ra dễ đọc hơn, có thể thử với `printf "%s\n" $PATH`. Lệnh `printf` giúp hiện text trong `$PATH` theo format quy định bởi người dùng, ở đây là `"%s\n"`, trong đó `%s` ký hiệu thay cho **s**tring, còn `\n` báo `printf` xuống dòng sau mỗi kết quả. Ta đạt được là:
```
/home/tên-account-của-bạn/bin
/home/tên-account-của-bạn/.local/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
```
Lưu ý: Còn nhiều lệnh khác cho kết quả tương tự. 

## Các đường dẫn trên có bình đẳng không?
---
Dù là anh em trong 1 nhà, nhưng mấy bạn đường dẫn trong `$PATH` không bình đẳng. Bạn nào ở trên (hoặc ngoài cùng bên trái) sẽ được ưu tiên tìm trước, bạn nào ở dưới (hoặc phía bên phải) tìm sau. Một khi Linux đã tìm được chương trình nó cần, nó sẽ dừng việc tìm kiếm trong các đường dẫn phía sau. Tức là có thể có 2 files thực thi cùng tên lưu ở 2 nơi, thì Linux chỉ chạy file đầu tiên mà nó tìm thấy.

## Muốn thay đổi `$PATH` thì cần làm gì?
---
Đối với *shell* `fish`, ta có các lựa chọn sau:

1. Chèn **tạm thời** đường dẫn `/usr/local/bin` và đường dẫn `/usr/sbin`
- lên **đầu** `$PATH`, gõ:
```
set PATH /usr/local/bin /usr/sbin $PATH
```
- xuống **cuối** `$PATH`, gõ:
```
set PATH $PATH /usr/local/bin /usr/sbin
```

Lưu ý: *Tạm thời* ở đây có nghĩa là thiết lập sẽ bị mất sau khi logout. Việc này hữu ích nếu chỉ muốn test mà không làm ảnh hưởng đến hệ thống lâu dài.

2. Chèn **vĩnh viễn**:
- lên **đầu**:
```
set -U fish_user_paths /usr/local/bin $fish_user_paths
```
- xuống **cuối**:
```
set -U fish_user_paths $fish_user_paths /usr/local/bin
```
trong đó `$fish_user_paths` là *universal variable* mà giá trị của nó được chia sẻ mọi lúc mọi nơi trong `fish`.

2. Xóa đường dẫn `/usr/local/bin` khỏi `$PATH`, gõ:
```
set PATH (string match -v /usr/local/bin $PATH)
```

Lưu ý: lệnh `set` giúp hiển thị và thay đổi các variables trong *shell*.


## Làm sao để biết chương trình nào ứng với đường dẫn nào trong `$PATH`
---
Dùng lệnh `which` nhé. Ví dụ muốn biết chương trình mang tên `grep` được chứa ở thư mục nào, gõ `which grep`, kết quả sẽ được tương tự như sau:
```
/bin/ls
```
Lưu ý: `grep` là viết tắt của "**g**lobal **r**egular **e**xpression **p**rint", dùng để so sánh các đoạn trong file text xem có chỗ nào giống (hoặc không giống) với điều kiện ta đưa ra hay không, sau đó lọc ra thứ ta cần.

## Kết luận
---
1. Các câu lệnh và kết quả in ra trong bài viết này có thể khác đôi chút với các *shell* khác nhau, nhưng nguyên lý là không đổi. Để tìm câu lệnh phù hợp với máy mình, tốt nhất là vào đọc hướng dẫn của *shell* đó, ví dụ với `fish` đọc ở [đây](http://fishshell.com/docs/current/tutorial.html#tut_path), còn không thì google với từ khóa `$PATH` và *tên-shell-mặc-định-trên-máy*.

2. Ngoài những thứ trên, lúc đọc còn thấy quá trời những điều ngang dọc như:
  - `$PATH` còn thuộc về 1 thứ là `environment variable`. 
  - Ngoài thứ tự ưu tiên **bên trong** `$PATH`, sẽ còn những thứ tự ưu tiên **bên ngoài** `$PATH`, ví dụ như *aliases*, *exported functions*, *built-in shell commands*, v.v.
  - *Current directory* ký hiệu bằng dấu chấm `"."`.
  - Mấy file `.bashrc` với `.bash_profile` khác nhau chỗ nào?

Những cái trên sẽ để tìm hiểu sau. 

PS: Sau khi thử thay đổi `$PATH` trong máy, vấn đề gốc ban đầu là cài và chạy `jrnl` vẫn chưa được giải quyết. ts.

## Tham khảo sau này:
---
- [How does the path enviroment variable work in linux?](https://unix.stackexchange.com/questions/77898/how-does-the-path-enviroment-variable-work-in-linux)
- [Understanding Environment Variables and the Unix Path](https://cbednarski.com/articles/understanding-environment-variables-and-the-unix-path/)
- [What's wrong with having '.' in your $PATH ?](http://www.faqs.org/faqs/unix-faq/faq/part2/section-13.html)
- [Display or print UNIX / Linux path ~ $PATH variable](https://www.cyberciti.biz/faq/howto-print-path-variable/)
- [How does Unix search for executable files?](https://superuser.com/questions/238987/how-does-unix-search-for-executable-files)
- [Order of executables started in bash](https://unix.stackexchange.com/questions/132623/order-of-executables-started-in-bash)
- [How to correctly add a path to PATH?](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)
- [Difference between .bashrc and .bash_profile](https://superuser.com/questions/183870/difference-between-bashrc-and-bash-profile)