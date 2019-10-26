---
title: 'Nhẩm nhanh vài Software Architectural Patterns thông dụng'
date: 2019-09-05
author: ngminhtrung
categories:
  - reading
tags:
  - pondering
  - reading
  - forbes
  - agile
  - '2019'
---

Source: [10 Common Software Architectural Patterns in a nutshell](https://towardsdatascience.com/10-common-software-architectural-patterns-in-a-nutshell-a0b47a1e9013)

    1. Layered pattern
    2. Client-server pattern
    3. Master-slave pattern
    4. Pipe-filter pattern
    5. Broker pattern
    6. Peer-to-peer pattern
    7. Event-bus pattern
    8. Model-view-controller pattern
    9. Blackboard pattern
    10. Interpreter pattern

# 1. Layered pattern

This pattern can be used to structure programs that can be decomposed into groups of subtasks, each of which is at a particular level of abstraction. Each layer provides services to the next higher layer.
The most commonly found 4 layers of a general information system are as follows.
- **Presentation layer** (also known as **UI layer**)
- **Application layer** (also known as **service layer**)
- **Business logic layer** (also known as **domain layer**)
- **Data access layer** (also known as **persistence layer**)
## Usage
- General desktop applications.
- E commerce web applications.

# 2. Client-server pattern

This pattern consists of two parties; a server and multiple clients. The server component will provide services to multiple client components. Clients request services from the server and the server provides relevant services to those clients. Furthermore, the server continues to listen to client requests.

## Usage
- Online applications such as email, document sharing and banking.

# 3. Master-slave pattern

This pattern consists of two parties; master and slaves. The master component distributes the work among identical slave components, and computes a final result from the results which the slaves return.

## Usage
- In database replication, the master database is regarded as the authoritative source, and the slave databases are synchronized to it.
Peripherals connected to a bus in a computer system (master and slave drives).

