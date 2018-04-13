import React from "react";

export default ({data}) => (
  <div>
    <h1>
      A little of me ... 
    </h1>
    <p>
    Hi. Thanks for visiting my personal page 🙂. You know, it's not easy to write about ourselves. And I myself have struggled quite a time for the first lines of this section.
    
    Who I am? I was once an electrical and project engineer. In my last job in these roles, I worked for a Swedish-Swiss factory located in Hanoi, Vietnam. where elephant-size electric products were manufactured (specifically it's transformer of up to 110kV, 80 MVA, less than 100 tons). 
    
    And then, because of some reasons, I decided to switch to other industry. Now, I'm a Software Engineer, working for a Korean company. My company mainly focuses on AI and Social Network Analysis. My task here is to use JavaScript to build tools for data visualization. 
    
    I maintain this site to demonstrate what I'm doing, my writing, my projects. It's very cool for looking backward what you've done after a period of time, seeing how you have grown with all mistakes, achievements, stupidities, and joys.
    </p>
  </div>
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
