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

Hỏi: Tại sao có quá nhiều folder chứa file binary (chương trình để thực thi) trong Linux. Ví dụ các folder sau:
```
/bin/
/sbin/
/usr/bin/
/usr/sbin/
/usr/local/bin/
/usr/local/sbin/
```
Có vài folder người dùng còn chẳng có quyền ghi đọc. Ý nghĩa của các folder này là gì? Chương trình loại nào sẽ được lưu vào đâu?

Trả lời:

Thường thì `/bin` (và `/sbin`) dùng để lưu các chương trình  for programs that needed to be on a small / partition before the larger /usr, etc. partitions were mounted. These days, it mostly serves as a standard location for key programs like /bin/sh, although the original intent may still be relevant for e.g. installations on small embedded devices.

/sbin, as distinct from /bin, is for system management programs (not normally used by ordinary users) needed before /usr is mounted.

/usr/bin is for distribution-managed normal user programs.

There is a /usr/sbin with the same relationship to /usr/bin as /sbin has to /bin.

/usr/local/bin is for normal user programs not managed by the distribution package manager, e.g. locally compiled packages. You should not install them into /usr/bin because future distribution upgrades may modify or delete them without warning.

/usr/local/sbin, as you can probably guess at this point, is to /usr/local/bin as /usr/sbin to /usr/bin.

In addition, there is also /opt which is for monolithic non-distribution packages, although before they were properly integrated various distributions put Gnome and KDE there. Generally you should reserve it for large, poorly behaved third party packages such as Oracle.

https://unix.stackexchange.com/questions/8656/usr-bin-vs-usr-local-bin-on-linux


You know how Ken Thompson and Dennis Ritchie created Unix on a PDP-7 in 1969?  
Well around 1971 they upgraded to a PDP-11 with a pair of RK05 disk packs (1.5 
megabytes each) for storage.

When the operating system grew too big to fit on the first RK05 disk pack (their 
root filesystem) they let it leak into the second one, which is where all the 
user home directories lived (which is why the mount was called /usr).  They 
replicated all the OS directories under there (/bin, /sbin, /lib, /tmp...) and 
wrote files to those new directories because their original disk was out of 
space.  When they got a third disk, they mounted it on /home and relocated all 
the user directories to there so the OS could consume all the space on both 
disks and grow to THREE WHOLE MEGABYTES (ooooh!).

Of course they made rules about "when the system first boots, it has to come up 
enough to be able to mount the second disk on /usr, so don't put things like 
the mount command /usr/bin or we'll have a chicken and egg problem bringing 
the system up."  Fairly straightforward.  Also fairly specific to v6 unix of 35 
years ago.

The /bin vs /usr/bin split (and all the others) is an artifact of this, a 
1970's implementation detail that got carried forward for decades by 
bureaucrats who never question _why_ they're doing things.  It stopped making 
any sense before Linux was ever invented, for multiple reasons:

1) Early system bringup is the provice of initrd and initramfs, which deals 
with the "this file is needed before that file" issues.  We've already _got_ a 
temporary system that boots the main system.

2) shared libraries (introduced by the Berkeley guys) prevent you from 
independently upgrading the /lib and /usr/bin parts.  They two partitions have 
to _match_ or they won't work.  This wasn't the case in 1974, back then they 
had a certain level of independence because everything was statically linked.

3) Cheap retail hard drives passed the 100 megabyte mark around 1990, and 
partition resizing software showed up somewhere around there (partition magic 
3.0 shipped in 1997).

Of course once the split existed, some people made other rules to justify it.  
Root was for the OS stuff you got from upstream and /usr was for your site-
local files.  Then / was for the stuff you got from AT&T and /usr was for the 
stuff that your distro like IBM AIX or Dec Ultrix or SGI Irix added to it, and 
/usr/local was for your specific installation's files.  Then somebody decided 
/usr/local wasn't a good place to install new packages, so let's add /opt!  
I'm still waiting for /opt/local to show up...



[photo01]: https://ngminhtrung.github.io/images/PostIMG/20170928-img-01.jpg "Các trường hợp dễ nhầm lẫn khi sử dụng "this""
