So, what’s this all about, anyways?

Trong JavasScript, bất kỳ hàm nào khi được gọi đều tạo ra một "execution context" mới. Context giúp tạo ra một không gian riêng cho các variables và functions được khai báo bên bên trong function được gọi kia. Nói cách khác, ta chỉ có thể truy cập được variables và functiosn từ bên trong chứ không thể gọi từ bên ngoài. 
``` js
// Because this function returns another function that has access to the
// "private" var i, the returned function is, effectively, "privileged."

function makeCounter() {
  // `i` is only accessible inside `makeCounter`.
  var i = 0;

  return function() {
    console.log( ++i );
  };
}

// Note that `counter` and `counter2` each have their own scoped `i`.

var counter = makeCounter();
counter(); // logs: 1
counter(); // logs: 2

var counter2 = makeCounter();
counter2(); // logs: 1
counter2(); // logs: 2

i; // ReferenceError: i is not defined (it only exists inside makeCounter)
```