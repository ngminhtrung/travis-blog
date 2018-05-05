import React from "react";

export default ({ data }) => (
  <article class="post">

    <h1> A collection of my projects for skill demo:  </h1>

    <h2>Nodejs, ReactJS</h2>
    <ol>
      <li>A blog app based on Nodejs, ExpressJS, and MongoDB (for backend), and React - Redux (for front-end). See it <a href="https://github.com/ngminhtrung/fcchn-blog-backend" rel="noopener noreferrer">here</a>!</li>
      <li>ReactJS - A clone of TGDD's shopping cart form with validation. See it <a href="https://ngminhtrung.github.io/react-form-shopping-cart" rel="noopener noreferrer">here</a>!</li>
      <li>ReactJS - A drawing app which makes spirograph. See it <a href="https://ngminhtrung.github.io/react-draw-spirograph/" rel="noopener noreferrer">here</a>!</li>
      <li>ReactJS - A gallery of Hanoi's old photos. See it <a href="https://ngminhtrung.github.io/react-album-hanoi/" rel="noopener noreferrer">here</a>!</li>
    </ol>

    <h2>D3.js - Data Visualization projects</h2>

    <ol>
    <li><a href="https://ngminhtrung.github.io/d3/vietnam/export" target="_blank">
        Vietnam - Visualization of export and import data (2007 - 2016) [Project is on progress]</a></li>
      <li><a href="https://ngminhtrung.github.io/d3/vietnam/vn-unemployment-2016" target="_blank">
        Bar chart - Unemployment rate in regions of Vietnam</a></li>
      <li><a href="https://ngminhtrung.github.io/d3/vietnam/groupedbar/index.html" target="_blank">
        Grouped bar-chart - Bar chart - Unemployment rate in regions of Vietnam</a></li>
      <li><a href="https://ngminhtrung.github.io/d3/vietnam/population/" target="_blank">
        Visualization of Vietnam's regional population (data 2015). Larger font size means bigger population.</a></li>
    </ol>

    <h2>JavaScript assignements</h2>
    <ol>
      <li><a href="https://ngminhtrung.github.io/techmaster/memorycard3/index.html" target="_blank">Memory Card Game</a></li>
      <li><a href="https://ngminhtrung.github.io/techmaster/Calculator/index.html" target="_blank">Simple Scientific Calculator</a></li>

    </ol>

  </article>

);

export const query = graphql`
  query AboutQuery {
      site {
    siteMetadata {
      title
    }
    }
  }
`
