import React from "react";

export default ({ data }) => (
  <article class="post">

    <h1> A collection of my projects for skill demo:  </h1>

    <h2>JavaScript projects</h2>
    <ol>
      <li><a href="https://ngminhtrung.github.io/projects/learning/techmaster/memorycard3/index.html" target="_blank">Memory Card Game</a></li>
      <li><a href="https://ngminhtrung.github.io/projects/learning/techmaster/Calculator/index.html" target="_blank">Simple Scientific Calculator</a></li>

    </ol>
    <br />

      <h2>D3.js - Data Visualization projects</h2>

      <ol>
        <li><a href="https://ngminhtrung.github.io/projects/learning/d3/vietnam/vn-unemployment-2016" target="_blank">
          Bar chart - Unemployment rate in regions of Vietnam</a></li>
        <li><a href="https://ngminhtrung.github.io/projects/learning/d3/vietnam/groupedbar/index.html" target="_blank">
          Grouped bar-chart - Bar chart - Unemployment rate in regions of Vietnam</a></li>
        <li><a href="https://ngminhtrung.github.io/projects/learning/d3/vietnam/population/" target="_blank">
          Visualization of Vietnam's regional population (data 2015). Larger font size means bigger population.
      </a></li>
      </ol>

    
    
   </article>
    );
    
    export const query = graphql`
  query ProjectsQuery {
      site {
    siteMetadata {
      title
    }
    }
  }
`
