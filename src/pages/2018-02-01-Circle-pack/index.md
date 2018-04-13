---
title: 'D3.js - Packs of circles to present hierarchical data'
date: 2018-02-01
author: ngminhtrung
layout: post
guid: 
permalink: 
categories:
  - dataviz
tags:
  - javascript
  - front-end
  - d3js
  - interpolate
  - transition
---

I have just finished another chart today in D3.js, it's *Circle Pack*. Here are some notes before next move: 

### What is "Circle Pack" 

- *Circle Pack* chart belongs to a group of charts that help visualizing hierarchical data. 
- We can think of hierarchical data as a tree:
  -  the "*top*" node is called "*root*", there is only one "root". 
  - Passing through all middle-level nodes (which have both parents and children), we arrive at the lowest level of the tree called "*leaves*".
  - Leaves have only parents, no children attached.
- To present hierarchical data in charts, we have many options:
  - Tree 
  - Treemap
  - Cluster
  - Dendrogram
  - Circle Pack
  - Partition
- The name "Circle Pack" might be explained via its visualization: each level of data is gathered in one pack. Each pack is illustrated as a circle. 

### To draw a "Circle Pack" in D3.js

We need to go through 2 big steps:

#### Step 1: Prepare the hierarchical data.

Here is the sample of a hierarchical data. In case of having other kind of data (CSV for example), it's required to convert it into the correct format with method `d3.hierarchy()`. 

#### Step 2: Draw the chart "Circle Pack"

- Setup the *pack* layout with `d3.pack()`. Information such as size, padding must be entered at this step.
- Pass the hierarchical data to the pack layout. 
- Start the data join, for each data-embedded element inside the pack layout:
  - draw a circle
  - insert label

### To make the "Circle Pack" zoomable 

This is one technique. There might have other techniques that I don't know yet.
- Disable the pointer-events triggers for root and all leaves. 
- Insert event listener "onclick" into each middle-level nodes. 
- If node is "clicked", run the function *zoom*. 
- Until its turn, *zoom* will call:
  - `d3.transition()` which returns the interpolator for calculating the tweens between current view and targeted view. This helps to run smoothly the animation from current view and targeted view.
  - the interpolator will be passed into function *zoomTo()*
  - function *zoomTo()* is to calibrate dimensions of all circles and text of the targeted view to fit with current svg' size. 
  - the trick here is to keep varible *view* at global scope, so it can be updated frequently by function *zoomTo()*.

### Conclusion:

- The logic of code is fairely straightforward, but it needs more time for digging further to really understand d3.transition() and d3.interpolate inside out.
- To check if the feature "zoom" could be wrote in a different way.

### References:

- [D3js Hierarchy](https://github.com/d3/d3-hierarchy)