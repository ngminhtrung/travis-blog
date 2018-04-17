import React from "react";

export default ({ data }) => (
  <div>
    <h1>
      A little of me ...
    </h1>
    <p>
      Hi. This is Trung Nguyen, but you can call me Travis.
    <br />
    <br />
      Thanks for visiting my personal page 🙂. You know, it's not easy to write about ourselves. And I myself have struggled quite a time for the first lines of this section.
    <br />
    <br />
      Who I am? I was once an electrical and project engineer. In my last job in these roles, I worked for a Swedish-Swiss factory located in Hanoi, Vietnam. where elephant-size electric products were manufactured (specifically it's transformer of up to 110kV, 80 MVA, less than 100 tons).
    <br />
    <br />
      And then, because of some reasons, I decided to switch to other industry. Now, I'm a Software Engineer, working for a Korean company. My company mainly focuses on AI and Social Network Analysis. My task here is to use JavaScript to build tools for data visualization.
    <br />
    <br />
      I maintain this site to demonstrate my programming knowledge and skills. Moreover, it's very cool for looking backward what you've done after a period of time, seeing how you have grown with all mistakes, achievements, stupidities, and joys.
    <br />
    <br />
    PS: <a href="https://techmaster.vn/interviews/34574/nguyen-minh-trung-cau-chuyen-ve-buoc-ngoat-tu-bo-13-nam-hoc-va-lam-nganh-dien-de-theo-duoi-dam-me-lap-trinh" target="_blank" rel="noopener noreferrer">A short interview of me with Techmaster on March 2018.</a> 
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
