### Bài toán:

Trang web cho phép đặt hàng cafe hạt gửi qua bưu điện về nhà. Khách hàng được chọn:
- loại cafe
- số lượng 

và xem được hóa đơn tính tổng tiền.

### Imperative method


```js 
// create some objects to store the data.
const columbian = {
    name: 'columbian',
    basePrice: 5
    };
const frenchRoast = {
    name: 'french roast',
    basePrice: 8
    };
const decaf = {
    name: 'decaf',
    basePrice: 6
    };

// we'll use a helper function to calculate the cost
// according to the size and print it to an HTML list
function printPrice(coffee, size) {
    if (size == 'small') {
        const price = coffee.basePrice + 2;
    }
    else if (size == 'medium') {
        const price = coffee.basePrice + 4;
    }
    else {
        const price = coffee.basePrice + 6;
    }
    return price;
}

// now all we need to do is call the printPrice function
// for every single combination of coffee type and size
printPrice(columbian, 'small');
printPrice(columbian, 'medium');
printPrice(columbian, 'large');
printPrice(frenchRoast, 'small');
printPrice(frenchRoast, 'medium');
printPrice(frenchRoast, 'large');
printPrice(decaf, 'small');
printPrice(decaf, 'medium');
printPrice(decaf, 'large');

```

### Functional programming

```js
// separate the data and logic from the interface
const printPrice = function(price, label) {
    const node = document.createElement("li");
    const textnode = document.createTextNode(label+' price: $'+price);
    node.appendChild(textnode);
    document.getElementById('products 2').appendChild(node);
    }

// create function objects for each type of coffee
const columbian = function(){
    this.name = 'columbian';
    this.basePrice = 5;
    };

const frenchRoast = function(){
    this.name = 'french roast';
    this.basePrice = 8;
    };
const decaf = function(){
    this.name = 'decaf';
    this.basePrice = 6;
    };

// create object literals for the different sizes
const small = {
    getPrice: function(){return this.basePrice + 2},
    getLabel: function(){return this.name + ' small'}
    };

const medium = {
    getPrice: function(){return this.basePrice + 4},
    getLabel: function(){return this.name + ' medium'}
    };
const large = {
    getPrice: function(){return this.basePrice + 6},
    getLabel: function(){return this.name + ' large'}
    };

// put all the coffee types and sizes into arrays
const coffeeTypes = ["columbian", "frenchRoast", "decaf"];
const coffeeSizes = ["small", "medium", "large"];

// build new objects that are combinations of the above
// and put them into a new array
const coffees = coffeeTypes.reduce(function(previous, current) {
    const newCoffee = coffeeSizes.map(function(mixin) {
    // `plusmix` function for functional mixins, see Ch.7
    const newCoffeeObj = plusMixin(current, mixin);
    return new newCoffeeObj();
    });
    return previous.concat(newCoffee);
},[]);

// we've now defined how to get the price and label for each
// coffee type and size combination, now we can just print them
coffees.forEach(function(coffee){
    printPrice(coffee.getPrice(),coffee.getLabel());
    });
```



Để biến 1 mảng 2 chiều thành 1 mảng 1 chiều

```js
// Imperative way

function merged2dArrayIntoOne(array) {
    const arrayLength = array.length;
    const mergedArray = new Array(arrayLength);
    const count = 0;
    for (let i=0; i < arrayLength; i++) {
        const jLength = array[i].length;
        for (let j=0; j < jLength; j++) {
            mergedArray[count++] = array[i][j];
        }
    }
    return mergedArray;
}

// Functional technique

const mergedArray = function(array) {
    const reducer = function(p, n) {
        return p.concat(n);
    }
    return array.reduce(reducer);
}
```
```js 
const valueAccumulator = function() {
    let values = [];
    const accumulate = function(obj) {
        if (obj) {
            values.push(obj.value);
            return values;
        } 
        else {
            return values;
        }
    };
    return accumulate;
}

let accumulator = valueAccumulator();
accumulator(obj1);
accumulator(obj2);

```
Partial application (in JavaScript) is:
-  is the process of binding values to one or more arguments of a function that returns another function that accepts the remaining, unbound arguments. 

Currying is:
-  the process of transforming a function with many arguments into a function with one argument that returns another function that takes more arguments as needed

### List of posts

- [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
- [An introduction to functional programming in JavaScript](https://opensource.com/article/17/6/functional-javascript)
- [Examples in JavaScript Functional Programming: Part 1](https://codeburst.io/examples-in-javascript-functional-programming-part-1-c9e2df8a411a)
- [Awesome FP JS Awesome](https://github.com/stoeffel/awesome-fp-js)