Phân tích đoạn code sau:

```html
<header>
  <div class="bg-dark collapse" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
          <h4 class="text-white">About</h4>
          <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.
          </p>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-white">Follow on Twitter</a>
            </li>
            <li>
              <a href="#" class="text-white">Like on Facebook</a>
            </li>
            <li>
              <a href="#" class="text-white">Email me</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark box-shadow">
    <div class="container d-flex justify-content-between">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        <strong>Album</strong>
      </a>
      <button 
              class="navbar-toggler collapsed" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarHeader" 
              aria-controls="navbarHeader" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>
```

Đoạn code trên chứa 2 phần lớn:

```html
<header>
  <!-- Phần 1 -->
  <div class="bg-dark collapse" id="navbarHeader">
  <!-- Nội dung trong phần 1 -->
  </div>
  <!-- Phần 2 -->
  <div class="navbar navbar-dark bg-dark box-shadow">
    <div class="container d-flex justify-content-between">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <!-- Nộ dung trong phần 2.1 -->
        <strong>Album</strong>
      </a>
      <!-- Phần 2.2 -->
      <button 
              class="navbar-toggler collapsed" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarHeader" 
              aria-controls="navbarHeader" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>
```

Toàn bộ code trên được bao trong 1 thẻ HTML 5, thẻ `<section>`:
- Phần 1: Phần nội dung ẩn chỉ được hiện ra khi click vào nút của phần 2.
- Phần 2: Navigation bar, có 1 chữ Album đặt trong thẻ `<a>`, và 1 nút để hiện phần 1.  

### Để thực hiện viện ẩn/ hiện phần 1

Việc click vào nút phần 2.2 có thể giúp ẩn/ hiện phần 1 là nhờ vào plugin "Collapse" của Bootstrap. Phần 1 được gọi là 1 "collapsible element", còn nút của phần 2.2 gọi là "control element".

Thiết lập cho việc này như sau:
- "collapsible element" (tức là phần 1) phải có:
    - `class` là `collapse`: nghĩa là mặc định ẩn. 
    - `id` là 1 cái tên nào đó, nhưng phải có, trường hợp này là "navbarHeader".
- "control element" (tức là phần 2.2) phải có:
    - `data-target` gán với `id` của "collapsible element", tức là "navbarHeader".
    - `data-toggle` gán bằng "collapse"
    - `aria-expanded` gán bằng `false` do "collapsible element" mặc định là ẩn. Nếu mặc định "hiện" thì phải gán bằng `true`.
    - còn `aria-controls` thì không cần thiết trong trường hợp này. Xem thêm về mục này ở [đây](https://getbootstrap.com/docs/4.0/components/collapse/#accessibility).

### Thiết lập grid cho phần 1

```html
  <div class="bg-dark collapse" id="navbarHeader">
    <div class="container">
      <div class="row">
        <!-- Cột trái -->
        <div class="col-sm-8 col-md-7 py-4">
          <h4 class="text-white">About</h4>
          <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.
          </p>
        </div>
        <!-- Cột phải -->
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li>
              <a href="#" class="text-white">Follow on Twitter</a>
            </li>
            <li>
              <a href="#" class="text-white">Like on Facebook</a>
            </li>
            <li>
              <a href="#" class="text-white">Email me</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
```
Nội dung của phần 1, cột trái và cột phải, được đặt bên trong 1 thẻ `<div>` class "container" và 1 thẻ `<div>` class "row". 
- "container" là thành phần cơ bản bắt buộc phải dùng trong Bootstrap
- "row" là 1 phần của "grid system". Do chi có 1 div row, nên trong đây chỉ có 1 dòng, nhưng chứa 2 cột trái phải.
- "col-sm" là max container width là 576px. Dưới mức này thì 2 cột trái phải sẽ được điều chỉnh thành trên dưới.


|#  | Class       | Ý nghĩa |
|---|---                  |---      |
| 1 | d-flex              | flexbox, `display: flex` |
| 2 | flex-column         | Căn dạng cột (vertically) cho các phần tử con |
| 3 | flex-md-row         | Responsive variation, cho size "md", lúc này căn dạng dòng. Khi width vẫn còn lớn hơn hoặc bằng 768px thì vẫn sử dụng flex-row |
| 4 | align-items-center  | flexbox, `align-item: flex-center`  | 
| 5 | p-3                 | `p` thay cho `padding`. `3` là số kích thước, không có hậu tố khác sau `p`, như "t, b, l, r, x, y", tức là "blank". Đây là class để thiết lập cả "margin" lẫn "padding" cho cả 4 phía của element |
| 6 | px-md-4             | `p` cho `padding`, `x` cho cả "left" lẫn "right", `md` cho responsive medium |
| 7 | mb-3                | `m` cho `margin`, `b` cho "bottom" |
| 8 | bg-white            |
| 9 | border-bottom       |
|10 | box-shadow          |

