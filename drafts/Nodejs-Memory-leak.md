---
id: 103
title: 'Title'
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


[How to inspect the memory usage of a process in Node.Js](https://www.valentinog.com/blog/memory-usage-node-js/)
[Understanding Garbage Collection and hunting Memory Leaks in Node.js](https://www.dynatrace.com/blog/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/)
https://nodejs.org/api/process.html#process_process_memoryusage


In order to answer this question, one has to understand V8’s Memory Scheme first.

A running program is always represented through some space allocated in memory. This space is called Resident Set. V8 uses a scheme similar to the Java Virtual Machine and divides the memory into segments:
- Code: the actual code being executed
- Stack: contains all value types (primitives like integer or Boolean) with pointers referencing objects on the heap and pointers defining the control flow of the program
- Heap: a memory segment dedicated to storing reference types like objects, strings and closures. 

Now it is easy to answer the question:

rss: Resident Set Size
heapTotal: Total Size of the Heap
heapUsed: Heap actually Used
Ref: http://apmblog.dynatrace.com/2015/11/04/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/



https://www.valentinog.com/blog/memory-usage-node-js/

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
