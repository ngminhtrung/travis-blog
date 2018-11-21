

Optimizing hash tables: hiding the hash code

https://v8project.blogspot.co.uk/2018/01/hash-code.html

ECMAScript 2015 introduced several new data structures such as Map, Set, WeakSet, and WeakMap, all of which use hash tables under the hood. This post details the recent improvements in how V8 v6.3+ stores the keys in hash tables.

Hash code
A hash function is used to map a given key to a location in the hash table. A hash code is the result of running this hash function over a given key.

In V8, the hash code is just a random number, independent of the object value. Therefore, we can’t recompute it, meaning we must store it.

For JavaScript objects that were used as keys, previously, the hash code was stored as a private symbol on the object. A private symbol in V8 is similar to a Symbol, except that it’s not enumerable and doesn’t leak to userspace JavaScript.

