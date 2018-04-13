---
id: 123
title: 'cá.'
date: 2018-01-09
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - linux
tags:
  - linux
  - fish
  - shell
  - terminal
  - bash
---

Nói thực, tôi cũng không biết gì về [`fish`](https://fishshell.com/) cho đến hôm bị cô bạn (Linh Ngô) đè ra cài ngấu nghiến trên máy và bảo cái này là "*bắt buộc*" nếu dùng Mac. `fish` là một *shell* thay cho *bash* trong terminal mặc định của Mac, khi gõ command vào thì thay vì tuyền một màu trắng/ đen thì giờ nó trông xanh xanh đỏ đỏ, chưa kể còn có tính năng autocompletion mỗi khi nhấn `tab`, hoặc phím mũi tên `→`, hoặc gợi ý người dùng các câu lệnh. Bây giờ khi đã chuyển sang Linux, tôi vẫn cài `fish` thay cho `bash` mặc định. Bài viết này sẽ giới thiệu vài điều về *shell* này để bạn dùng thử. Biết đâu lại thích?

### `fish` viết tắt của chữ gì? có phải là "con cá"?
---

![alt text][image00]{: .center-image }

- `fish` thì lấy logo *con cá* thật, nhưng đó chỉ là cách chơi chữ. Thực ra nó là viết tắt của "**f**riendly **i**nteractive **sh**ell", dịch nôm na là "*shell tương tác thân thiện*". 
- Với cái tên trên, mục đích của tác giả của `fish` là tạo môi trường gõ lệnh có tính tương tác hơn, thân thiện hơn với người dùng so với những *shell* có lịch sử lâu đời như `zsh`. 
- `fish` ra đời năm 2005, cho đến thời điểm viết bài thì bạn ý đã tròn 13 tuổi. 

### `fish` có gì hay?
---

#### `fish` màu sắc hơn

Màu mè là một trong những thứ tôi thích nhất ở `fish`. Nói "*màu mè*" nghe có vẻ tiêu cực, chứ nó giúp việc nhìn câu lệnh trở nên trực quan hơn, bớt nhàm chán, dễ tách biệt các thành phần trong dòng lệnh. 

Như ví dụ bên dưới, nếu câu lệnh đúng, cụm *ngminhtrung.github.io* sẽ được tô xanh khác màu với màu trắng của *cd*. Nếu gõ sai, *ijconfig* thay vì *ifconfig*, `fish` sẽ tô đỏ câu lệnh sai ngay lập tức. Cool phết! 

![alt text][image01]{: .center-image }

#### `fish` đưa ra gợi ý khi còn chưa gõ hết

Một trong những thứ khá thử thách đối với đứa không có "*chất command line*" như tôi đấy là gõ nhiều là dễ  bị sai. Và thế là khi gặp `fish`, tôi như *cá* về với *nước* bởi bạn `fish` hoặc gợi ý, hoặc tự động hoàn thành mỗi khi tôi đang gõ dở câu lệnh. Trò này đặc biệt hữu dụng khi gõ đường dẫn dài loằng ngoằng, mà chỉ cần nhầm 1 ký tự thôi là mất công làm lại. Hãy xem ví dụ bên dưới đây:
- Chưa gõ xong bạn `fish` đã gợi ý ngay đoạn còn lại. Không phải lúc nào nó cũng gợi ý đúng, nhưng với tôi, đa phần nó gợi ý đúng. 
- Muốn hoàn thành hết phần gợi ý, chỉ cần gõ `tab` hoặc phím mũi tên "→" thì nhiều "điều kỳ diệu" sẽ xảy ra. 
  - Phím mũi tên "→" sẽ giúp hoàn thành hết phần gợi ý.
  - Phím `tab` cũng giống mũi tên, nhưng nó không thực hiện nếu có quá nhiều lựa chọn để đi tiếp. Lúc đấy nó sẽ xổ ra toàn bộ các hướng để bạn quyết định đi theo hướng nào (ví dụ *cd* vào 1 thư mục con cháu nào đó của thư mục hiện tại). Bạn cần kết hợp gõ các chữ cái bắt đầu của một trong các lựa chọn để `fish` có thể biết bạn cần gì. 

![alt text][image02]{: .center-image }

Nói chung là cứ dùng mới biết được, và rất nên dùng thử. 

#### `fish` có cửa sổ để cấu hình trên nền web cực ngầu

Gõ lệnh sau vào cửa sổ terminal để mở trang cấu hình của `fish`. Có rất nhiều thứ để bạn tùy chỉnh trên nền web.
```js
fish_config
```

![alt text][image03]{: .center-image }

### Kết luận
---

Tôi chưa khám phá hết `fish` nói riêng cũng như thế giới *shell* nói chung, nên bài này chỉ là một điểm khởi đầu nhiều thiếu sót. Nhưng chỉ qua một vài nét, mọi người đều đã thấy `fish` vừa giữ được sức mạnh của *command line*, vừa có thêm sự tiện dụng lẫn trực quan, giúp cho người dùng hứng khởi khi dùng nó. Nếu muốn tìm hiểu thêm về `fish` thì có thể đọc thêm ở phần tham khảo bên dưới đây. 

### Tham khảo

- [Fish Homepage](https://fish.com)
- [Wikipedia - friendly interactive shell](https://en.wikipedia.org/wiki/Friendly_interactive_shell)
- [Perfectly Random - Try out the fish shell](http://www.perfectlyrandom.org/2014/09/21/try-out-the-fish-shell/)
- [Viblo.asia - Fish - A phenomenal Unix Shell](https://viblo.asia/p/fish-a-phenomenal-unix-shell-ZWApGxObM06y)
- [7 Reasons Why You Should Install The Fish Shell](https://www.makeuseof.com/tag/x-reasons-install-fish-shell/)

[image00]: https://ngminhtrung.github.io/images/PostIMG/2018-01-09-fish-terminal/image00.png "Logo của fish"

[image01]: https://ngminhtrung.github.io/images/PostIMG/2018-01-09-fish-terminal/image01.gif "Sắc màu của fish"

[image02]: https://ngminhtrung.github.io/images/PostIMG/2018-01-09-fish-terminal/image02.gif "Tính năng đoán và tự động hoàn thành của fish"

[image03]: https://ngminhtrung.github.io/images/PostIMG/2018-01-09-fish-terminal/image03.gif "Trang web cấu hình fish"

