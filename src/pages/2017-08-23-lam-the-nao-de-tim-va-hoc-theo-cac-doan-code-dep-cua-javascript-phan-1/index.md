---
title: 'Làm thế nào để tìm và học theo các đoạn code đẹp của Javascript? (phần 1)'
date: 2017-08-23
author: ngminhtrung
categories:
  - General
---
Phần 1: Viết ngày 23.08.2017

Dù mới học Javascript nhưng tôi thực sự mong mình không chỉ viết được 1 chương trình "chạy được", mà còn phải ngắn gọn, mạch lạc và dễ hiểu để bản thân hay bất kỳ người nào khác sau này đều cảm thấy dễ chịu khi nhìn vào các dòng mã. Lúc viết xong chương trình calculator, dù đây là bài tập nhập môn của lập trình, tôi vẫn thắc mắc liệu mình viết các function, bố trí các objects, classes, variable names đã ok hay chưa? Có vài variable đặt tên đi đặt tên lại vài lần vẫn chưa thấy hài lòng 100%, e là sau này tự đọc lại cũng không hiểu. Tôi muốn đặt tiêu chuẩn cao ngay từ đầu cho mình, để người ngoài khi đọc portfolio của tôi, thấy code tôi viết, có thể hiểu được sự nỗ lực này. Nhưng làm thế nào để có thể đạt được level đó? Việc tuân theo vào coding style chỉ là 1 cách, nhưng chưa tổng quan lắm. Liệu việc đọc source code được đánh giá là "đẹp" có giúp tôi học được gì? Tôi đã google với keywords "_quora how to read Javascript source code_", và từ đó, những bài viết liên quan đến "_where can I find well written Javascript code_" cứ từ từ hiện ra, đánh trúng vào mối quan tâm. Với series này, tôi sẽ dịch và ghi chú lại những điều tôi thấy hay thực tập ngay bây giờ (nếu có thể), và để sau này quay lại so sánh đối chiếu.

  * <span style="color: #0000ff;"><strong>Danh sách một vài topics (questions) trên quora nói về vấn đề này</strong></span>. Còn rất nhiều nữa nhưng tôi không đọc. Việc lựa chọn các topics này hoàn toàn do tình cờ, dựa trên "related questions" mà quora cung cấp. 
      * <a href="https://www.quora.com/How-do-I-find-some-excellent-javascript-source-code-to-read" target="_blank" rel="noopener">How do I find some excellent javascript source code to read?</a>
      * <a href="https://www.quora.com/Where-can-I-find-well-written-javascript-source-code" target="_blank" rel="noopener">Where can I find well written javascript source code?</a>
      * <a href="https://www.quora.com/How-do-I-read-code-on-GitHub" target="_blank" rel="noopener">How do I read code on GitHub?</a>
      * <a href="https://www.quora.com/Do-you-have-a-technique-in-reading-Javascript-code" target="_blank" rel="noopener">Do you have a technique in reading Javascript code?</a>
      * <a href="https://www.quora.com/Where-can-I-read-some-beautiful-JavaScript-code" target="_blank" rel="noopener">Where can I read some beautiful JavaScript code?</a>
      * <a href="https://www.quora.com/What-is-the-best-JavaScript-Code-to-read-in-order-to-learn-better-patterns-and-structuring" target="_blank" rel="noopener">What is the best JavaScript Code to read in order to learn better patterns and structuring</a>?
      * <a href="https://www.quora.com/What-are-the-steps-for-reading-JavaScript-libraries-source-code-like-jQuery-D3-Backbone" target="_blank" rel="noopener">What are the steps for reading JavaScript libraries source code, like jQuery, D3, Backbone</a>?
      * Related questions trên Reddit: <a href="https://www.reddit.com/r/javascript/comments/2zt8wg/suggestions_for_must_read_javascript_source_code/" target="_blank" rel="noopener">Suggestions for &#8216;must read&#8217; JavaScript source code</a>
  * <strong style="color: #0000ff;">Tôi đã note được những điều gì qua các bài trên?</strong>

<span style="color: #808080;">Câu hỏi của tôi tuy "make senses" và có nhiều người hỏi tương tự, nhưng nó vẫn bị đánh giá là "too broad". Tuy vậy, dù gì thì tôi vẫn thu lượm được những điều bổ ích. </span>

**<span style="color: #008000;">Không. Một keyword mới để google sau này: "annotated sources". </span>**

<span style="color: #008000;"><strong>Một. Website cá nhân được khuyên để đọc (nơi có các articles về JavaScript)</strong></span>

<p class="qtext_para" style="padding-left: 30px;">
  <strong>Addy Osmani</strong> (Engineering manager at Google working on Chrome): <span class="qlink_container"><a class="external_link" href="https://addyosmani.com/blog/" target="_blank" rel="noopener nofollow">https://addyosmani.com/blog/</a></span>
</p>

<p class="qtext_para" style="padding-left: 30px;">
  <strong>Axel Rauschmayer</strong> (2ality is a blog about JavaScript, web development and mobile computing (but other topics are covered, too, occasionally): <span class="qlink_container"><a class="external_link" href="http://www.2ality.com/" target="_blank" rel="noopener nofollow" data-qt-tooltip="2ality.com" data-tooltip="attached">②ality &#8211; JavaScript and more</a></span>
</p>

<p class="qtext_para" style="padding-left: 30px;">
  <strong>John Resig</strong> (John Resig is best known as an expert in the JavaScript programming language and the creator of the most popular JavaScript library in the world: jQuery): <span class="qlink_container"><a class="external_link" href="http://ejohn.org/" target="_blank" rel="noopener nofollow" data-qt-tooltip="ejohn.org" data-tooltip="attached">John Resig &#8211; JavaScript Programmer</a></span>
</p>

<p class="qtext_para" style="padding-left: 30px;">
  <strong>Nicholas C. Zakas</strong> (<span class="qlink_container">a principal engineer at Yahoo!, where he is front-end tech lead for the Yahoo! homepage and a contributor to the YUI library.) <a class="external_link" href="https://www.nczonline.net/" target="_blank" rel="noopener nofollow">https://www.nczonline.net/</a></span>
</p>

Hai. Website (ko phải dạng personal blog) được khuyên để đọc

**UNDERSCORE.JS _(_**_a_ _Jav_**_a_**Script library that provides a whole mess of useful functional programming helpers without extending any built-in objects. It’s the **_a_**nswer to the question: “If I sit down in front of a blank HTML page, and want to start being productive immediately, what do I need?” … and the tie to go along with jQuery&#8217;s tux and Backbone&#8217;s suspenders.) <a href="http://underscorejs.org/docs/underscore.html" target="_blank" rel="noopener">http://underscorejs.org/docs/underscore.html</a>

**Facebook JavaScript SDK** (This repository contains the open source JavaScript SDK, last updated on June 2010, that allows you to utilize Facebook on your website.)** **<a href="https://github.com/facebookarchive/facebook-js-sdk/tree/deprecated" target="_blank" rel="noopener">https://github.com/facebookarchive/facebook-js-sdk/tree/deprecated</a>

**Learning JavaScript Design Patterns **<a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/" target="_blank" rel="noopener">https://addyosmani.com/resources/essentialjsdesignpatterns/book/</a>

**D3.js** &#8211; a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation. <a href="https://d3js.org/" target="_blank" rel="noopener">https://d3js.org/</a>

**BACKBONE.JS** <a href="http://backbonejs.org/docs/backbone.html" target="_blank" rel="noopener">http://backbonejs.org/docs/backbone.html</a>

**<span style="color: #008000;">Ba. Cách đọc các source code</span>**

**<span style="color: #008000;">Bốn. Cách viết code</span>**