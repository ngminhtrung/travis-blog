---
id: 103
title: 'Từ lỗi đặt tên đến việc quy ước đặt tên class trong CSS'
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

CSS Naming Conventions that Will Save You Hours of Debugging

https://medium.freecodecamp.org/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849


Use Hyphen Delimited Strings
If you write a lot of JavaScript, then writing variables in camel case is common practice.

var redBox = document.getElementById('...')
Great, right?

The problem is that this form of naming isn’t well-suited to CSS.

Do not do this:
```css
.redBox {
  border: 1px solid red;
}
```
Instead, do this:
```css
.red-box {
   border: 1px solid red
}
```css

This is a pretty standard CSS naming convention. It is arguably more readable.

Also, it is consistent with the CSS property names.
```js
// Correct
.some-class {
   font-weight: 10em
}
```
```js
// Wrong
.some-class {
   fontWeight: 10em
}
```

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
