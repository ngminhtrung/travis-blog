---
id: 103
title: 'Git - Làm sao để merge 2 commits vào làm 1'
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

Có ba bước chính:
- Xem lịch sử commit để xem số hash của 2 commits gần nhất
- 


Get back to where you started with

$ git rebase --abort
Say your history is
```
$ git log --pretty=oneline
a931ac7c808e2471b22b5bd20f0cad046b1c5d0d c
b76d157d507e819d7511132bdb5a80dd421d854f b
df239176e1a2ffac927d8b496ea00d5488481db5 a
```

### Lưu ý:

Which is to say, the OP (and I) were squashing the wrong way. Squash the newer into the older commit rather than the older into the newer one, even if you feel the newer one is "the one you want to keep". Makes sense; git wants to know what should be in the next commit. b76d157 is the next commit no matter what, and you're squashing a931ac7 (the newest) back into it so they commit as one, not two. Squashing the oldest one would be like saying, "Skip a commit you never saw", which throws git off (arbitrary, yes, but right, apparently). – ruffin Sep 25 '12 at 16:50 

### Xem lịch sử commit

```
git log
```

https://blog.axosoft.com/rebasing-gitkraken-vs-cli/


### Tham khảo

- [Git Basics - Viewing the Commit History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)
- 

[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
