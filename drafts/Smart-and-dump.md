Presentational vs. Container components

| # | Vấn đề  liên quan     |   Presentational      |   Container   |
|---|---            |---                    |---            |
| 1 | Component tập trung vào khía cạnh gì? | vẻ bên ngoài   | bản chất vận hành bên trong | 
| 2 | Chứa cái gì   | DOM markup, styles | Không có DOM markup, không có sytles
| 3 | 
| 4 | Phụ thuộc vào phần còn lại của app ? | Không
| 5 | Tác động đến cách dữ liệu được load, hoặc thay đổi? | Không | 
| 6 | Nhận dữ liệu và callback  | Thông qua props | gọi Flux actions, và cung cấp actions này như là callback đến presentational components
| 7 | Có state hay không ? | Hiếm (thường là UI state thay vì data) | Có state, thường phục vụ như một nguồn cung dữ liệu 
| 8 | Viết dưới dạng gì?  | Functional components (trừ một vài trường hợp) | High Order Components, như connect() từ React Redux, createContainer() từ Relay, hoặc Container.create() từ Flux Utils. 
| 9 | Ví dụ   | Page, Sidebar, Story, UserInfo, List | UserPage, FollowersSidebar, StoryContainer, FollowedUserList