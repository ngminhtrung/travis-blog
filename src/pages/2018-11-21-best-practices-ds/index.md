---
title: 'Best practice khi viết code trong khoa học dữ liệu?'
date: 2018-11-11
author: ngminhtrung
categories:
  - datasciences
tags:
  - machinelearning
  - datascience
  - best_practices
  - programming
  - '2018'
---

Dịch từ bài viết gốc [Programming Best Practices For Data Science](https://www.dataquest.io/blog/programming-best-practices-for-data-science/) của Srini Kadamati đăng trên Dataquest.io tháng 6 năm 2018.

Chắc các bạn đã biết, mỗi bài toán khoa học dữ liệu đều đi qua những bước lớn sau đây:
- Nhận dữ liệu (data retrieval)
- Làm sạch dữ liệu (data cleaning)
- khám phá và trực quan hoá dữ liệu (data exploration and visualization)
- xây dựng các mô hình thống kê hoặc dự đoán

Những bước trên giúp chúng ta hiểu về từng giai đoạn cần trải qua, nhưng lại không giúp ta nghĩ về "luồng" của việc code.

Thông thường, các đoạn code của chúng ta được viết ra một cách thoải mái không cấu trúc trong các file Jupyter Notebook hoặc một file Python nào đấy. Hơn nữa, đôi khi chúng ta phải chuyển qua lại nhiều lần giữa việc nhận dữ liệu, làm sạch, khai phá, xây dựng mô hình.

Trong bài này, tác giả muốn để cập đến 2 lối tư duy viết code thường gặp trong các dự án khoa học dữ liệu. Mỗi lối tư duy viết code ứng với 2 định hướng: (1) làm **prototype**, và (2) làm **sản phẩm** (product).

|Ưu tiên của tư duy làm prototype | Ưu tiên của tư duy làm sản phẩm |
|---                              |---                              |
| lặp nhiều đoạn code nhỏ          | lặp trên một pipeline đầy đủ    |
| code không cần abstract (sửa trực tiếp code, các objects)| abstract nhiều hơn (thay đổi tham số) |
| không có cấu trúc (ít module hoá) | cấu trúc nhiều hơn (module hoá) |
| giúp hiểu code và data | giúp máy chạy code một cách tự động |

## Dữ liệu minh hoạ

Dữ liệu có thể được tải từ [đây](https://www.lendingclub.com/info/download-data.action). Dữ liệu này mô tả hoạt động của Lending Club (một tổ chức cho vay), bao gồm những khoản cho vay thành công và những khoản bị từ chối.

## Làm theo tư duy "prototype"

Với tư duy "prototype", chúng ta quan tâm nhất đến việc tìm hiểu các đặc tính, những ý nghĩa ẩn sau dữ liệu. Chúng ta sử dụng Jupyter notebook và thêm các chú thích bằng Markdown ở trong các ô theo các bước sau. 

Đầu tiên là đọc file CSV bằng pandas.

```python
import pandas as pd
loans_2007 = pd.read_csv('LoanStats3a.csv')
loans_2007.head(5)
```

Chúng ta sẽ nhận được 2 đoạn output, output đầu tiên là một cảnh báo.

```python
/home/srinify/anaconda3/envs/dq2/lib/python3.6/site-packages/IPython/core/interactiveshell.py:2785: DtypeWarning: Columns (0,1,2,3,4,7,13,18,24,25,27,28,29,30,31,32,34,36,37,38,39,40,41,42,43,44,46,47,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,123,124,125,126,127,128,129,130,131,132,133,134,135,136,142,143,144) have mixed types. Specify dtype option on import or set low_memory=False.
  interactivity=interactivity, compiler=compiler, result=result)
```

Sau đó là 5 dòng đầu tiên của dataframe (nhưng không copy vào đây vì nó rất dài), nhưng nó bị lỗi và có đoạn sau ngay dòng đầu tiên:
```
Notes offered by Prospectus (https://www.lendingclub.com/info/prospectus.action)
```

Phần cảnh báo đầu cho chúng ta biết rằng phần type inferencing của pandas cho mỗi cột sẽ được cải thiện nếu ta đặt tham số `low_memory` là `False` khi gọi `pandas.read_csv()`.

Phần output thứ hai chứng tỏ file CSV không để header (tên các cột) lên dòng đầu. Vậy ta cần sửa lại đoạn code nhập dữ liệu thành

```python
import pandas as pd
loans_2007 = pd.read_csv('LoanStats3a.csv', skiprows=1, low_memory=False)
```

Sau khi đọc mô tả dữ liệu trên trang của Lending Club, ta hiểu cột `desc` và `url` không đem lại thông tin gì cho phân tích, có thể loại đi.

```python
loans_2007 = loans_2007.drop(['desc', 'url'],axis=1)
```

Động tác tiếp theo là ta kiểm tra các cột có số dòng dữ liệu rỗng quá bán (50%), để sau đó loại các cột này đi nếu cần. Ta viết 2 dòng code sau vào 2 cell trong file Jupyter.

```python
loans_2007.isnull().sum()/len(loans_2007)
```
và
```python
half_count = len(loans_2007)/2
loans_2007 = loans_2007.dropna(thresh=half_count, axis=1)
```

Bởi chúng ta đang dùng Jupyter Notebook để ghi lại suy nghĩ và code của mình, ta dựa vào môi trường (ở đây là IPython kernel) để lưu các thay đổi của các trạng thái. Điều này giúp chúng ta thoải mái di chuyển giữa các cell, chạy đi chạy lại một đoạn code nhiều lần. 

Nói chung, tư duy code trong làm prototype tập trung vào:
- Việc diễn giải để hiểu:
  - Các ô có markdown để giải thích quan sát cũng như giả định
  - Những đoạn code ngắn thực thi logic
  - Rất nhiều hình minh hoạ, đồ thị và đếm
- Ít tính abstract
  - Hầu hết các đoạn code không được viết dưới dạng hàm (mà chủ yếu là hướng object)

## Làm theo tư duy "sản phẩm" (product)

Với tư duy làm snr phẩm, ta muốn tập trung vào việc viết code để có thể dùng được cho các tình huống khác, ví dụ như chạy data những năm khác của Lending Club.

Cách tốt nhất để tái sử dụng code đó là biết nó thành một cái gọi là "ống dữ liệu" (**data pipeline**). Một data pipeline được thiết kế dựa trên nguyên tắc của [lập trình hàm](https://www.dataquest.io/blog/introduction-functional-programming-python/), trong đó data được thay đổi *bên trong* hàm và được truyền *giữa* các hàm.

Đoạn code dưới đây minh hoạ pipeline sử dụng một hàm để thực hiện làm sạch dữ liệu:

```python
import pandas as pd

def import_clean(file_list):
    frames = []
    for file in file_list:
        loans = pd.read_csv(file, skiprows=1, low_memory=False)
        loans = loans.drop(['desc', 'url'], axis=1)
        half_count = len(loans)/2
        loans = loans.dropna(thresh=half_count, axis=1)
        loans = loans.drop_duplicates()
        # Drop first group of features
        loans = loans.drop(["funded_amnt", "funded_amnt_inv", "grade", "sub_grade", "emp_title", "issue_d"], axis=1)
        # Drop second group of features
        loans = loans.drop(["zip_code", "out_prncp", "out_prncp_inv", "total_pymnt", "total_pymnt_inv", "total_rec_prncp"], axis=1)
        # Drop third group of features
        loans = loans.drop(["total_rec_int", "total_rec_late_fee", "recoveries", "collection_recovery_fee", "last_pymnt_d", "last_pymnt_amnt"], axis=1)
        frames.append(loans)
    return frames
    
frames = import_clean(['LoanStats3a.csv'])
```

Trong đoạn code trên, chúng ta **abstract** đoạn code từ phần đầu thành một hàm đơn. Input cho hàm này là một list các tên file, và output là một list các object DataFrame.

Vậy với tư duy làm product, ta nên tập trung vào:
- Tính abstract:
  - Code nên được viết tổng quan để có thể tái sử dụng cho những công việc tương tự
  - Code không nên quá tổng quan khiến cho việc đọc hiểu khó khăn
- Độ ổn định của pipleline
  - Pipeline nên được viết để phù hợp với tần suất sử dụng của nó (hàng ngày, hàng tuần, hàng tháng)

### Chuyển đổi giữa các tư duy

Giả sử ta cố viết một hàm để chạy cho mọi tập dữ liệu của Lending Club, và Python trả về lỗi. Các lỗi có thể gặp như:
- Tên các cột không thống nhất giữa các file
- Các cột có số phần tử rỗng quá 50% không giống nhau giữa các file, khiến việc loại cột không đúng.
- Dữ liệu ở trong cột không giống nhau giữa các file

Khi gặp tình huống này, ta nên sử dụng cách viết trong prototype notebook để tìm hiểu thêm, rồi chỉnh sửa lại pipeline cho phù hợp. 

Dưới đây là một ví dụ về việc điều chỉnh hàm để đáp ứng các ngưỡng loại NAN khác nhau:

```python
import pandas as pd

def import_clean(file_list, threshold=0.5):
    frames = []
    for file in file_list:
        loans = pd.read_csv(file, skiprows=1, low_memory=False)
        loans = loans.drop(['desc', 'url'], axis=1)
        threshold_count = len(loans)*threshold
        loans = loans.dropna(thresh=half_count, axis=1)
        loans = loans.drop_duplicates()
        # Drop first group of features
        loans = loans.drop(["funded_amnt", "funded_amnt_inv", "grade", "sub_grade", "emp_title", "issue_d"], axis=1)
        # Drop second group of features
        loans = loans.drop(["zip_code", "out_prncp", "out_prncp_inv", "total_pymnt", "total_pymnt_inv", "total_rec_prncp"], axis=1)
        # Drop third group of features
        loans = loans.drop(["total_rec_int", "total_rec_late_fee", "recoveries", "collection_recovery_fee", "last_pymnt_d", "last_pymnt_amnt"], axis=1)
        frames.append(loans)
    return frames
    
frames = import_clean(['LoanStats3a.csv'], threshold=0.7)
```
Với hàm trên, giá trị mặc định của `threshold` là `0.5`, nhưng ta có thể biến thành `0.7` khi gọi hàm.

Dưới đây là một vài cách giúp pipeline linh hoạt hơn, thông qua việc giảm tính ưu tiên:
- Sử dụng các tham số đầu vào dạng optional, positional, và required.
- Sử dụng if/then cùng với input dạng `True`, `False` bên trong hàm
- Sử dụng cấu trúc dữ liệu mới (như dictionary, list, v.v.) để biểu diễn các hành động khác như các tập dữ liệu khác nhau.

Tham khảo đoạn pipeline mẫu dưới đây có thể scale cho mọi phase của data science workflow:

```python
import pandas as pd

def import_clean(file_list, threshold=0.5):
    ## Code
    
def visualize(df_list):
    # Find the most important features and generate pairwise scatter plots
    # Display visualizations and write to file.
    plt.savefig("scatter_plots.png")

def combine(df_list):
    # Combine dataframes and generate train and test sets
    # Drop features all dataframes don't share
    # Return both train and test dataframes
    return train,test
    
def train(train_df):
    # Train model
    return model
    
def validate(train_df, test-df):
    # K-fold cross validation
    # Return metrics dictionary
    return metrics_dict
    
frames = import_clean(['LoanStats3a.csv', 'LoanStats2012.csv'], threshold=0.7)
visualize(frames)
train_df, test_df = combine(frames)
model = train(train_df)
metrics = test(train_df, test_df)
print(metrics)
```

## Bước tiếp theo?

- Học cách biến pipeline thành một đoạn script chạy độc lập như một module, hoặc từ dòng lệnh:  https://docs.python.org/3/library/__main__.html
- Học cách dùng Luigi để dựng các pipeline phức tạp hơn có thể chạy trên cloud: https://marcobonzanini.com/2015/10/24/building-data-pipelines-with-python-and-luigi/