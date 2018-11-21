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
  - react
  - this
---

## history


[How components won the "framework wars"](https://dev.to/hugo__df/how-components-won-the-framework-wars-5fko)

Năm 2018 sẽ đánh dấu thời điểm kết thúc của:
- JavaScript fatigue
- chiến tranh giữa các framework


### Component and composition model


|Angular | ReactJS | VueJS |
|---      |---      |---    |
|setting up a Module to wrap some component(s) with @NgModule and @Component decorators | extending React.Component | using Vue.component() to register components on the Vue instance.|


As a composition model, components are meant to be self-contained sections or "bits" of your application that you can
then reuse in more specific contexts.

The great thing they allow is a way to encapsulate logic, providing API guarantees: you pass x, y and z into this component and you will get this foo behaviour out of it, anything the component does internally is its own business.

### State và Mutation

The problem that all these frameworks tackle is binding data to the DOM somehow.

This is something that the developer would have to do manually in jQuery for example.

This means that the most basic application (that uses a framework/library) will hold some sort of state.

The models that Vue, Angular and React themselves (ie. not user-land libraries) expose are actually quite different.


|Angular | ReactJS | VueJS |
|---      |---      |---    |
|has the belief that state should be mutable | extending React.Component | using Vue.component() to register components on the Vue instance.|

