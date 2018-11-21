---
id: 103
title: '[JavaScript is Sexy] Hiểu về “this” cho rõ và thuần thục các cách dùng nó '
date: 2017-09-27T16:53:32+00:00
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - Dịch
tags:
  - javascript
  - front-end
  - javascriptissexy
  - this
---

A `node` is the generic name for any type of object in the DOM hierarchy. A node could be one of the built-in DOM elements such as `document` or `document.body`, it could be an HTML tag specified in the HTML such as `<input>` or `<p>` or it could be a text node that is created by the system to hold a block of text inside another element. So, in a nutshell, a `node` is any DOM object.

An `element` is one specific type of `node` as there are many other types of nodes (text nodes, comment nodes, document nodes, etc...).

The DOM consists of a hierarchy of nodes where each node can have a parent, a list of child nodes and a nextSibling and previousSibling. That structure forms a tree-like hierarchy. The `document` node would have its list of child nodes (the `head` node and the `body` node). The `body` node would have its list of child nodes (the top level elements in your HTML page) and so on.

So, a `nodeList` is simply an array-like list of `nodes`.

An element is a specific type of node, one that can be directly specified in the HTML with an HTML tag and can have properties like an `id` or a `class`. can have children, etc... There are other types of nodes such as comment nodes, text nodes, etc... with different characteristics. Each node has a property .nodeType which reports what type of node it is. You can see the various types of nodes here (diagram from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)):






[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
